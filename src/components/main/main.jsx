import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Main = () => {
  return (
    <main>
        <div className='container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {
            [1,2,3].map((item,idx)=>{
              return(
                <Link href="#" key={idx} className="flex justify-center items-center flex-col shadow-md rounded-lg py-10 hover:shadow-lg">
                  <Image src="/images/book-open.png" alt="logo" width={80} height={80}/>
                  <h3 className='font-bold text-2xl mt-2'>KTU</h3>
                </Link>
              )
            })
          }
        </div>
    </main>
  )
}

export default Main