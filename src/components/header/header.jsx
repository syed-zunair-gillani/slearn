import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-[#3B3D43] px-4 py-3'>
          <div className='max-w-[1280px] mx-auto flex items-center justify-between'>
               <Link href="/"><Image src="/images/header-logo.png" alt="" width={155} height={100}/></Link>
               <div>
                    <Link href="#" className='text-white font-semibold'>Updates</Link>
                    <input type='text' placeholder='search here...' className='p-2 px-4 text-gray-600 placeholder:text-gray-600 rounded-full ml-7'/>
               </div>
          </div>
    </header>
  )
}

export default Header