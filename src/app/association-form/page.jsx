"use client";
import AssociationForm from "@/components/associationForm/AssociationForm";
import Footer from "@/components/layouts/footer/Footer";
import Navbar from "@/components/layouts/navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <AssociationForm />
      </div>
      <div className="mt-2">
        <Footer />
      </div>
    </div>
  );
};

export default page;
