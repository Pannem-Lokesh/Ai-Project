import  { useState, useRef, useEffect,useContext } from 'react';
import getMistralResponse from '../app/app';
import Catgorie from './Catgorie';
import { commonContext } from '../App';
import {categoryHeader} from '../app/category';
function Input(props) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);
  const {category} = useContext(commonContext);
    async function handleKeyDown(e){
      if (e.key === 'Enter') {
        e.preventDefault(); 
        props.setConvo((prevConvo) => {
            const updatedConvo = [...prevConvo, { role: 'user', content: inputValue }, { role: 'loading', content: '...' }];
            return updatedConvo;
        });
        
        // Construct the final input value
        let finalInputValue = `Role: assistant
        Context: ${categoryHeader[category] || "Provide general information on a wide range of topics."}
        Prompt: ${inputValue}`;        setInputValue('');
        console.log(finalInputValue)
        // Get response from Mistral
        let response = await getMistralResponse(finalInputValue);
        
        props.setConvo((prevConvo) => {
            const updatedConvo = [...prevConvo];
            updatedConvo.pop(); // Remove the last 'loading' message
            updatedConvo.push({ role: 'assistant', content: response });
            return updatedConvo;
        });
      }
    }
  // Adjust the height dynamically based on input value
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto for proper recalculation
      textareaRef.current.style.height = `${Math.max(30, Math.min(textareaRef.current.scrollHeight, 300))}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="fixed bottom-0 pb-4 flex items-center justify-center w-[95vw] left-1/2 -translate-x-1/2 bg-[#212121]">
        <Catgorie item={category}/>
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full py-3 pl-4 text-sm text-white bg-[#303030] border border-none rounded-lg focus:outline-none resize-none"
            placeholder="Type something..."
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

export default Input;
