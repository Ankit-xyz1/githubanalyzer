"use client"
import React, { useEffect } from 'react'
import ReactMarkdown from "react-markdown";
import { Sender } from './Sender'
import { MessageSquareText } from 'lucide-react'
import { newChat } from '@/app/redux/slice/chatsSlice';
import { RootState } from '@/app/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import rehypeHighlight from "rehype-highlight";

const Chat = () => {
  const chat = useSelector((state: RootState) => state.chats.value)
  const dispatch = useDispatch()
  interface messages {
    role: String,
    user: boolean,
    message: string | undefined
  }
  useEffect(() => {
    console.log(chat);
  }, [])

  const xyz: messages = chat[1]
  return (
    <>
      <div className=" w-full md:w-[70%] h-full border border-zinc-900 rounded p-2 text-amber-100">
        <div className='h-[5vh] w-full flex gap-2 mt-2'><MessageSquareText size={32} strokeWidth={1.5} />chat</div>
        <div className=' w-full h-[1px] opacity-60 bg-zinc-700'></div>
        <div className="chatcontainerr overflow-auto h-[15%] md:h-[85%]">
          {chat.length > 1 ? chat.map((item: messages , index) => (
            <div key={index}>
              <div className={`chat ${item.user? "chat-end" : "chat-start"} rounded-b-2xl `} >
                <div className="chat-bubble rounded-2xl">
                  <ReactMarkdown>{item.message}</ReactMarkdown>
                </div>
              </div>
            </div> 
          )): null }

        </div>
        <Sender />
      </div>
    </>
  )
}

export default Chat