"use client"
import { newChat } from '@/app/redux/slice/chatsSlice';
import { RootState } from '@/app/redux/store/store';
import { SendHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const Sender = () => {

  const chat = useSelector((state: RootState)  => state.chats.value)
  const dispatch = useDispatch()
  

  //data to be stored interfaces
  interface messages{
    role:String,
    user:boolean,
    message:string | undefined
  }

  //messages state for this component so it can take input from user
  const [question, setquestion] = useState<string | number | readonly string[] | undefined>("");
  //input handler 
  const questHnadler =  (e:React.ChangeEvent<HTMLInputElement>):void =>{
    setquestion(e.target.value);
  }

  //fetching response from server
  const getResponse = async()=>{
    const response = await fetch("/api/genrate",{
      method:'POST',
      body:JSON.stringify({
        question:question
      })
    })
    const data = await response.json()
    console.log(data.Message);

    // now storing the data
    const userMessage:messages = {
      role:"user",
      user:true,
      message:question?.toString()
    }
    

    const aiResponse:messages = {
      role:"ai",
      user:false,
      message:data.Message
    }
    dispatch(newChat([userMessage , aiResponse]))
    setquestion("")
    console.log(chat);
  }


  return (
    <div className='w-full h-[10vh] bg-zinc-900 rounded-2xl p-4 border border-zinc-700 flex'>
      <input type="text" className='w-[90%] h-full outline-none text-xl' name="" id="" onChange={questHnadler} value={question} />
      <div className="btn h-full w-[10%] flex items-center justify-center bg-blue-500 ">
      <button className='bg-red-600 cursor-pointer p-2' onClick={()=>getResponse()}> <SendHorizontal /></button>
      </div>
    </div>
  )
}
