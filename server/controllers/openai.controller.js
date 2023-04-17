import axios from "axios";
import * as dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();

const sentText = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
          "User-Name": process.env.CHAT_ENGINE_BOT_USER_NAME,
          "User-Secret": process.env.CHAT_ENGINE_BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const sentCode = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant coder who responds with only code and no explanations.",
        }, 
        { role: "user", content: text }, 
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
          "User-Name": process.env.CHAT_ENGINE_BOT_USER_NAME,
          "User-Secret": process.env.CHAT_ENGINE_BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sentAssist = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        }, 
        { role: "user", content: `Finish my thought: ${text}` },
      ],
    });

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { sentText, sentCode, sentAssist };
