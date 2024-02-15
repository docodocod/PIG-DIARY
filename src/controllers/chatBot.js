const {callChatGPT} = require("../utils/chatGPT");


exports.renderChatBot=(req,res)=>{
    res.render('chat-bot',{title:"AI 챗봇"});
}

exports.sendChatBot=async (req,res)=> {
    const prompt = req.body.message;
    console.log(prompt);
    const response = await callChatGPT(prompt);
    if (response) {
        res.json(response);
    } else {
        res.status(500).json({'error': 'Failed to get response from ChatGPT API'});
    }
};