import Footer from "@/components/layouts/footer/Footer";
import Advisors from "@/components/managementPages/Advisors";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Advisors />

      <div className="mt-[150%] md:mt-[10%] lg:mt-[0%]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
