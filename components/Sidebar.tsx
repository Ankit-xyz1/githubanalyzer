"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { History, MessageCircleMore, Plus } from "lucide-react";
import Chat from "./Chat";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-white " />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-white " />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-white " />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-white " />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-zinc-700 bg-zinc-950 md:flex-row",
        "h-[85vh]", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2 text-white">

              <button className=" w-[90%] bg-zinc-900 h-fit py-2 px-1 text-left rounded cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200  flex gap-2 items-center overflow-hidden"> <Plus strokeWidth={4} className="h-4 w-4 font-bold shrink-0 ml-0.5" />  NewChat </button>
              <button className="w-[90%] bg-zinc-900 h-fit py-2 px-1 text-left rounded cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200 overflow-hidden flex gap-2 items-center"> <MessageCircleMore strokeWidth={1.5} className="shrink-0 h-4 w-4 ml-0.5" /> xxxasdddddds</button>
              <button className="w-[90%] bg-zinc-900 h-fit py-2 px-1 text-left rounded cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200 overflow-hidden flex gap-2 items-center"> <MessageCircleMore strokeWidth={1.5} className="shrink-0 h-4 w-4 ml-0.5" /> xxxasdddddds</button>
              <button className="w-[90%] bg-zinc-900 h-fit py-2 px-1 text-left rounded cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200 overflow-hidden flex gap-2 items-center"> <MessageCircleMore strokeWidth={1.5} className="shrink-0 h-4 w-4 ml-0.5" /> xxxasdddddds</button>
              <button className="w-[90%] bg-zinc-900 h-fit py-2 px-1 text-left rounded cursor-pointer hover:bg-zinc-700 transition-all ease-in duration-200 overflow-hidden flex gap-2 items-center"> <MessageCircleMore strokeWidth={1.5} className="shrink-0 h-4 w-4 ml-0.5" /> xxxasdddddds</button>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Back",
                href: "/",
                icon: (
                  <IconArrowLeft className="h-5 w-5 shrink-0  dark:text-white" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-transparent" ><History /></div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        History
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-black" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-zinc-800 bg-zinc-950 p-2 md:p-10  ">
        <Chat />
      </div>
    </div>
  );
};
