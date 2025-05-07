// Constants for frequently used strings and patterns
const MARKDOWN_PATTERNS = {
    bold: { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
    italic: { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
    inlineCode: { pattern: /`([^`]+)`/g, replacement: '<code class="bg-black  px-1 rounded">$1</code>' },
    link: { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2" class="text-blue-600 hover:underline">$1</a>' },
    strikethrough: { pattern: /~~(.*?)~~/g, replacement: '<del>$1</del>' }
};

const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
};

function formatResponse(response) {
    if (!response || typeof response !== 'string') {
        throw new Error('Input must be a non-empty string');
    }

    // State management object for better organization
    const state = {
        insideCodeBlock: false,
        codeBlockLanguage: '',
        codeBlockContent: '',
        inBlockQuote: false,
        listLevel: 0,
        lastLineWasEmpty: false,
        tableOpen: false
    };

    // Memoized escape HTML function
    const escapeHTML = (() => {
        const cache = new Map();
        return (text) => {
            if (cache.has(text)) {
                return cache.get(text);
            }
            const escaped = text.replace(/[&<>"']/g, char => HTML_ESCAPES[char]);
            cache.set(text, escaped);
            return escaped;
        };
    })();

    // Optimized inline markdown processor with regex caching
    const processInlineMarkdown = (() => {
        const cache = new Map();
        return (text) => {
            if (cache.has(text)) {
                return cache.get(text);
            }
            let processed = text;
            Object.values(MARKDOWN_PATTERNS).forEach(({ pattern, replacement }) => {
                processed = processed.replace(pattern, replacement);
            });
            cache.set(text, processed);
            return processed;
        };
    })();

    const processListItem = (line, isOrdered) => {
        const indent = line.match(/^\s*/)[0].length;
        const level = Math.floor(indent / 2);
        const content = line.replace(/^\s*(\d+\.|-|\*)\s+/, '');
        const listType = isOrdered ? 'decimal' : 'disc';
        
        if (level !== state.listLevel) {
            const tag = isOrdered ? 'ol' : 'ul';
            if (level > state.listLevel) {
                state.listLevel = level;
                return `<${tag} class="ml-4 list-${listType}"><li>${processInlineMarkdown(content)}`;
            } else {
                state.listLevel = level;
                return `</li></${tag}><li>${processInlineMarkdown(content)}`;
            }
        }
        return `</li><li>${processInlineMarkdown(content)}`;
    };

    const processTable = (line, isHeader) => {
        const cells = line.split('|').filter(cell => cell.trim());
        const tag = isHeader ? 'th' : 'td';
        return cells.map(cell => 
            `<${tag} class="border px-4 py-2">${processInlineMarkdown(cell.trim())}</${tag}>`
        ).join('');
    };

    const lines = response.split('\n');
    const result = lines.reduce((acc, line, index) => {
        const trimmedLine = line.trim();
        const nextLine = lines[index + 1]?.trim();

        if (!trimmedLine) {
            state.lastLineWasEmpty = true;
            return acc;
        }

        // Code block handling
        if (trimmedLine.startsWith('```')) {
            if (!state.insideCodeBlock) {
                state.insideCodeBlock = true;
                state.codeBlockLanguage = trimmedLine.slice(3).toLowerCase() || 'plaintext';
                state.codeBlockContent = '';
                return acc + `<div class="bg-gray-800 text-white p-3 rounded-md overflow-auto my-2"><pre class="m-0"><code class="language-${state.codeBlockLanguage}">`;
            } else {
                state.insideCodeBlock = false;
                return acc + `${escapeHTML(state.codeBlockContent)}</code></pre></div>`;
            }
        }

        if (state.insideCodeBlock) {
            state.codeBlockContent += line + '\n';
            return acc;
        }

        // Block quote handling
        if (trimmedLine.startsWith('>')) {
            const content = trimmedLine.slice(1).trim();
            if (!state.inBlockQuote) {
                state.inBlockQuote = true;
                return acc + `<blockquote class="border-l-4 border-gray-300 pl-4 my-3 italic">${processInlineMarkdown(content)}`;
            }
            return acc + processInlineMarkdown(content);
        } else if (state.inBlockQuote) {
            state.inBlockQuote = false;
            return acc + '</blockquote>';
        }

        // Header handling
        const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([^}]+)\})?$/);
        if (headerMatch) {
            const [, hashes, content, customId] = headerMatch;
            const level = hashes.length;
            const id = customId || content.toLowerCase().replace(/[^\w]+/g, '-');
            const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
            return acc + `<h${level} id="${id}" class="text-${sizes[level-1]} font-bold my-3">${processInlineMarkdown(content)}</h${level}>`;
        }

        // List handling
        if (/^\s*(\d+\.|[-*])\s/.test(trimmedLine)) {
            const isOrdered = /^\s*\d+\./.test(trimmedLine);
            return acc + processListItem(line, isOrdered);
        }

        // Table handling
        if (trimmedLine.includes('|')) {
            if (nextLine?.includes('|-')) {
                state.tableOpen = true;
                return acc + `<table class="min-w-full my-3"><thead><tr>${processTable(trimmedLine, true)}</tr></thead><tbody>`;
            } else if (trimmedLine.includes('|-')) {
                return acc;
            } else if (state.tableOpen) {
                return acc + `<tr>${processTable(trimmedLine, false)}</tr>`;
            }
        }

        // Horizontal rule
        if (/^[-*_]{3,}$/.test(trimmedLine)) {
            return acc + '<hr class="my-4 border-gray-300">';
        }

        // Paragraph handling
        const processedLine = processInlineMarkdown(trimmedLine);
        if (state.lastLineWasEmpty) {
            state.lastLineWasEmpty = false;
            return acc + `<p class="my-3">${processedLine}</p>`;
        }
        return acc + processedLine;
    }, '');

    // Clean up any unclosed tags
    let finalResult = result;
    if (state.inBlockQuote) finalResult += '</blockquote>';
    if (state.tableOpen) finalResult += '</tbody></table>';
    if (state.listLevel > 0) {
        finalResult += '</li>' + '</ul>'.repeat(state.listLevel);
    }

    return finalResult;
}

export default formatResponse;