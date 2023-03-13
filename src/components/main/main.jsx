import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Main = ({data}) => {
  return (
    <main>
        <div className='container mx-auto px-3 py-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
          {
            data.map((uni,idx)=>{
              return(
                <Link href={uni.slug?.current} key={idx} className="flex justify-center border border-gray-100 items-center flex-col shadow rounded-md py-[62px]">
                  <Image src={uni.icon} alt="logo" width={80} height={80}/>
                  <h3 className='font-bold text-2xl mt-2'>{uni?.university_name}</h3>
                </Link>
              )
            })
          }
        </div>
    </main>
  )
}

export default Main