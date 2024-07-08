import axios from 'axios';
import * as dotenv from 'dotenv';
import { openai } from '../index.js';

dotenv.config();

const sentText = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    // console.log('Received request body:', req.body);

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: text },
      ],
    });

    // console.log('OpenAI response:', response.data);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
          'User-Name': process.env.CHAT_ENGINE_BOT_USER_NAME,
          'User-Secret': process.env.CHAT_ENGINE_BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error in sentText:', error);
    res.status(500).json({ error: error.message });
  }
};

const sentCode = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    // console.log('Received request body:', req.body);

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant coder who responds with only code and no explanations.',
        },
        { role: 'user', content: text },
      ],
    });

    // console.log('OpenAI response:', response.data);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          'Project-ID': process.env.CHAT_ENGINE_PROJECT_ID,
          'User-Name': process.env.CHAT_ENGINE_BOT_USER_NAME,
          'User-Secret': process.env.CHAT_ENGINE_BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error in sentCode:', error);
    res.status(500).json({ error: error.message });
  }
};

const sentAssist = async (req, res) => {
  try {
    const { text } = req.body;

    // console.log('Received request body:', req.body);

    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        },
        { role: 'user', content: `Finish my thought: ${text}` },
      ],
    });

    // console.log('OpenAI response:', response.data);

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error in sentAssist:', error);
    res.status(500).json({ error: error.message });
  }
};

export { sentText, sentCode, sentAssist };
