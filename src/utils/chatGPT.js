const dotenv=require('dotenv');
const {OpenAIApi}= require("openai");
const EasyGPT=require('easygpt');
dotenv.config();

async function callChatGPT(prompt) {
    const gpt = new EasyGPT();
    gpt
        .setApiKey(process.env.GPT_OPEN_API_KEY)
        .addMessage(prompt);
        .then(response => console.log(response));

}

module.exports = { callChatGPT };