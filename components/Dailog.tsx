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
import { log } from "console";
const Dailog = () => {
  const dispatch = useDispatch();
  const githHub = useSelector((state: RootState) => state.currentGithub.value);

  const [gitInputValue, setgitInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setgitInputValue(e.target.value);
  };

  const updateGithub = () => {
    console.log("hello");

    dispatch(changeCurrentGithub(gitInputValue));
  };
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
