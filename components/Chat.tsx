"use client"
import React, { useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import { Sender } from './Sender'
import { MessageSquareText } from 'lucide-react'
import { newChat } from '@/app/redux/slice/chatsSlice';
import { RootState } from '@/app/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "@/components/ui/code-block";

const Chat = () => {
  const chat = useSelector((state: RootState) => state.chats.value)
  const dispatch = useDispatch()


  interface Messages {
    role: String,
    user: boolean,
    userMessage: string | undefined | "no data",
    aiMessage: any[] | undefined
  }
  type ParsedBlock =
    | { type: 'code'; isCode: boolean; language: string; content: string; }
    | {
      type: 'text'; isCode: boolean; content: string; isHeading: boolean; newline: boolean; isbold: boolean; inlineCode: boolean
    };


  useEffect(() => {
    console.log(chat);
  }, [])

  return (
    <>
      <div className=" w-full md:w-[70%] h-full border border-zinc-900 rounded p-2 text-amber-100">
        <div className='h-[5vh] w-full flex gap-2 mt-2'><MessageSquareText size={32} strokeWidth={1.5} />chat</div>
        <div className=' w-full h-[1px] opacity-60 bg-zinc-700'></div>
        <div className="chatcontainerr overflow-auto h-[15%] md:h-[85%] p-4">
          {chat.length > 0 ? chat.map((item: Messages, index) => (
            <div key={index}>
              <div className={`chat ${item.user ? "chat-end" : "chat-start"} rounded-b-2xl `} >
                <div className="chat-bubble rounded-2xl">
                  {item.user ? <><ReactMarkdown >{item.userMessage}</ReactMarkdown></> :
                    <>
                      {item.aiMessage?.map((chunkMessage) => (<>
                        {chunkMessage.isCode ? <div className='h-fit w-full overflow-hidden'><CodeBlock
                          language={chunkMessage.language}
                          filename={chunkMessage.language}
                          highlightLines={[9, 13, 14, 18]}
                          code={chunkMessage.content || ""}
                        /></div> : <>{chunkMessage.content}</>}
                      </>))}
                    </>}
                  {/* <CodeBlock
                    language="html"
                    filename="DummyComponent.jsx"
                    highlightLines={[9, 13, 14, 18]}
                    code={item.message||""}
                  /> */}
                </div>
              </div>
            </div>
          )) : null}

        </div>
        <Sender />
      </div>
    </>
  )
}

export default Chat