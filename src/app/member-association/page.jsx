// src/app/member-association/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AssociationCard from "@/components/AssociationCard/AssociationCard";
import Navbar from "@/components/layouts/navbar/Navbar";
import Footer from "@/components/layouts/footer/Footer";
import Image from "next/image";

const Advertisement = ({ title, imageSrc, altText, width, height }) => (
  <div className="bg-gray-200 rounded-lg p-4 shadow-md">
    <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
    <Image
      src={imageSrc}
      alt={altText}
      width={width}
      height={height}
      className="object-cover rounded-lg w-full h-auto"
    />
  </div>
);

const MemberAssociation = () => {
  const [associations, setAssociations] = useState([]); // State to store associations
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAssociations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/association/getAll`
        );
        console.log(response);
        
        if (
          response.data &&
          response.data.success &&
          response.data.statusCode === 200
        ) {
          setAssociations(response.data.message);
          setError(null);
        } else {
          setError("Failed to fetch associations.");
        }
      } catch (err) {
        console.error("Error fetching associations:", err);
        setError("An error occurred while fetching associations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-8 px-4 sm:px-6 md:px-8 xl:px-16 py-8">
        <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
          Member Associations
        </h1>

        {/* Handle Loading, Error, or Display Associations */}
        {isLoading ? (
          <p className="text-center text-blue-500">Loading associations...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : associations.length === 0 ? (
          <p className="text-center text-gray-500">No associations found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Top Advertisement - Visible on Small Screens Only */}
            <div className="block lg:hidden w-full">
              <Advertisement
                title="Sponsored Ad"
                imageSrc="/path-to-top-ad-image.jpg" // Replace with your ad image path
                altText="Top Advertisement"
                width={600}
                height={150}
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-start gap-4">
              {/* Left Advertisement - Visible on Large Screens Only */}
              <div className="hidden lg:block lg:w-1/6">
                <Advertisement
                  title="Sponsored Ad"
                  imageSrc="/path-to-left-ad-image.jpg" // Replace with your ad image path
                  altText="Left Advertisement"
                  width={300}
                  height={250}
                />
              </div>

              {/* Associations Grid */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {associations.map((association) => (
                    <AssociationCard
                      key={association._id}
                      association={association}
                    />
                  ))}
                </div>
              </div>

              {/* Right Advertisement - Visible on Large Screens Only */}
              <div className="hidden lg:block lg:w-1/6">
                <Advertisement
                  title="Sponsored Ad"
                  imageSrc="/path-to-right-ad-image.jpg" // Replace with your ad image path
                  altText="Right Advertisement"
                  width={300}
                  height={250}
                />
              </div>
            </div>

            {/* Bottom Advertisement - Visible on Small Screens Only */}
            <div className="block lg:hidden w-full">
              <Advertisement
                title="Sponsored Ad"
                imageSrc="/path-to-bottom-ad-image.jpg" // Replace with your ad image path
                altText="Bottom Advertisement"
                width={600}
                height={150}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MemberAssociation;
