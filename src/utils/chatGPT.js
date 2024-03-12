require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.GPT_OPEN_API_KEY
});
const chatList=[];

async function callChatGPT(question) {
    chatList.push({
        role:"user",
        content:question
    })

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatList,
        max_tokens:500,
    });

    const summary=await summarized(chatCompletion.choices[0].message.content);
    chatList.push({
        role:"assistant",
        content: summary,
    })
    console.log(chatList);
    return chatCompletion;
}

//answer 요약 메서드
async function summarized(answer) {
    const answerCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'assistant', content: `${answer} 이 문장을 정말 최대한 짧게 요약해줘`}],
    });
    return answerCompletion.choices[0].message.content;
}

module.exports = { callChatGPT };