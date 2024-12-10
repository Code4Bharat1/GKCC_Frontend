"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoNewspaperSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
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
          "http://localhost:5001/api/newsletter/view"
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
        className={`absolute mt-8 md:mt-0 md:static z-10 md:z-auto top-0 left-0 h-full w-3/4 md:w-1/4 bg-blue-500 text-white p-4 transform ${
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
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        {selectedNewsletter ? (
          <div className="space-y-6">
            {/* Heading */}
            <h1 className="text-2xl mt-8 md:text-4xl text-center font-bold text-blue-500 border-b pb-4">
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
