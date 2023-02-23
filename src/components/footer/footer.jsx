import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer>
          <div className='bg-[url("/images/footer-bg.png")] bg-cover bg-bottom py-32 text-white flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-medium'>sLearn</h1>
          <p className='text-center mt-8 font-light'>is a Learning Platform and Provides Online Video Lectures, Tutorials & <br/> Engineering Courses.</p>
          </div>
          <div className='gradient-bg flex justify-center'>
               <Image src="/images/footer-logo.png" alt="footer-logo" width={120} height={120}/>
          </div>
          <div className='bg-[#374a5e] py-10 '>
               <div className='container mx-auto text-white flex justify-between'>
               <p>©2022 sLearn. All Rights Reserved.</p>
               <div>
                    <p>Made with 🖤 By Tenmark</p>
                    <p className='mt-4 text-right'>Powered by Marklane</p>
               </div>
               </div>
          </div>
    </footer>

  )
}

export default Footer