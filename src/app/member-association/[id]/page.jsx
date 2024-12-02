// // src/app/member-association/[id]/page.jsx
// src/app/member-association/[id]/page.jsx

import React from "react";
import Image from "next/image";
import Navbar from "@/components/layouts/navbar/Navbar";
import Footer from "@/components/layouts/footer/Footer";
import Link from "next/link";

/**
 * Static data representing associations.
 * In a real-world scenario, this data might come from a CMS or a database.
 */
const staticAssociations = [
  {
    _id: "1",
    associationName: "Association One",
    country: "Country A",
    associationContactNumber: "+91 12345 67890",
    associationEmail: "contact@associationone.com",
    websiteLink: "https://www.associationone.com",
    associationLogo: "/images/association1.png",
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
    associationActivities: "Community development, Educational initiatives, Environmental awareness.",
    activityDate: "2023-09-15",
    status: "Active",
    GKCCId: "GKCC-001",
    // Add other fields as needed
  },
  {
    _id: "2",
    associationName: "Association Two",
    country: "Country B",
    associationContactNumber: "+91 22334 55667",
    associationEmail: "info@associationtwo.com",
    websiteLink: "https://www.associationtwo.com",
    associationLogo: "/images/association2.png",
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
    // Add other fields as needed
  },
  // Add more static associations as needed
];

/**
 * Server Component: Displays detailed information about a specific association.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @param {string} props.params.id - The ID of the association to display.
 */
const AssociationDetail = ({ params }) => {
  const { id } = params;

  // Find the association matching the ID from static data
  const association = staticAssociations.find((assoc) => assoc._id === id);

  // If association is not found, display an error message
  if (!association) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
          <p className="text-center text-red-500 text-lg">
            Association not found.
          </p>
          <div className="mt-4">
            <Link
              href="/member-association"
              className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              &larr; Back to Associations
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Destructure association details for easier access
  const {
    associationName,
    country,
    associationContactNumber,
    associationEmail,
    websiteLink,
    associationLogo,
    president,
    secretary,
    locationCity,
    yearEstablished,
    numberOfMembers,
    associationActivities,
    activityDate,
    status,
    GKCCId,
    // Add other fields as needed
  } = association;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/member-association"
            className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            &larr; Back to Associations
          </Link>
        </div>

        {/* Association Basic Info */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Association Logo */}
            <div className="flex-shrink-0">
              {associationLogo ? (
                <Image
                  src={associationLogo}
                  alt={`${associationName} Logo`}
                  width={200}
                  height={200}
                  className="w-48 h-48 object-cover rounded-full"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-center">
                  No Logo Available
                </div>
              )}
            </div>

            {/* Association Details */}
            <div className="mt-4 md:mt-0 md:ml-8 w-full">
              <h1 className="text-3xl font-bold text-[#1A8FE3] mb-4">
                {associationName}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Country:
                  </label>
                  <p className="text-gray-700">{country}</p>
                </div>
                {/* City */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    City:
                  </label>
                  <p className="text-gray-700">{locationCity}</p>
                </div>
                {/* Year Established */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Year Established:
                  </label>
                  <p className="text-gray-700">{yearEstablished}</p>
                </div>
                {/* Number of Members */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Number of Members:
                  </label>
                  <p className="text-gray-700">{numberOfMembers}</p>
                </div>
                {/* GKCC ID */}
                {GKCCId && (
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">
                      GKCC ID:
                    </label>
                    <p className="text-gray-700">{GKCCId}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
            Contact Information
          </h2>
          <div className="space-y-4">
            {/* Contact Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Contact Number:
                </label>
                <p className="text-gray-700">{associationContactNumber}</p>
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Email:
                </label>
                <p className="text-gray-700">
                  <a
                    href={`mailto:${associationEmail}`}
                    className="text-[#1A8FE3] hover:underline"
                  >
                    {associationEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Website */}
            {websiteLink && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Website:
                  </label>
                  <p className="text-gray-700">
                    <a
                      href={websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A8FE3] hover:underline"
                    >
                      {websiteLink}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* President Details */}
        {president && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
              President
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Name:
                  </label>
                  <p className="text-gray-700">{president.name}</p>
                </div>
                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Mobile Number:
                  </label>
                  <p className="text-gray-700">{president.mobileNumber}</p>
                </div>
                {/* WhatsApp Number */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    WhatsApp Number:
                  </label>
                  <p className="text-gray-700">{president.whatsappNumber}</p>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Email:
                  </label>
                  <p className="text-gray-700">
                    <a
                      href={`mailto:${president.email}`}
                      className="text-[#1A8FE3] hover:underline"
                    >
                      {president.email}
                    </a>
                  </p>
                </div>
                {/* District */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    District:
                  </label>
                  <p className="text-gray-700">{president.district}</p>
                </div>
                {/* Taluka */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Taluka:
                  </label>
                  <p className="text-gray-700">{president.taluka}</p>
                </div>
                {/* Village */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Village:
                  </label>
                  <p className="text-gray-700">{president.village}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secretary Details */}
        {secretary && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
              Secretary
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Name:
                  </label>
                  <p className="text-gray-700">{secretary.name}</p>
                </div>
                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Mobile Number:
                  </label>
                  <p className="text-gray-700">{secretary.mobileNumber}</p>
                </div>
                {/* WhatsApp Number */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    WhatsApp Number:
                  </label>
                  <p className="text-gray-700">{secretary.whatsappNumber}</p>
                </div>
                {/* District */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    District:
                  </label>
                  <p className="text-gray-700">{secretary.district}</p>
                </div>
                {/* Taluka */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Taluka:
                  </label>
                  <p className="text-gray-700">{secretary.taluka}</p>
                </div>
                {/* Village */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">
                    Village:
                  </label>
                  <p className="text-gray-700">{secretary.village}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activities */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
            Activities
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-1">
                Activities:
              </label>
              <p className="text-gray-700">{associationActivities}</p>
            </div>
            {/* You can add more activity-related fields here */}
          </div>
        </div>

        {/* Additional Details */}
        {/* Add more sections as needed based on the association's data */}
      </div>
      <Footer />
    </div>
  );
};

export default AssociationDetail;

// import React from "react";
// import axios from "axios";
// import Image from "next/image";
// import Navbar from "@/components/layouts/navbar/Navbar";
// import Footer from "@/components/layouts/footer/Footer";
// import Link from "next/link";

// /**
//  * Server Component: Fetches and displays detailed information about a specific association.
//  *
//  * @param {Object} props - Component props.
//  * @param {Object} props.params - Route parameters.
//  * @param {string} props.params.id - The ID of the association to fetch.
//  */
// const AssociationDetail = async ({ params }) => {
//   const { id } = params;

//   // Fetch association data server-sid
//   let association = null;
//   let error = null;

//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_API}/association/getOneAssociation/${id}`
//     );
//     if (
//       response.data &&
//       response.data.success &&
//       response.data.statusCode === 200
//     ) {
//       association = response.data.data;
//     } else {
//       error = "Failed to fetch association details.";
//     }
//   } catch (err) {
//     console.error("Error fetching association details:", err);
//     error = "An error occurred while fetching association details.";
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
//           <p className="text-center text-red-500 text-lg">{error}</p>
//           <div className="mt-4">
//             <Link
//               href="/member-association"
//               className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//             >
//               &larr; Back to Associations
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!association) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow">
//           <p className="text-center text-gray-500 text-lg">
//             No association data available.
//           </p>
//           <div className="mt-4">
//             <Link
//               href="/member-association"
//               className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//             >
//               &larr; Back to Associations
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const {
//     associationName,
//     country,
//     associationContactNumber,
//     associationEmail,
//     websiteLink,
//     associationLogo,
//     president,
//     secretary,
//     locationCity,
//     yearEstablished,
//     numberOfMembers,
//     associationActivities,
//     activityDate,
//     status,
//     GKCCId,
//     // Add other fields as needed
//   } = association;

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link
//             href="/member-association"
//             className="inline-flex items-center bg-[#1A8FE3] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//           >
//             &larr; Back to Associations
//           </Link>
//         </div>

//         {/* Association Basic Info */}
//         <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
//           <div className="flex flex-col md:flex-row items-center">
//             {/* Association Logo */}
//             <div className="flex-shrink-0">
//               {associationLogo ? (
//                 <Image
//                   src={associationLogo}
//                   alt={`${associationName} Logo`}
//                   width={200}
//                   height={200}
//                   className="w-48 h-48 object-cover rounded-full"
//                 />
//               ) : (
//                 <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-center">
//                   No Logo Available
//                 </div>
//               )}
//             </div>

//             {/* Association Details */}
//             <div className="mt-4 md:mt-0 md:ml-8 w-full">
//               <h1 className="text-3xl font-bold text-[#1A8FE3] mb-4">
//                 {associationName}
//               </h1>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Country */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Country:
//                   </label>
//                   <p className="text-gray-700">{country}</p>
//                 </div>
//                 {/* City */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     City:
//                   </label>
//                   <p className="text-gray-700">{locationCity}</p>
//                 </div>
//                 {/* Year Established */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Year Established:
//                   </label>
//                   <p className="text-gray-700">{yearEstablished}</p>
//                 </div>
//                 {/* Number of Members */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Number of Members:
//                   </label>
//                   <p className="text-gray-700">{numberOfMembers}</p>
//                 </div>
//                 {/* GKCC ID */}
//                 {GKCCId && (
//                   <div>
//                     <label className="block text-gray-600 font-semibold mb-1">
//                       GKCC ID:
//                     </label>
//                     <p className="text-gray-700">{GKCCId}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
//             Contact Information
//           </h2>
//           <form className="space-y-4">
//             {/* Contact Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-600 font-semibold mb-1">
//                   Contact Number:
//                 </label>
//                 <p className="text-gray-700">{associationContactNumber}</p>
//               </div>
//               {/* Email */}
//               <div>
//                 <label className="block text-gray-600 font-semibold mb-1">
//                   Email:
//                 </label>
//                 <p className="text-gray-700">
//                   <a
//                     href={`mailto:${associationEmail}`}
//                     className="text-[#1A8FE3] hover:underline"
//                   >
//                     {associationEmail}
//                   </a>
//                 </p>
//               </div>
//             </div>

//             {/* Website */}
//             {websiteLink && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Website:
//                   </label>
//                   <p className="text-gray-700">
//                     <a
//                       href={websiteLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#1A8FE3] hover:underline"
//                     >
//                       {websiteLink}
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* President Details */}
//         {president && (
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
//             <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
//               President
//             </h2>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Name:
//                   </label>
//                   <p className="text-gray-700">{president.name}</p>
//                 </div>
//                 {/* Mobile Number */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Mobile Number:
//                   </label>
//                   <p className="text-gray-700">{president.mobileNumber}</p>
//                 </div>
//                 {/* WhatsApp Number */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     WhatsApp Number:
//                   </label>
//                   <p className="text-gray-700">{president.whatsappNumber}</p>
//                 </div>
//                 {/* Email */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Email:
//                   </label>
//                   <p className="text-gray-700">
//                     <a
//                       href={`mailto:${president.email}`}
//                       className="text-[#1A8FE3] hover:underline"
//                     >
//                       {president.email}
//                     </a>
//                   </p>
//                 </div>
//                 {/* District */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     District:
//                   </label>
//                   <p className="text-gray-700">{president.district}</p>
//                 </div>
//                 {/* Taluka */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Taluka:
//                   </label>
//                   <p className="text-gray-700">{president.taluka}</p>
//                 </div>
//                 {/* Village */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Village:
//                   </label>
//                   <p className="text-gray-700">{president.village}</p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Secretary Details */}
//         {secretary && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//             <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
//               Secretary
//             </h2>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Name:
//                   </label>
//                   <p className="text-gray-700">{secretary.name}</p>
//                 </div>
//                 {/* Mobile Number */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Mobile Number:
//                   </label>
//                   <p className="text-gray-700">{secretary.mobileNumber}</p>
//                 </div>
//                 {/* WhatsApp Number */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     WhatsApp Number:
//                   </label>
//                   <p className="text-gray-700">{secretary.whatsappNumber}</p>
//                 </div>
//                 {/* District */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     District:
//                   </label>
//                   <p className="text-gray-700">{secretary.district}</p>
//                 </div>
//                 {/* Taluka */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Taluka:
//                   </label>
//                   <p className="text-gray-700">{secretary.taluka}</p>
//                 </div>
//                 {/* Village */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Village:
//                   </label>
//                   <p className="text-gray-700">{secretary.village}</p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Activities */}
//         <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-2xl font-semibold text-[#1A8FE3] mb-6">
//             Activities
//           </h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block text-gray-600 font-semibold mb-1">
//                 Activities:
//               </label>
//               <p className="text-gray-700">{associationActivities}</p>
//             </div>
//             {/* You can add more activity-related fields here */}
//           </form>
//         </div>

//         {/* Additional Details */}
//         {/* Add more sections as needed based on the API response */}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AssociationDetail;
