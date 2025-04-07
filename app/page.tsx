"use client"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, icrementby2, increment } from '@/app/redux/slice/counterSlice' 
import { RootState } from "@/app/redux/store/store";
import { Button } from '@/components/ui/button';
import MainComp from '@/components/MainComp';

export default function Home() {
  const dispatch = useDispatch()

  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
    <div className='h-screen w-full bg-zinc-950'>
      <MainComp/>
    </div>
    </>
  );
}
