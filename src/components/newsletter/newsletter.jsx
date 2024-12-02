"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";

const NewsLetter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("2024");
  const newsletters = [
    { label: "Newsletter 1.1", description: "December 2024", href: "/documents/newsletter1.1.pdf", isNew: true },
    { label: "Newsletter 1.2", description: "November 2024", href: "/documents/newsletter1.2.pdf", isNew: true },
    { label: "Newsletter 1.3", description: "October 2024", href: "/documents/newsletter1.3.pdf" },
    { label: "Newsletter 1.4", description: "September 2024", href: "/documents/newsletter1.4.pdf" },
    { label: "Newsletter 1.5", description: "August 2024", href: "/documents/newsletter1.5.pdf" },
    { label: "Newsletter 1.6", description: "July 2024", href: "/documents/newsletter1.6.pdf" },
    { label: "Newsletter 1.7", description: "June 2024", href: "/documents/newsletter1.7.pdf" },
    { label: "Newsletter 1.8", description: "May 2024", href: "/documents/newsletter1.8.pdf" },
    { label: "Newsletter 1.9", description: "April 2024", href: "/documents/newsletter1.9.pdf" },
  ];

  const filteredNewsletters = newsletters.filter(
    (newsletter) =>
      newsletter.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      newsletter.description.includes(year)
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      {/* Background */}
      <div className="absolute w-full h-full">
        <Image
          src="/images/bg-img.jpg"
          alt="Background"
          className="z-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-40 z-0 blur-md"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-[90%] md:w-[70%] p-6 bg-white/90 shadow-2xl rounded-lg">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/gkcclogo.png"
            alt="GKCC Logo"
            className="w-[100px] h-[100px] mb-4"
            width={160}
            height={160}
          />
          <h1 className="text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 font-extrabold drop-shadow-md">
            Welcome to GKCC
          </h1>
        </div>

        {/* Updated Text */}
        <p className="text-gray-700 text-lg">
          Stay updated with the latest news, updates, and information from the Global Kokani Committees Council.
        </p>
        <p className="text-gray-700 text-lg mb-6">Explore the newsletters below.</p>

        {/* Search and Filter */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[60%] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
          />
          <div className="flex gap-4 sm:w-[35%]">
            <select className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>

        {/* Horizontal Scrollable Newsletters */}
        <div className="w-full flex overflow-x-auto gap-6 p-4 bg-white/90 shadow-inner rounded-lg">
          {filteredNewsletters.length > 0 ? (
            filteredNewsletters.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[300px] p-4 border-2 rounded-lg shadow-lg transition-transform duration-300 ${
                  item.isNew
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100"
                    : "border-gray-300 bg-white"
                } hover:scale-105 hover:shadow-2xl`}
              >
                {/* PDF Icon */}
                <div className="flex items-center justify-center text-red-600 text-[3rem] mb-3">
                  <FaFilePdf />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                {item.isNew && (
                  <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    New & Latest
                  </span>
                )}

                {/* Button */}
                <a
                  href={item.href}
                  download
                  className="mt-4 inline-block w-full text-center bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                  Download
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">No newsletters found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
