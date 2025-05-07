🧠 AI Category-Based Chatbot using Mistral API

This is a web-based AI chatbot that provides contextual and in-depth responses based on the category selected by the user. Built with a clean UI, it leverages the Mistral API to generate intelligent responses tailored to topics such as Medical, Engineering, Psychology, Gaming, Cooking, and many more.

✨ Features

🧠 AI-powered replies using Mistral's large language model

🏷️ Category-based filtering: Choose from 25+ categories like Science, History, Travel, Technology, etc.

💬 Dynamic chatbot interface: Ask any question and get answers tailored to the selected topic

🌙 Dark Mode UI (as shown in the screenshot)

⚡ Fast and responsive interaction with the Mistral API

🚀 Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Node.js (or similar, depending on your setup)
API: Mistral AI API

📦 Installation

Clone the repository:

git clone https://github.com/your-username/ai-category-chatbot.git
cd ai-category-chatbot

Install dependencies (if using Node.js):

npm install

Add your Mistral API key to .env file:

MISTRAL_API_KEY=your_api_key_here

Start the app:

npm start

Open in browser:

http://localhost:3000

🧩 How It Works

User selects a category (e.g., "Science", "Gaming", "Law").

Types a question in the chat input box.
The input is sent to the backend, where the category is used to prepend context to the question.
The modified prompt is sent to Mistral's API.
The response is rendered in the chat interface.

📸 Screenshot

UI Preview
alt text (Screenshot of the category UI with chat interface)

![image](https://github.com/user-attachments/assets/a48514f0-b621-4446-a23b-7cdffbc39359)

✅ Example Prompt Modification
If the user chooses "Medical" and types:

What causes migraines?
The app sends:

As a medical expert, explain in depth: What causes migraines?
This helps the model generate domain-specific, high-quality answers.

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Report repository
Releases
No releases published
Packages
No packages published
Languages
JavaScript
96.7%
 
HTML
2.2%
 
CSS
1.1%
Footer

