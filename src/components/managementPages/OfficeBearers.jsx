import React from "react";
import Navbar from "../layouts/navbar/Navbar";
import Card from "../ManagementCard/Card";
import { SiMainwp } from "react-icons/si";

const OfficeBearers = () => {
  return (
    <>
     <div className="h-2 block w-full" id="OfficeBearers"></div>
      <div className="w-full h-full mt-[6%]" >
        <Navbar />
        <div className="w-full h-full pt-5">
          <h1 className="text-center text-[#1A8FE3] font-medium text-3xl sm:text-4xl md:text-5xl mt-20 sm:mt-8 md:mt-5">
            Office Bearers
          </h1>
          <div className="w-full h-full flex flex-wrap justify-center gap-5 md:gap-10 pt-5 px-5 mt-10">
            <Card
              // imageSrc="/pp.jpg"
              name="Salim Ansari"
              title="@salim_ansari"
              description="Leader in community engagement and welfare initiatives."
              tooltipTitle="Office Bearers"
              Icon={SiMainwp}
            />
            <Card
              // imageSrc="/pp.jpg"
              name="Huda Begum"
              title="@huda_begum"
              description="Expert in organizational management and outreach."
              tooltipTitle="Office Bearers"
              Icon={SiMainwp}
            />
            <Card
              // imageSrc="/path/to/image3.jpg"
              name="Faizan Khan"
              title="@faizan_khan"
              description="Advocate for youth development and empowerment."
              tooltipTitle="Office Bearers"
              Icon={SiMainwp}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeBearers;
