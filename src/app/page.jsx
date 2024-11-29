"use client";

import React from "react";
import Navbar from "../components/layouts/navbar/Navbar";
import Home from "../components/home/Home";

const page = () => {
  return (
    <div className="w-screen h-screen relative overflow-x-hidden ">
      <Navbar />
      <Home />
    </div>
  );
};

export default page;
