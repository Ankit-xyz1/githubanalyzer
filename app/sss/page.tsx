"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Dailog from "@/components/Dailog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import MainComp from "@/components/MainComp";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { changeCurrentGithub } from "../redux/slice/currentGithub";
import { changeToNewChat, newChat } from "../redux/slice/chatsSlice";

const page = () => {
  const githHub = useSelector((state: RootState) => state.currentGithub.value);
  const dispatch = useDispatch()
  
  //this will be the inerface of the object in chat history obj
  interface CurrentChatObj {
    githubLink: string,
    chats: any[]
  }

  useEffect(() => {
    // This runs only once on initial render (like on refresh)
    const data = localStorage.getItem('currentChat');
    const parsedData: CurrentChatObj = data ? JSON.parse(data) : null;
    console.log("i am parsed data", parsedData)
      dispatch(changeToNewChat())
      dispatch(changeCurrentGithub(parsedData.githubLink))
      dispatch(newChat(parsedData.chats))
  }, []);



  return (
    <>
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
        {githHub ? (
          <>
            <div className="h-screen w-full xxxxx">
              <MainComp />
            </div>
          </>
        ) : (
          <Dailog />
        )}
      </div>
    </>
  );
};

export default page;
