const axios = require('axios');

const API_KEY = 'YOUR_OPENAI_API_KEY'; // OpenAI API 키를 여기에 입력하세요
const ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // ChatGPT의 엔진 엔드포인트

async function sendChatGPTRequest(prompt) {
    try {
        const response = await axios.post(
            ENDPOINT,
            {
                prompt: prompt,
                max_tokens: 50, // 생성된 텍스트의 최대 토큰 수 (원하는 값으로 조정 가능)
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );

        const chatResponse = response.data.choices[0].text;
        console.log(chatResponse);
    } catch (error) {
        console.error('ChatGPT 요청 중 오류 발생:', error);
    }
}

// ChatGPT에 보낼 입력 메시지를 설정
const userMessage = '번역기를 사용하는 방법을 알려줄래?';

// ChatGPT에 요청 보내기
sendChatGPTRequest(userMessage);