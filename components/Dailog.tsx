"use client";
import MainComp from "@/components/MainComp";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { changeCurrentGithub } from "@/app/redux/slice/currentGithub";
import { newChat } from "@/app/redux/slice/chatsSlice";
import { log } from "console";
import { toggle } from "@/app/redux/slice/loadingSlice";

const Dailog = () => {
  interface Messages {
    role: String,
    user: boolean,
    userMessage: string | undefined | "no data",
    aiMessage: any[] | undefined
  }


  //createing dispatch
  const dispatch = useDispatch();

  //inporting states from redux
  const githHub = useSelector((state: RootState) => state.currentGithub.value);
  const chat = useSelector((state: RootState) => state.chats.value);

  //creating some local states fro handling inputs
  const [gitInputValue, setgitInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setgitInputValue(e.target.value);
  };

  const updateGithub = () => {
    console.log("hello");
    dispatch(changeCurrentGithub(gitInputValue));

    const questToBeSendToLLm:string = `hey this is github repository ${gitInputValue || "no repo entered "}  how to clone it in my local machine and what are the tech stack used`;
    getResponse(questToBeSendToLLm);
  };



  const getResponse = async (quest:string) => {
    if(!quest) return ;
    //toggling loading state to true
    dispatch(toggle());

    //soring question value and emptying it no need here 

    //fetching the response from llm fpr users question
    const response = await fetch("/api/genrate", {
      method: "POST",
      body: JSON.stringify({
        question: quest,
      }),
    });

    //parsing the data
    const data = await response.json();
    console.log("i am data.messaged", data.Message);

    // parsing the response in readable format
    const parsedData = parseLLMResponse(data.Message || "no response from llm");
    console.log("i am aprsed data", parsedData);

    // now storing the llm response
    const aiResponse: Messages = {
      role: "ai",
      user: false,
      userMessage: undefined,
      aiMessage: parsedData,
    };
    dispatch(newChat([aiResponse]));

    //toggling back the loading state
    dispatch(toggle());
  };

  type ParsedBlock =
    | {
        type: "code";
        isCode: boolean;
        language: string;
        content: string;
      }
    | {
        type: "text";
        isCode: boolean;
        content: string;
        isHeading: boolean;
        newline: boolean;
        isbold: boolean;
        inlineCode: boolean;
      };

  function parseLLMResponse(raw: string): ParsedBlock[] {
    const blocks: ParsedBlock[] = [];
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeRegex.exec(raw)) !== null) {
      const [fullMatch, language = "plain", codeContent] = match;

      // Extract and parse text before this code block
      if (match.index > lastIndex) {
        const textChunk = raw.slice(lastIndex, match.index);
        const parsedTexts = parseTextSections(textChunk);
        blocks.push(...parsedTexts);
      }

      // Add code block (retain actual line breaks)
      blocks.push({
        type: "code",
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

  function parseTextSections(text: string): ParsedBlock[] {
    const lines = text.split("\n");
    const parsedBlocks: ParsedBlock[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        parsedBlocks.push({
          type: "text",
          content: "\n",
          isHeading: false,
          newline: true,
          isbold: false,
          isCode: false,
          inlineCode: false,
        });
        continue;
      }

      const block: ParsedBlock = {
        type: "text",
        content: trimmed,
        isCode: false,
        isHeading: false,
        newline: false,
        isbold: false,
        inlineCode: false,
      };

      if (trimmed.startsWith("# ")) {
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
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild className="bg-zinc-900 text-amber-100">
          <Button variant="outline" className="bg-zinc-800 text-white">
            GetStarted
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-zinc-900 text-amber-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Enter a github Link</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                className="border-white border-1 p-2 rounded h-10 w-[70%] outline-none text-white"
                value={gitInputValue}
                onChange={handleInputChange}
                type="text"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-2 border-white bg-zinc-800 rounded-md cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <div className="border-2 border-white bg-zinc-800 rounded-md cursor-pointer">
              <Button
                variant="outline"
                className="bg-zinc-800 text-white"
                onClick={() => updateGithub()}
              >
                letsGo
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dailog;
