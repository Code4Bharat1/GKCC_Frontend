import Footer from "@/components/layouts/footer/Footer";
import Advisors from "@/components/managementPages/Advisors";
import CoordinationCommittees from "@/components/managementPages/CoordinationCommittees";
import ExecutiveManagers from "@/components/managementPages/ExecutiveManagers";
import InternalCommittee from "@/components/managementPages/Internal-Committee";
import OfficeBearers from "@/components/managementPages/OfficeBearers";

import React from "react";

const page = () => {
  return (
    <>
      <div className="w-screen h-full  z-51 overflow-x-hidden mt-[12%] md:mt-2">
        <OfficeBearers />
        <ExecutiveManagers />
        <CoordinationCommittees />
        <Advisors />
        <InternalCommittee />
        <div className="mt-[150%] md:mt-[10%] lg:mt-[10%]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
