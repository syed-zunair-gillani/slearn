import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='text-left w-full my-40 flex justify-center items-center flex-col'>
        <h2 className='font-bold text-gray-300 text-4xl'>Hi, sLearn users 🙂</h2>
        <h3 className='text-gray-300 text-xl mt-10'>The page you are looking for doesn't exist</h3>
        <div className='text-[90px] md:text-[150px] font-extrabold flex gap-6'>
          <span className='text-[#F0E396]'>4</span>
          <span className='text-[#FFB485]'>0</span>
          <span className='text-[#D15C95]'>4</span>
        </div>
        <Link href="/" className='bg-gray-300 text-white uppercase tracking-wide p-3 px-8'>Vist the home page</Link>
    </div>
  )
}

export default NotFound