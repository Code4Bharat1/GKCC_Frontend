"use client";
import React from "react";

import Navbar from "@/components/layouts/navbar/Navbar";
import MembershipForm from "@/components/membershipForm/MembershipForm";
import Footer from "@/components/layouts/footer/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <MembershipForm />
      </div>
      <div className="mt-2">
        <Footer />
      </div>
    </>
  );
};

export default page;
