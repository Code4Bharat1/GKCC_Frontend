"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoNewspaperSharp } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from "axios";

const NewsLetter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch newsletters from the backend on component mount
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(
          " https://api.gkcc.world/api/newsletter/viewable"
        );
        const sortedNewsletters = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewsletters(sortedNewsletters);
        setFilteredNewsletters(sortedNewsletters);
        setSelectedNewsletter(sortedNewsletters[0] || null); // Select the latest
        setError(null);
      } catch (err) {
        console.error("Error fetching newsletters:", err);
        setError("Failed to load newsletters. Please try again later.");
      }
    };

    fetchNewsletters();
  }, []);

  const handleSelectNewsletter = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsSidebarOpen(false); // Close the sidebar after selecting a newsletter
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = newsletters.filter((newsletter) =>
      newsletter.title.toLowerCase().includes(query)
    );
    setFilteredNewsletters(filtered);
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden mt-8 flex justify-between items-center bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold flex items-center">
          <IoNewspaperSharp className="mr-2" /> Newsletters
        </h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute mt-32  md:mt-2 md:static z-10 md:z-auto top-0 left-0 min-h-screen w-3/4 md:w-1/5 bg-blue-500  text-white p-4 transform md:overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <h2 className="flex mt-6 mb-6 items-center justify-center text-2xl md:text-3xl font-bold text-center">
          <IoNewspaperSharp className="mr-2" /> Newsletters
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center bg-white rounded-lg p-2">
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 p-2 text-blue-500 outline-none rounded-lg"
          />
        </div>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            {filteredNewsletters.map((newsletter) => (
              <li
                key={newsletter._id}
                className={`cursor-pointer p-3 text-center text-md rounded bg-white text-blue-500 transition-transform duration-200 ${
                  selectedNewsletter?._id === newsletter._id
                    ? "bg-white text-lg text-blue-500 font-semibold scale-105"
                    : "hover:bg-blue-600 hover:text-white"
                }`}
                onClick={() => handleSelectNewsletter(newsletter)}
              >
                {newsletter.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 justify-center items-center p-6 bg-white md:overflow-y-auto">
        {selectedNewsletter ? (
          <div className="space-y-6">
            {/* Flex container for image and heading */}
            <div className="flex mt-8 items-center gap-4">
              {/* Image */}
              <div className="w-full h-full md:w-60 md:h-64">
                <Image
                  src="/images/gkcc.png"
                  alt="Newsletter"
                  className="rounded-lg"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
              {/* Heading and Publish Date */}
              <div>
                {/* Title */}
                <p className="md:mt-2 text-end text-md md:text-xl text-black">
                  {selectedNewsletter.title}
                </p>
                {/* Date */}
                <p className="md:mt-2 text-end text-md md:text-xl text-black">
                  {formatDate(selectedNewsletter.date)}
                </p>
                <h1 className="text-2xl md:text-5xl md:mt-2 font-semibold">
                  Global Kokani Committees&apos; Council
                </h1>
                <h2 className="mt-8 -ml-12 md:-ml-0 md:mt-16 text-2xl md:text-5xl border-b-4 border-black font-syne font-bold text-center">
                  Newsletter
                </h2>
              </div>
            </div>

            {/* Heading from selected newsletter */}
            <h1 className="text-2xl mt-4 md:text-4xl text-center font-bold text-blue-500 pb-4">
              {selectedNewsletter.heading}
            </h1>

            {/* Dynamic Sections */}
            {selectedNewsletter.section?.map((section, index) => {
              const { photo, text } = section;

              // Center Image Only
              if (photo && !text) {
                return (
                  <div key={index} className="flex justify-center my-6">
                    <Image
                      src={photo}
                      alt={`Section ${index + 1}`}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                );
              }

              // Center Text Only
              if (text && !photo) {
                return (
                  <div key={index} className="text-center my-6">
                    <p className="text-gray-700 text-lg">{text}</p>
                  </div>
                );
              }

              // Text and Image Side by Side
              if (photo && text) {
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-6 my-6"
                  >
                    <p className="w-full md:w-1/2 text-gray-700 text-lg">
                      {text}
                    </p>
                    <div className="w-full md:w-1/2">
                      <Image
                        src={photo}
                        alt={`Section ${index + 1}`}
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Select a newsletter from the sidebar.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;




