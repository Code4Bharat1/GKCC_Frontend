import React from 'react';
import Card from '../ManagementCard/Card';
import Navbar from '../layouts/navbar/Navbar';
import { GrUserManager } from "react-icons/gr";

const ExecutiveManagers = () => {
  return (
    <div className="w-full h-full mt-[6%]">
      <Navbar />
      <div className="w-full h-full pt-5">
        <h1 className="text-center text-[#1A8FE3] font-medium text-3xl sm:text-4xl md:text-5xl mt-20 sm:mt-8 md:mt-5">
          Executive Managers
        </h1>
        <div className="w-full h-full flex flex-wrap justify-center gap-5 md:gap-10 pt-5 px-5 mt-10">
          <Card
            // imageSrc="/path/to/image1.jpg"
            name="Nadia Khan"
            title="@nadia_khan"
            description="Expert in strategic planning and team leadership."
            tooltipTitle="Executive Managers"
            Icon={GrUserManager}
          />
          <Card
            // imageSrc="/path/to/image2.jpg"
            name="Omar Patel"
            title="@omar_patel"
            description="Specialist in financial management and resource allocation."
            tooltipTitle="Executive Managers"
            Icon={GrUserManager}
          />
          <Card
            // imageSrc="/path/to/image3.jpg"
            name="Leila Iqbal"
            title="@leila_iqbal"
            description="Consultant for operational efficiency and project management."
            tooltipTitle="Executive Managers"
            Icon={GrUserManager}
          />
        </div>
      </div>
    </div>
  );
}

export default ExecutiveManagers;
