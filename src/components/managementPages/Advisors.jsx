import React from "react";
import Card from "../ManagementCard/Card";
import Navbar from "../layouts/navbar/Navbar";
import { SiBackbonedotjs } from "react-icons/si";

const Advisors = () => {
  return (
    <div className="w-full h-full mt-[6%]">
      <Navbar />
      <div className="w-full h-full pt-5">
        <h1 className="text-center text-[#1A8FE3] font-medium text-3xl sm:text-4xl md:text-5xl mt-20 sm:mt-8 md:mt-5">
          Advisors
        </h1>
        <div className="w-full h-full flex flex-wrap justify-center gap-5 md:gap-10 pt-5 px-5 mt-10">
          <Card
            // imageSrc="/path/to/image1.jpg"
            name="Ayaan Khan"
            title="@ayaan_khan"
            description="Expert in community development and social entrepreneurship."
            tooltipTitle="Community Leaders"
            Icon={SiBackbonedotjs}
          />
          <Card
            // imageSrc="/path/to/image2.jpg"
            name="Fatima Noor"
            title="@fatima_noor"
            description="Specialist in educational reform and youth empowerment."
            tooltipTitle="Education Advocates"
            Icon={SiBackbonedotjs}
          />
          <Card
            // imageSrc="/path/to/image3.jpg"
            name="Zaid Ali"
            title="@zaid_ali"
            description="Consultant in intercultural dialogue and conflict resolution."
            tooltipTitle="Cultural Advisors"
            Icon={SiBackbonedotjs}
          />
        </div>
      </div>
    </div>
  );
};

export default Advisors;
