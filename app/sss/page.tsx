"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Dailog from "@/components/Dailog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import MainComp from "@/components/MainComp";

const page = () => {
  const githHub = useSelector((state: RootState) => state.currentGithub.value);
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
