import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";


export default function Dropdown() {

    const [showDropdown, setDropdown]= useState(false);
  return (
    <div className='relative'>
         <CgProfile className='h-7 w-7 text-white cursor-pointer hover:text-neutral-400' 
         onClick={()=>{setDropdown((showDropdown)=>!showDropdown)}}
         />
         {showDropdown &&(
            <div className='absolute right-0 top-15 bg-purple-900 rounded-md'>
                <div className='flex items-center px-4 py-2 w-48 rounded-lg shadow-lg hover:bg-purple-500'>
                     <CgProfile className='text-white mr-2'/>
                <span>Profile</span>
                </div>
                <div className='flex items-center px-4 py-2 hover:bg-purple-500'>
                     <AiFillSetting className='text-white mr-2'/>
                <span>Setting</span>
                </div>
                <div className='flex items-center px-4 py-2 hover:bg-purple-500'> 
                    < BiSolidLogOutCircle className='text-white mr-2'/>
                <span className='text-white'>Logout</span>
                </div>
            </div>    
         )}
    </div>
  )
}
