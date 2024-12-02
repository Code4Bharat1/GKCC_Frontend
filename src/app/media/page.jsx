import React from 'react'
import Navbar from '@/components/layouts/navbar/Navbar'
import Aboutus from '@/components/aboutus/Aboutus'

const page = () => {
  return (
    <div className='w-screen h-screen overflow-x-hidden '>
      <Navbar />
      <div className='mt-[20%] md:mt-[10%] lg:mt-[5%]'>
      <Aboutus />
      </div>
      
    </div>
  )
}

export default page