import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
  <div className='relative w-full max-w-xs'>
     <input type="text" 
     className='placeholder:text-white-200 bg-purple-500 px-4  pl-10 py-2 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-purple-950'
     placeholder='Search...' />

     <FaSearch className=' absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-white '/>
  </div>
  )
}
