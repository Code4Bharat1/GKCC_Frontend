import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import Vision from "@/components/aboutDets/Vision";
import Mission from "@/components/aboutDets/Mission";
const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden ">
      <Navbar />
      <div className="mt-[20%] md:mt-[10%] lg:mt-[5%]"></div>
      <div className="mt-[15em] sm:mt-[10em] md:mt-[5em] lg:mt-[5em] xl:mt-[5em]">
        <Vision />
      </div>
      <div className="mt-[15em] sm:mt-[10em] md:mt-[5em] lg:mt-[5em] xl:mt-[5em]">
        <Mission />
      </div>
    </div>
  );
};

export default page;
