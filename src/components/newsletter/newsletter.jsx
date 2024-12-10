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
          "https://api.gkcc.world/api/newsletter/view"
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
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
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
        className={`absolute mt-8 md:mt-0 md:static z-10 md:z-auto top-0 left-0 min-h-screen w-3/4 md:w-1/4 bg-blue-500  text-white p-4 transform ${
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
      <div className="flex-1 justify-center items-center p-6 bg-white overflow-y-auto ">
        {selectedNewsletter ? (
          <div className="space-y-6">
            {/* Flex container for image and heading */}
            <div className="flex items-center border-b border-black gap-4 ">
              {/* Image */}
              <div className="w-full h-full md:w-56 md:h-56">
                <Image
                  src="/images/gkcc.png"
                  alt="hi"
                  className="rounded-lg"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
              {/* Heading and Publish Date */}
              <div>
                <h1 className="text-2xl md:text-5xl md:-mt-8 font-semibold">
                  Global Kokani Committees' Council
                </h1>
                {/* Publish Date */}
                <p className=" md:mt-4 text-md md:text-2xl text-gray-500">
                  Publish Date: <br /> {formatDate(selectedNewsletter.date)}
                </p>
              </div>
            </div>

            {/* Heading from selected newsletter */}
            <h1 className="text-2xl mt-4 md:text-4xl text-center font-bold text-blue-500 pb-4">
              {selectedNewsletter.heading}
            </h1>

            {/* Paragraph 1 and Image 1 */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-6">
              <p className="w-full md:w-3/4 text-gray-700 text-lg text-center">
                {selectedNewsletter.firstpara}
              </p>
              <div className="w-full md:w-1/2">
                <Image
                  src={selectedNewsletter.firstimage}
                  alt={`${selectedNewsletter.title} Image 1`}
                  className="rounded-lg shadow-lg"
                  width={400}
                  height={300}
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Paragraph 2 and Image 2 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2">
                <Image
                  src={selectedNewsletter.secondimage}
                  alt={`${selectedNewsletter.title} Image 2`}
                  className="rounded-lg shadow-lg"
                  width={400}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <p className="w-full md:w-3/4 text-gray-700 text-lg text-center">
                {selectedNewsletter.secondpara}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            Select a newsletter from the left.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
