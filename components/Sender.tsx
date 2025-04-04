"use client"
import { newChat } from '@/app/redux/slice/chatsSlice';
import { RootState } from '@/app/redux/store/store';
import { SendHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const Sender = () => {


  // created some types 
  //type TextSection = 'paragraph' | 'newline' | 'bold' | 'heading' | 'list' | 'inline-code';
  //created  parsed blocks types
  type ParsedBlock =
    | { type: 'code'; isCode: boolean; language: string; content: string; }
    | {
      type: 'text'; isCode: boolean; content: string; isHeading: boolean; newline: boolean; isbold: boolean; inlineCode: boolean
    };

  const chat = useSelector((state: RootState) => state.chats.value)
  const dispatch = useDispatch()


  //data to be stored interfaces
  interface messages {
    role: String,
    user: boolean,
    message: string | undefined
  }

  //messages state for this component so it can take input from user
  const [question, setquestion] = useState<string | number | readonly string[] | undefined>("");
  //input handler 
  const questHnadler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setquestion(e.target.value);
  }

  //fetching response from server
  const getResponse = async () => {
    const response = await fetch("/api/genrate", {
      method: 'POST',
      body: JSON.stringify({
        question: question
      })
    })
    const data = await response.json()

    console.log("i am data.messaged", data.Message);

    const parsedData = parseLLMResponse(data.Message || "no response from llm")
    console.log("i am aprsed data", parsedData);

    // now storing the data
    const userMessage: messages = {
      role: "user",
      user: true,
      message: question?.toString()
    }


    const aiResponse: messages = {
      role: "ai",
      user: false,
      message: data.Message
    }
    dispatch(newChat([userMessage, aiResponse]))
    setquestion("")
    console.log(chat);
  }


  //so this functions parsed the llm response and returrns an array
  function parseLLMResponse(raw: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = [];
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(raw)) !== null) {
      const [fullMatch, language = 'plain', codeContent] = match;

      // Extract text before this code block
      if (match.index > lastIndex) {
        const textChunk = raw.slice(lastIndex, match.index);
        const parsedTexts = parseTextSections(textChunk);
        blocks.push(...parsedTexts);
      }

      // Add code block
      blocks.push({
        type: 'code',
        isCode:true,
        language,
        content: codeContent.replace(/\n/g, '\\n'),
      });

      lastIndex = match.index + fullMatch.length;
    }

    // Add remaining text after the last code block
    const remainingText = raw.slice(lastIndex);
    if (remainingText.trim()) {
      blocks.push(...parseTextSections(remainingText));
    }

    return blocks;
  }

  function parseTextSections(text: string): ParsedBlock[] {
    const lines = text.split('\n');
    const parsedBlocks: ParsedBlock[] = [];

    for (const line of lines) {
      if (!line.trim()) {
        parsedBlocks.push({ type: 'text', content: '\\n', isHeading: false, newline: true, isbold: false,isCode:false ,inlineCode: false });
        continue;
      }

      if (line.startsWith('# ')) {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: true, newline: false, isbold: false ,isCode:false ,inlineCode: false });
      } else if (/^\*\*.+\*\*$/.test(line)) {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: false, newline: false, isbold: true  ,isCode:false ,inlineCode: false});
      } else if (/^[-*]\s+.+/.test(line)) {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: false, newline: false, isbold: false ,isCode:false ,inlineCode: false });
      } else if (/^\d+\.\s+.+/.test(line)) {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: false, newline: false, isbold: false ,isCode:false ,inlineCode: false });
      } else if (/`[^`]+`/.test(line)) {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: false, newline: false, isbold: false ,isCode:false ,inlineCode: true });
      } else {
        parsedBlocks.push({ type: 'text', content: line.trim(), isHeading: false, newline: false, isbold: false ,isCode:false ,inlineCode: false });
      }
    }

    return parsedBlocks;
  }


  return (
    <div className='w-full h-[10vh] bg-zinc-900 rounded-2xl p-4 border border-zinc-700 flex'>
      <input type="text" className='w-[90%] h-full outline-none text-xl' name="" id="" onChange={questHnadler} value={question} />
      <div className="btn h-full w-[10%] flex items-center justify-center bg-blue-500 ">
        <button className='bg-red-600 cursor-pointer p-2' onClick={() => getResponse()}> <SendHorizontal /></button>
      </div>
    </div>
  )
}
