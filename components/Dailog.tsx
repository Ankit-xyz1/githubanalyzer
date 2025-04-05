import MainComp from '@/components/MainComp'
import React from 'react'
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"



const Dailog = () => {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild className='bg-zinc-900 text-amber-100'>
                    <Button variant="outline" className='bg-zinc-800 text-white'>GetStarted</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-zinc-900 text-amber-100'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter a github Link</AlertDialogTitle>
                        <AlertDialogDescription>
                            <input className='border-white border-1 p-2 rounded h-10 w-[70%] outline-none text-white' type='text'/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='border-2 border-white bg-zinc-800 rounded-md cursor-pointer'>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='border-2 border-white bg-zinc-800 rounded-md cursor-pointer'>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default Dailog