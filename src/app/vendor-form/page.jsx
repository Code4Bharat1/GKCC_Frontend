"use client";
import VendorForm from "@/components/vendorForm/VendorForm";
import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-36  md:mt-32">
        <VendorForm />
      </div>
      <div className="mt-2">
        <Footer />
      </div>
    </div>
  );
};

export default page;
