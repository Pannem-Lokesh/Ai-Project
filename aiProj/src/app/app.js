import axios from "axios";  // Use `const axios = require("axios")` for CommonJS

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
console.log(apiKey); // Should print your API key

 async function getMistralResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-tiny",  // You can use "mistral-small" or "mixtral" too
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return "An error occurred while processing your request.";
  }
}
export default getMistralResponse;