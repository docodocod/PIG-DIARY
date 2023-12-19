const axios = require('axios');
const dotenv=require('dotenv');
const {Configuration, OpenAIApi}=require('openai');
dotenv.config();

const API_KEY = process.env.GPT_OPEN_API_KEY; // OpenAI API 키를 여기에 입력하세요

async function callChatGPT(prompt){
    const configuration=new Configuration({
        apiKey:API_KEY
    });
    try{
        const openai=new OpenAIApi(configuration);

        const response=await openai.createChatCompletion({
            model:"gpt-3.5 turbo",
            messages: [{role:"user", content: prompt}],
        });
        return response.data.choices[0].message;
    }catch(err){
        console.error("Error calling chatGPT API:",err);
        return null;
    }
}

module.exports={callChatGPT};