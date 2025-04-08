"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { changeCurrentGithub } from "@/app/redux/slice/currentGithub";
import { newChat } from "@/app/redux/slice/chatsSlice";
import { toggle } from "@/app/redux/slice/loadingSlice";
import MainComp from "@/components/MainComp";
import Dailog from "@/components/Dailog";
import { log } from "console";

const UserPage = () => {
  interface Messages {
    role: String;
    user: boolean;
    userMessage: string | undefined | "no data";
    aiMessage: any[] | undefined;
  }

  const dispatch = useDispatch();
  const githHub = useSelector((state: RootState) => state.currentGithub.value);

  const params = useParams(); // Gets dynamic params from the URL
  useEffect(() => {
    //logging the params
    console.log(params.slug);

    //if there are params
    if (params.slug) {
      const gitLink: string =
        "https://github.com/" + params.slug[0] + "/" + params.slug[1] ||
        "noLinkFound";
      console.log("iam gitlink from search bar", gitLink);
      dispatch(changeCurrentGithub(gitLink));
      console.log("i am github link state ", (githHub) || "it is null");

      const questToBeSendToLLm: string = `hey this is github repository ${gitLink || "no repo entered "
        }  how to clone it in my local machine and what is the folder structure of this repository answer t preciesly`;
      getResponse(questToBeSendToLLm);
    }
  }, [params.slug]); //this should be only done if params changes

  const getResponse = async (quest: string) => {
    if (!quest) return;
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
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
        <>
          <div className="h-screen w-full xxxxx">
            <MainComp />
          </div>
        </>
      </div>
    </>
  );
};

export default UserPage;
