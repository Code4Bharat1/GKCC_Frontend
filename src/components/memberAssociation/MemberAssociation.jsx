"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

// Static association data
const staticAssociations = [
  {
    _id: "1",
    associationName: "Emirates Kokan Committee",
    description:
      "Focusing on environmental sustainability and awareness.",
    image: "/images/uae2.jpg",
    country: "UAE",
    associationContactNumber: "+1 123-456-7890",
    associationEmail: "info@greenearth.com",
    websiteLink: "https://www.greenearth.com",
    president: {
      name: "John Green",
      mobileNumber: "+1 987-654-3210",
      email: "john.green@greenearth.com",
    },
    yearEstablished: "2001",
    numberOfMembers: "350",
    activities: "Tree plantation drives, waste management workshops.",
  },
  {
    _id: "2",
    associationName: "Oman Kokan Welfare Association",
    description:
      "Empowering youth through education and skill development.",
    image: "/images/oman2.jpg",
    country: "Oman",
    associationContactNumber: "+44 20 7946 0958",
    associationEmail: "contact@youthempowerment.com",
    websiteLink: "https://www.youthempowerment.com",
    president: {
      name: "Emily Watson",
      mobileNumber: "+44 7840 098123",
      email: "emily.watson@youthempowerment.com",
    },
    yearEstablished: "2010",
    numberOfMembers: "120",
    activities: "Leadership training, mentorship programs.",
  },
  {
    _id: "3",
    associationName: "Kokan Committee Bahrain",
    description:
      "Preserving and promoting cultural heritage and diversity.",
    image: "/images/bahrain.jpg",
    country: "Bahrain",
    associationContactNumber: "+91 98765 43210",
    associationEmail: "info@culturalharmony.org",
    websiteLink: "https://www.culturalharmony.org",
    president: {
      name: "Rajesh Sharma",
      mobileNumber: "+91 87654 32109",
      email: "rajesh.sharma@culturalharmony.org",
    },
    yearEstablished: "1995",
    numberOfMembers: "200",
    activities: "Cultural festivals, heritage walks.",
  },
  {
    _id: "4",
    associationName: "Kokan Welfare Society",
    description:
      "Supporting technological advancements and startups.",
    image: "/images/kuwait.jpg",
    country: "Kuwait",
    associationContactNumber: "+49 89 1234 5678",
    associationEmail: "info@techinnovators.com",
    websiteLink: "https://www.techinnovators.com",
    president: {
      name: "Lisa Meier",
      mobileNumber: "+49 170 9876543",
      email: "lisa.meier@techinnovators.com",
    },
    yearEstablished: "2015",
    numberOfMembers: "500",
    activities: "Hackathons, tech meetups.",
  },
  {
    _id: "5",
    associationName: "Relief Foundation Qatar",
    description:
      "Promoting healthy lifestyles and wellness programs.",
    image: "/images/qatar2.png",
    country: "Qatar",
    associationContactNumber: "+1 416-555-0199",
    associationEmail: "info@healthyliving.ca",
    websiteLink: "https://www.healthyliving.ca",
    president: {
      name: "Sophia Lee",
      mobileNumber: "+1 647-555-0199",
      email: "sophia.lee@healthyliving.ca",
    },
    yearEstablished: "2000",
    numberOfMembers: "300",
    activities: "Health camps, fitness challenges.",
  },
  {
    _id: "6",
    associationName: "Kokan Committee Khobar-Dammam",
    description:
      "Advocating for world peace and conflict resolution.",
    image: "/images/damman.jpg",
    country: "Dammam, Saudi Arabia",
    associationContactNumber: "+46 8 1234 5678",
    associationEmail: "info@globalpeace.org",
    websiteLink: "https://www.globalpeace.org",
    president: {
      name: "Karl Johansson",
      mobileNumber: "+46 70 987 6543",
      email: "karl.johansson@globalpeace.org",
    },
    yearEstablished: "1990",
    numberOfMembers: "600",
    activities: "Peace talks, awareness campaigns.",
  },
  {
    _id: "7",
    associationName: "Kokan Committee Jubail",
    description:
      "Protecting marine life and ecosystems.",
    image: "/images/jubail.jpg",
    country: "Jubail, Saudi Arabia",
    associationContactNumber: "+61 2 9876 5432",
    associationEmail: "info@oceanconservation.com",
    websiteLink: "https://www.oceanconservation.com",
    president: {
      name: "James Smith",
      mobileNumber: "+61 400 123 456",
      email: "james.smith@oceanconservation.com",
    },
    yearEstablished: "1985",
    numberOfMembers: "150",
    activities: "Beach cleanups, marine conservation projects.",
  },
  {
    _id: "8",
    associationName: "Kokan Committee Jeddah (KCJed)",
    description:
      "Making cities greener and more sustainable.",
    image: "/images/jedaah2.jpg",
    country: "Jeddah, Saudi Arabia",
    associationContactNumber: "+31 20 1234 5678",
    associationEmail: "contact@greenurban.nl",
    websiteLink: "https://www.greenurban.nl",
    president: {
      name: "Anna van Dijk",
      mobileNumber: "+31 6 1234 5678",
      email: "anna.vandijk@greenurban.nl",
    },
    yearEstablished: "2018",
    numberOfMembers: "100",
    activities: "Urban gardening, renewable energy projects.",
  },
  {
    _id: "9",
    associationName: "Kokan Committee Makkah",
    description:
      "Protecting and rescuing endangered wildlife.",
    image: "/images/makkah.jpg",
    country: "Makkah, Saudi Arabia",
    associationContactNumber: "+27 21 555 1234",
    associationEmail: "info@wildliferescue.org",
    websiteLink: "https://www.wildliferescue.org",
    president: {
      name: "Nkosi Dlamini",
      mobileNumber: "+27 71 555 4321",
      email: "nkosi.dlamini@wildliferescue.org",
    },
    yearEstablished: "1975",
    numberOfMembers: "250",
    activities: "Wildlife rehabilitation, anti-poaching efforts.",
  },
  {
    _id: "10",
    associationName: "Kokan Committee Khamis Mushait",
    description:
      "Nurturing art and creativity in communities.",
    image: "/images/khamis.jpg",
    country: "Khamis-Mushait, Saudi Arabia",
    associationContactNumber: "+33 1 23 45 67 89",
    associationEmail: "info@artandsoul.fr",
    websiteLink: "https://www.artandsoul.fr",
    president: {
      name: "Marie Dubois",
      mobileNumber: "+33 6 12 34 56 78",
      email: "marie.dubois@artandsoul.fr",
    },
    yearEstablished: "1980",
    numberOfMembers: "400",
    activities: "Art exhibitions, creative workshops.",
  },
];

const AssociationCard = ({ association, onClick }) => {
  const { associationName, image, country } = association;

  return (
    <div className="flex flex-col w-[80%] ml-8 md:ml-12 bg-white shadow-md rounded-lg overflow-hidden ">
      <div className="relative w-full h-48">
        {image ? (
          <Image
            src={image}
            alt={`${associationName} Image`}
            layout="fill"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-gray-800">{associationName}</h2>
        <p className="text-sm text-gray-500">
          <strong>Country:</strong> {country}
        </p>
      </div>
      <button
        onClick={onClick}
        className="mt-auto w-full bg-blue-500 text-white py-2 text-center text-sm font-medium hover:bg-blue-600 transition"
      >
        View More
      </button>
    </div>
  );
};

// Modal Component
const Modal = ({ association, onClose }) => {
  const {
    associationName,
    image,
    country,
    yearEstablished,
    numberOfMembers,
    activities,
    associationContactNumber,
    associationEmail,
    president,
  } = association;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <div className="flex flex-col items-center gap-4">
          {image && (
            <Image
              src={image}
              alt={`${associationName} Image`}
              width={200}
              height={200}
              className="object-cover rounded-lg"
            />
          )}
          <h1 className="text-2xl font-bold text-blue-500">{associationName}</h1>
          <p className="text-gray-700">
            <strong>Country:</strong> {country}
          </p>
          <p className="text-gray-700">
            <strong>Year Established:</strong> {yearEstablished}
          </p>
          <p className="text-gray-700">
            <strong>Members:</strong> {numberOfMembers}
          </p>
          <p className="text-gray-700">
            <strong>Activities:</strong> {activities}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {associationContactNumber}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${associationEmail}`}
              className="text-blue-500 hover:underline"
            >
              {associationEmail}
            </a>
          </p>
          <p className="text-gray-700">
            <strong>President:</strong> {president.name}
          </p>
          <p className="text-gray-700">
            <strong>President Contact:</strong> {president.mobileNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main MemberAssociation Component
const MemberAssociation = () => {
  const [selectedAssociation, setSelectedAssociation] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow mt-12 px-4 py-8">
        <h1 className="text-blue-500 mt-12 text-2xl md:text-5xl font-bold text-center mb-8">
          Member Associations
        </h1>
        <div className="grid grid-cols-1 w-[90%] ml-4 md:ml-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {staticAssociations.map((association) => (
            <AssociationCard
              key={association._id}
              association={association}
              onClick={() => setSelectedAssociation(association)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedAssociation && (
        <Modal
          association={selectedAssociation}
          onClose={() => setSelectedAssociation(null)}
        />
      )}
    </div>
  );
};

export default MemberAssociation;