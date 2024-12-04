import React from 'react';
import Navbar from '@/components/layouts/navbar/Navbar';
import Imageslider from '@/components/eventph/phslider';
import ImageCards from '@/components/eventph/listsofimages';

const EventPage = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Image Slider Component */}
      <div className="my-8"> You can add margins for better spacing
        <Imageslider />
      </div>

      {/* Image Cards Component */}
      <div className="my-4"> {/* Spacing between sections */}
        <ImageCards />
      </div>
    </div>
  );
}

export default EventPage;
