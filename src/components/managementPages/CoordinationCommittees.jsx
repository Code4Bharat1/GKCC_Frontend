import React from 'react';
import Card from '../ManagementCard/Card';
import Navbar from '../layouts/navbar/Navbar';
import { IoPerson } from "react-icons/io5";

const CoordinationCommittees = () => {
  return (

   <>
   <div className="h-2 block w-full" id='CoordinationCommittees'></div>
      <div className="w-full h-full mt-[5%]" >
        <Navbar />
        <div className="w-full h-full pt-5 mt-[10%]">
          <h1 className="text-center text-[#1A8FE3] font-medium text-3xl sm:text-4xl md:text-5xl mt-20 sm:mt-8 md:mt-5" >
            Coordination Committees
          </h1>
          <div className="w-full h-full flex flex-wrap justify-center gap-5 md:gap-10 pt-5 px-5 mt-10">
            <Card
              // imageSrc="/path/to/image1.jpg"
              name="Sara Ahmed"
              title="@sara_ahmed"
              description="Expert in community outreach and event planning."
              tooltipTitle="Coordination Committees"
              Icon={IoPerson}
            />
            <Card
              // imageSrc="/path/to/image2.jpg"
              name="Rizwan Malik"
              title="@rizwan_malik"
              description="Specialist in logistics and resource management."
              tooltipTitle="Coordination Committees"
              Icon={IoPerson}
            />
            <Card
              // imageSrc="/path/to/image3.jpg"
              name="Amina Shah"
              title="@amina_shah"
              description="Consultant for interfaith dialogue and collaboration."
              tooltipTitle="Coordination Committees"
              Icon={IoPerson}
            />
          </div>
        </div>
      </div>
   </>
  );
}

export default CoordinationCommittees;
