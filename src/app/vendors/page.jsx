import React from "react";
import Navbar from "@/components/layouts/navbar/Navbar";
import VendorProf from "@/components/vendors/VendorProf";
const page = () => {
  return (
    <div className="w-screen mt-32 md:mt-0 h-screen overflow-x-hidden">
      <VendorProf />
    </div>
  );
};

export default page;
