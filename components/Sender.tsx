"use client"
import { newChat } from '@/app/redux/slice/chatsSlice';
import { changeCurrentGithub, currentGithub } from '@/app/redux/slice/currentGithub';
import { toggle } from '@/app/redux/slice/loadingSlice';
import { RootState } from '@/app/redux/store/store';
import { SendHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const Sender = () => {


  // created some types 
  //type TextSection = 'paragraph' | 'newline' | 'bold' | 'heading' | 'list' | 'inline-code';
  //created  parsed blocks types
  const chat = useSelector((state: RootState) => state.chats.value)
  const githHub = useSelector((state: RootState) => state.currentGithub.value)
  const loading = useSelector((state: RootState) => state.loading.value)
  const dispatch = useDispatch()

  //data to be stored interfaces
  interface Messages {
    role: String,
    user: boolean,
    userMessage: string | undefined | "no data",
    aiMessage: any[] | undefined
  }


  //messages state for this component so it can take input from user
  const [question, setquestion] = useState<string | number | readonly string[] | undefined>("");


  useEffect(() => {
    storeCurrentChatsToLocalStorage();
  }, [chat])


  //this eill be the inerface of the object in chat history obj
  interface CurrentChatObj {
    githubLink: string,
    chats: any[]
  }

  //now we will be updating the local storage with chats and update it 
  const storeCurrentChatsToLocalStorage = (): void => {
    const curreChatTobeSaved: CurrentChatObj = {
      githubLink: githHub,
      chats: chat
    }
    localStorage.setItem("currentChat", JSON.stringify(curreChatTobeSaved))

  }

  //input handler 
  const questHnadler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setquestion(e.target.value);
  }

  //fetching response from server
  const getResponse = async () => {
    //toggling loading state to true 
    if (!question) return;
    dispatch(toggle());

    //soring question value and emptying it 
    const userChat = question;
    setquestion("")

    //storing user chat in the chatss array 
    const userMessage: Messages = {
      role: "user",
      user: true,
      userMessage: question?.toString(),
      aiMessage: undefined
    }
    dispatch(newChat([userMessage]))


    //fetching the response from llm fpr users question
    const response = await fetch("/api/genrate", {
      method: 'POST',
      body: JSON.stringify({
        question: userChat
      })
    })

    //parsing the data
    const data = await response.json()
    console.log("i am data.messaged", data.Message);

    // parsing the response in readable format
    const parsedData = parseLLMResponse(data.Message || "no response from llm")
    console.log("i am aprsed data", parsedData);

    // now storing the llm response
    const aiResponse: Messages = {
      role: "ai",
      user: false,
      userMessage: undefined,
      aiMessage: parsedData
    }
    dispatch(newChat([aiResponse]))

    //toggling back the loading state 
    dispatch(toggle());

    //after response are parsed and shown to user we will store it in localstorage
    // storeChatsToLocalStorage()
  }
  //creating a type or parsed data
  type ParsedBlock =
    | {
      type: 'code';
      isCode: boolean;
      language: string;
      content: string;
    }
    | {
      type: 'text';
      isCode: boolean;
      content: string;
      isHeading: boolean;
      newline: boolean;
      isbold: boolean;
      inlineCode: boolean;
    };


  //parrsing the code frrrom the response
  function parseLLMResponse(raw: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = [];
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(raw)) !== null) {
      const [fullMatch, language = 'plain', codeContent] = match;

      // Extract and parse text before this code block
      if (match.index > lastIndex) {
        const textChunk = raw.slice(lastIndex, match.index);
        const parsedTexts = parseTextSections(textChunk);
        blocks.push(...parsedTexts);
      }

      // Add code block (retain actual line breaks)
      blocks.push({
        type: 'code',
        isCode: true,
        language,
        content: codeContent,
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

  //parsing the text from the response
  function parseTextSections(text: string): ParsedBlock[] {
    const lines = text.split('\n');
    const parsedBlocks: ParsedBlock[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        parsedBlocks.push({
          type: 'text',
          content: '\n',
          isHeading: false,
          newline: true,
          isbold: false,
          isCode: false,
          inlineCode: false,
        });
        continue;
      }

      const block: ParsedBlock = {
        type: 'text',
        content: trimmed,
        isCode: false,
        isHeading: false,
        newline: false,
        isbold: false,
        inlineCode: false,
      };

      if (trimmed.startsWith('# ')) {
        block.isHeading = true;
      } else if (/^\*\*.+\*\*$/.test(trimmed)) {
        block.isbold = true;
      } else if (/`[^`]+`/.test(trimmed)) {
        block.inlineCode = true;
      }

      parsedBlocks.push(block);
    }

    return parsedBlocks;
  }




  return (
    <div className='w-full h-[10vh] bg-zinc-900 rounded-2xl p-4 border border-zinc-700 flex'>
      <input type="text" className='w-[90%] h-full outline-none text-xl' name="" id="" onChange={questHnadler} value={question} />
      <div className="btn h-full w-[10%] flex items-center justify-center     ">
        <button className=' cursor-pointer p-2' onClick={() => getResponse()}> <SendHorizontal /></button>
      </div>
    </div>
  )
}
