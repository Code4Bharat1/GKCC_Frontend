"use client"
import React from 'react';
import Navbar from '@/components/layouts/navbar/Navbar';


import Footer from '@/components/layouts/footer/Footer';
import EventVideos from '@/components/media/EventVideos';

const EventPage = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar />
      
      <EventVideos/>
      <Footer/>
    </div>
  );
}

export default EventPage;
