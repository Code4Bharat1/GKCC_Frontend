"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch sponsors from the backend
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/sponsor/viewsponsors`);

        const sponsorArray = response.data.message || [];
        if (Array.isArray(sponsorArray)) {
          setSponsors(sponsorArray);
        } else {
          setError("Invalid data format received");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load sponsors");
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-500 py-8">Loading sponsors...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="mt-24 ">
        
    <div className="bg-white min-h-screen py-8 px-4">
      <h2 className="text-center text-6xl font-bold text-blue-500 mb-8">Our Sponsors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4 flex flex-col items-center justify-center"
          >
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="w-40 h-40 object-contain rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-500">{sponsor.name}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Sponsors;
