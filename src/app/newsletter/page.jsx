import React from 'react'
import Navbar from '@/components/layouts/navbar/Navbar'
import NewsLetter from '@/components/newsletter/newsletter'

const page = () => {
  return (
    <div className='w-screen h-screen overflow-x-hidden '>
      <Navbar />
      <div className='mt-[20%] md:mt-[10%] lg:mt-[5%]'>
      <NewsLetter />
      </div>
      
    </div>
  )
}

export default page