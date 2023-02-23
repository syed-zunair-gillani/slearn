import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-gray-700 px-4 py-3'>
          <div className='container mx-auto flex items-center justify-between'>
               <Link href="/"><Image src="/images/header-logo.png" alt="" width={130} height={100}/></Link>
               <div>
                    <Link href="#" className='text-white'>Updates</Link>
                    <input type='text' placeholder='search here...' className='p-2 rounded-full ml-3'/>
               </div>
          </div>
    </header>
  )
}

export default Header