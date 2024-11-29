// src/components/AssociationCard/AssociationCard.jsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AssociationCard = ({ association }) => {
  const {
    _id,
    associationName,
    country,
    associationContactNumber,
    websiteLink,
    associationLogo,
  } = association;

  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white">
      {associationLogo ? (
        <Image
          src={associationLogo}
          alt={`${associationName} Logo`}
          width={400} // Adjust the width as needed
          height={200} // Adjust the height as needed
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Logo Available</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{associationName}</h2>
        <p className="text-gray-600">
          <strong>Country:</strong> {country}
        </p>
        <p className="text-gray-600">
          <strong>Contact:</strong> {associationContactNumber}
        </p>
        <div className="mt-4 flex justify-between items-center">
          {/* Correct Link Usage: No nested <a> tag */}
          <Link
            href={`/member-association/${_id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View More
          </Link>
          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssociationCard;
