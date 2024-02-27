require('dotenv').config();

//chat-gpt function
async function callChatGPT(prompt) {
    const OpenAI = require("openai");

    const openai = new OpenAI({
        apiKey: process.env.GPT_OPEN_API_KEY
    });
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens:500,
    });
    return chatCompletion;
}
module.exports = { callChatGPT };