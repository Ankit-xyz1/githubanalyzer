import React from 'react'
import { Navbar1 } from './Navbar'
import { SidebarDemo } from './Sidebar'

const MainComp = () => {
  return (<>
  <div className='h-fit bg-zinc-950'>

    <div className=' w-full min-h-[10vh]'>
      <Navbar1 />
    </div>
    <div className='flex p-4 flex-row'>
        <SidebarDemo/>
    </div>
  </div>
  </>
  )
}

export default MainComp