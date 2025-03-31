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
    <div className='flex flex-col w-[200px] h-fit gap-2 hidden'>
      Landing page {count}
      <Button onClick={()=>dispatch(increment())}>increment</Button>
      <Button onClick={()=>dispatch(icrementby2())}>increment by 2 </Button>
      <Button onClick={()=>dispatch(decrement())}>decrement</Button>
    </div>
    <div className='h-screen w-full bg-zinc-900'>
      <MainComp/>
    </div>
    </>
  );
}
