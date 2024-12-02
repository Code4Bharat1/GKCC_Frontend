"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layouts/navbar/Navbar";
import Footer from "@/components/layouts/footer/Footer";
import AssociationCard from "@/components/AssociationCard/AssociationCard";

// Static association data
const staticAssociations = [
  {
    _id: "1",
    associationName: "Association One",
    description:
      "This is a brief description of Association One. They focus on community development and engagement.",
    logo: "/images/association1.png",
    country: "Country A",
    associationContactNumber: "+91 12345 67890",
    associationEmail: "contact@associationone.com",
    websiteLink: "https://www.associationone.com",
    president: {
      name: "John Doe",
      mobileNumber: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      email: "johndoe@associationone.com",
      district: "District A",
      taluka: "Taluka A",
      village: "Village A",
    },
    secretary: {
      name: "Jane Smith",
      mobileNumber: "+91 11223 44556",
      whatsappNumber: "+91 11223 44556",
      email: "janesmith@associationone.com",
      district: "District A",
      taluka: "Taluka A",
      village: "Village A",
    },
    locationCity: "City A",
    yearEstablished: "2005",
    numberOfMembers: "150",
    associationActivities:
      "Community development, Educational initiatives, Environmental awareness.",
    activityDate: "2023-09-15",
    status: "Active",
    GKCCId: "GKCC-001",
  },
  {
    _id: "2",
    associationName: "Association Two",
    description:
      "This is a brief description of Association Two. They specialize in educational initiatives and youth empowerment.",
    logo: "/images/association2.png",
    country: "Country B",
    associationContactNumber: "+91 22334 55667",
    associationEmail: "info@associationtwo.com",
    websiteLink: "https://www.associationtwo.com",
    president: {
      name: "Alice Johnson",
      mobileNumber: "+91 99887 77665",
      whatsappNumber: "+91 99887 77665",
      email: "alicejohnson@associationtwo.com",
      district: "District B",
      taluka: "Taluka B",
      village: "Village B",
    },
    secretary: {
      name: "Bob Williams",
      mobileNumber: "+91 88776 55443",
      whatsappNumber: "+91 88776 55443",
      email: "bobwilliams@associationtwo.com",
      district: "District B",
      taluka: "Taluka B",
      village: "Village B",
    },
    locationCity: "City B",
    yearEstablished: "2010",
    numberOfMembers: "200",
    associationActivities: "Healthcare initiatives, Youth empowerment, Cultural events.",
    activityDate: "2023-10-20",
    status: "Active",
    GKCCId: "GKCC-002",
  },
];

const MemberAssociation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract association ID from the pathname if present
  const id = pathname.split("/")[2];

  // Find the association if the ID is present
  const association = id
    ? staticAssociations.find((assoc) => assoc._id === id)
    : null;

  // Render detailed view if association ID is found
  if (id && association) {
    const {
      associationName,
      country,
      associationContactNumber,
      associationEmail,
      websiteLink,
      logo,
      president,
      secretary,
      locationCity,
      yearEstablished,
      numberOfMembers,
      associationActivities,
      status,
      GKCCId,
    } = association;

    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => router.push("/member-association")}
              className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              &larr; Back to Associations
            </button>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <Image
                src={logo}
                alt={`${associationName} Logo`}
                width={200}
                height={200}
                className="w-48 h-48 object-cover rounded-full"
              />
              <div className="mt-4 md:mt-0 md:ml-8 w-full">
                <h1 className="text-3xl font-bold text-[#1A8FE3] mb-4">
                  {associationName}
                </h1>
                <p className="text-gray-700">Country: {country}</p>
                <p className="text-gray-700">City: {locationCity}</p>
                <p className="text-gray-700">Year Established: {yearEstablished}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
              Contact Information
            </h2>
            <p className="text-gray-700">
              Phone: {associationContactNumber}
            </p>
            <p className="text-gray-700">
              Email:{" "}
              <a href={`mailto:${associationEmail}`} className="text-[#1A8FE3]">
                {associationEmail}
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render the main association grid view
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">
          Member Associations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {staticAssociations.map((association) => (
            <AssociationCard
              key={association._id}
              association={association}
              onClick={() => router.push(`/member-association/${association._id}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MemberAssociation;
