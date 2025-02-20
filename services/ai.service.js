const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.google_gemini_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContent() {
  if (!global.userMessage) {
    return "No user message available"; // Avoid crashing the app
  }

  try {
    const prompt = global.userMessage;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Error generating content.";
  }
}

module.exports = generateContent;
