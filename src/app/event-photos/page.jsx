import React from 'react';
import Navbar from '@/components/layouts/navbar/Navbar';

import EventPhotos from '@/components/media/EventPhotos';
import Footer from '@/components/layouts/footer/Footer';

const EventPage = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar />
      
      <EventPhotos/>
      <Footer/>
    </div>
  );
}

export default EventPage;
