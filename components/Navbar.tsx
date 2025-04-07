"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import {GitFork, Github, Linkedin, TvMinimalPlay, Twitter, TwitterIcon} from 'lucide-react'

export function Navbar1() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0  max-w-5xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Menu">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Home</HoveredLink>
            <HoveredLink href="/sss">GetStarted</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Its  free Dude</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
          <Link href="https://github.com/Ankit-xyz1/githubanalyzer" target="_blank"><Github /></Link>
          <Link href="/about"><Linkedin /></Link>
          <Link href="/about"><TwitterIcon /></Link>
          <Link href="/about"><TvMinimalPlay /></Link>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
