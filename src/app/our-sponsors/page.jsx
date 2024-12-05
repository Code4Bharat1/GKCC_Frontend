import Footer from '@/components/layouts/footer/Footer';
import Navbar from '@/components/layouts/navbar/Navbar';
import Sponsors from '@/components/sponsors/sponsors';
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar/>
<Sponsors/>
         <Footer/>
    </div>
  )
}

export default page;