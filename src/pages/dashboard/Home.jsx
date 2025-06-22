import React from 'react'
import { FiPlus } from 'react-icons/fi';
import { MdOutlineViewAgenda } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Tasks from '../../components/Tasks/Tasks';
const Home = () => {
  return (
    <>
    <div className='flex items-start sm:items-center flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between '>
      <div className='flex items-center gap-8'>
       <div className='flex items-center gap-2'>
        <MdOutlineViewAgenda size={20} />
        <span className='font-semibold'>Board view</span>
       </div>
       <div className='flex items-center gap-2'>
        <button className='flex items-center justify-center bg-gray-200 p-[2px] rounded-full cursor-pointer'>
                <FiPlus className='text-gray-500 text-sm' />
               </button>
        <span className='font-semibold'>Add view</span>

       </div>
      </div>
      <div className='flex items-center gap-4'>
        <span className='font-semibold'>Filter</span>
        <span className='font-semibold text-gray-400'>Sort</span>
        <div>
            <button className='flex items-center justify-center border-2 border-gray-300 h-6 w-6 rounded-full cursor-pointer'>
                <BsThreeDots className='text-gray-600' />
            </button>
        </div>
        <div className='flex items-center gap-2 bg-black px-4 py-[6px] rounded-4xl text-white cursor-pointer'>
            New template
        </div>
      </div>
    </div>
      <div className='h-[2px] w-full bg-gray-200 mt-4 relative'>
        <div className='h-[2px] w-[10%] bg-gray-600 absolute top-0 left-0'></div>
      </div>
      <Tasks />
        </>

  )
}

export default Home
