"use client"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, icrementby2, increment } from '@/app/redux/slice/counterSlice'
import { RootState } from "@/app/redux/store/store";
import { Button } from '@/components/ui/button';
import MainComp from '@/components/MainComp';
import { Navbar1 } from '@/components/Navbar';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch()

  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
      <div className='h-screen w-full bg-zinc-950'>
        <Navbar1 />
        <div className='w-full h-[13vh]'></div>
        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-white font-sans tracking-tight">
            Struggling with Repos?{" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">Here you go.</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">Here you go.</span>
              </div>
            </div>
          </h2>
          <Link href={'/sss'} className='text-white hover:underline'>Get started?</Link>
        </BackgroundBeamsWithCollision>
      </div>
    </>
  );
}
