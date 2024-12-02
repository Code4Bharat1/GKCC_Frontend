"use client";
import React, { useState } from "react";
import Image from "next/image"; // Importing Image from Next.js
import Navbar from "../layouts/navbar/Navbar";
import Footer from "../layouts/footer/Footer";
import { FaSearch, FaTag, FaGlobe, FaCity, FaStar, FaPercentage, FaSort } from "react-icons/fa";
const categoryOptions = [
  { value: 'electronics', label: 'Electronics', logo: '/logos/electronics.png' },
  { value: 'clothing', label: 'Clothing', logo: '/logos/clothing.png' },
  { value: 'home_appliances', label: 'Home Appliances', logo: '/logos/home_appliances.png' },
  { value: 'automotive', label: 'Automotive', logo: '/logos/automotive.png' },
  { value: 'beauty_health', label: 'Beauty & Health', logo: '/logos/beauty_health.png' },
  { value: 'food_beverage', label: 'Food & Beverage', logo: '/logos/food_beverage.png' },
  { value: 'services', label: 'Services', logo: '/logos/services.png' },
  { value: 'technology', label: 'Technology', logo: '/logos/technology.png' },
  { value: 'construction_maintenance', label: 'Construction & Maintenance', logo: '/logos/construction_maintenance.png' },
  { value: 'healthcare', label: 'Healthcare', logo: '/logos/healthcare.png' },
  { value: 'transportation_logistics', label: 'Transportation & Logistics', logo: '/logos/transportation_logistics.png' },
  { value: 'manufacturing', label: 'Manufacturing', logo: '/logos/manufacturing.png' },
  { value: 'financial_services', label: 'Financial Services', logo: '/logos/financial_services.png' },
  { value: 'arts_entertainment', label: 'Arts & Entertainment', logo: '/logos/arts_entertainment.png' },
  { value: 'education', label: 'Education', logo: '/logos/education.png' },
  { value: 'travel_hospitality', label: 'Travel & Hospitality', logo: '/logos/travel_hospitality.png' },
  { value: 'real_estate', label: 'Real Estate', logo: '/logos/real_estate.png' },
  { value: 'marketing_advertising', label: 'Marketing & Advertising', logo: '/logos/marketing_advertising.png' },
  { value: 'energy_utilities', label: 'Energy & Utilities', logo: '/logos/energy_utilities.png' },
  { value: 'telecommunications', label: 'Telecommunications', logo: '/logos/telecommunications.png' },
  { value: 'sports_recreation', label: 'Sports & Recreation', logo: '/logos/sports_recreation.png' },
  { value: 'home_improvement', label: 'Home Improvement', logo: '/logos/home_improvement.png' },
  { value: 'pet_services', label: 'Pet Services', logo: '/logos/pet_services.png' },
  { value: 'security_services', label: 'Security Services', logo: '/logos/security_services.png' },
  { value: 'environmental_services', label: 'Environmental Services', logo: '/logos/environmental_services.png' },
  { value: 'fashion_apparel', label: 'Fashion & Apparel', logo: '/logos/fashion_apparel.png' },
  { value: 'wholesale_distributors', label: 'Wholesale Distributors', logo: '/logos/wholesale_distributors.png' },
  { value: 'office_supplies', label: 'Office Supplies', logo: '/logos/office_supplies.png' },
  { value: 'event_management', label: 'Event Management', logo: '/logos/event_management.png' },
  { value: 'cleaning_janitorial', label: 'Cleaning & Janitorial', logo: '/logos/cleaning_janitorial.png' },
  { value: 'printing_services', label: 'Printing Services', logo: '/logos/printing_services.png' },
  { value: 'nonprofit_organizations', label: 'Nonprofit Organizations', logo: '/logos/nonprofit_organizations.png' },
  { value: 'consulting_services', label: 'Consulting Services', logo: '/logos/consulting_services.png' },
];


const VendorProf = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [vendors, setVendors] = useState([
    { id: 1, name: "Dell", logo: "/images/dell.png", contactNo: "+91 12345 67890", city: "City A", country: "Country A", category: "electronics", rating: 4, discount: 10 },
    { id: 2, name: "Jaxon", logo: "/images/jaxon.png", contactNo: "+91 98765 43210", city: "City B", country: "Country B", category: "clothing", rating: 3, discount: 15 },
    { id: 3, name: "Acer", logo: "/images/acer.png", contactNo: "+91 11223 44556", city: "City C", country: "Country C", category: "food_beverage", rating: 5, discount: 5 },
    { id: 4, name: "Volkswagen", logo: "/images/volkswagen.png", contactNo: "+91 55667 88990", city: "City D", country: "Country A", category: "beauty_health", rating: 4, discount: 20 },
    { id: 5, name: "Polo", logo: "/images/polo.png", contactNo: "+91 10111 22233", city: "City E", country: "Country B", category: "automotive", rating: 2, discount: 12 },
    { id: 6, name: "JBL", logo: "/images/jbl.png", contactNo: "+91 44455 66677", city: "City F", country: "Country C", category: "technology", rating: 4, discount: 18 },
    { id: 7, name: "KFC", logo: "/images/kfc.png", contactNo: "+91 88899 00011", city: "City G", country: "Country A", category: "healthcare", rating: 3, discount: 8 },
    { id: 8, name: "Titan", logo: "/images/titan.png", contactNo: "+91 23456 78901", city: "City H", country: "Country B", category: "travel_hospitality", rating: 5, discount: 25 },
    { id: 9, name: "Boat", logo: "/images/boat.png", contactNo: "+91 65432 10987", city: "City I", country: "Country C", category: "education", rating: 4, discount: 30 },
    { id: 10, name: "Fish Woodmark", logo: "/images/fish woodmark.png", contactNo: "+91 87654 32109", city: "City J", country: "Country A", category: "construction_maintenance", rating: 2, discount: 22 },
    { id: 11, name: "Fevicol", logo: "/images/fevicol.png", contactNo: "+91 13579 24680", city: "City K", country: "Country B", category: "services", rating: 3, discount: 17 },
    { id: 12, name: "Sony", logo: "/images/sony.png", contactNo: "+91 24680 13579", city: "City L", country: "Country C", category: "manufacturing", rating: 4, discount: 14 },
    { id: 13, name: "SRK Motors", logo: "/images/spark.png", contactNo: "+91 98765 43210", city: "City M", country: "Country A", category: "nonprofit_organizations", rating: 5, discount: 9 },
    { id: 14, name: "Mercedes", logo: "/images/mercedes.png", contactNo: "+91 11223 44556", city: "City N", country: "Country B", category: "marketing_advertising", rating: 3, discount: 11 },
    { id: 15, name: "Disney", logo: "/images/disney.png", contactNo: "+91 55667 88990", city: "City O", country: "Country C", category: "wholesale_distributors", rating: 4, discount: 23 },
  ]);

  const handleSort = (criteria) => {
    const sortedVendors = [...vendors].sort((a, b) => {
      if (criteria === "rating") return b.rating - a.rating;
      if (criteria === "discount") return b.discount - a.discount;
      return 0;
    });
    setVendors(sortedVendors);
    setSortBy(criteria);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const categoryMatch = selectedCategory ? vendor.category === selectedCategory : true;
    const countryMatch = selectedCountry ? vendor.country === selectedCountry : true;
    const cityMatch = selectedCity ? vendor.city === selectedCity : true;
    const ratingMatch = selectedRating ? vendor.rating === parseInt(selectedRating) : true;
    const discountMatch = selectedDiscount ? vendor.discount <= parseInt(selectedDiscount) : true;
    const searchMatch = searchTerm ? vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return categoryMatch && countryMatch && cityMatch && ratingMatch && discountMatch && searchMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-[6%] px-4 sm:px-6 md:px-8 pt-8 xl:px-16">
        <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">OUR VENDORS</h1>

        {/* Filters and Sort Section */}
        <div className="w-full bg-[#1A8FE3] rounded-3xl flex flex-col gap-4 items-center p-4 mb-10 shadow-lg lg:flex-row lg:justify-between xl:px-16">
          <div className="flex flex-col md:flex-row items-center w-full lg:gap-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-2 bg-white text-gray-500 rounded-2xl"
            >
              Filters
              <span className="ml-2">{showFilters ? '▲' : '▼'}</span>
            </button>
            <button
              onClick={() => handleSort(sortBy === "rating" ? "discount" : "rating")}
              className="flex items-center px-6 py-2 bg-white text-gray-500 rounded-2xl mt-4 md:mt-0 md:ml-4"
            >
              <FaSort className="mr-2" />
              Sort by {sortBy === "rating" ? "Discount" : "Rating"}
            </button>
          </div>

          <div className="relative w-full md:w-96 lg:w-[400px] xl:w-[500px]">
            <input
              type="text"
              placeholder="Search Vendors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white text-black w-full"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white text-blue-500">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="w-full mt-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex items-center">
                <FaTag className="text-blue-500 mr-2" />
                <select
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-blue-500 focus:outline-none w-full"
                >
                  <option value="">All Categories</option>
                  {/* Replace with your actual category options */}
                  <option value="Category1">Category 1</option>
                  <option value="Category2">Category 2</option>
                  <option value="Category3">Category 3</option>
                </select>
              </div>

              {/* Country Filter */}
              <div className="flex items-center">
                <FaGlobe className="text-blue-500 mr-2" />
                <select
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-blue-500 focus:outline-none w-full"
                >
                  <option value="">All Countries</option>
                  <option value="Country A">Country A</option>
                  <option value="Country B">Country B</option>
                  <option value="Country C">Country C</option>
                </select>
              </div>

              {/* City Filter */}
              <div className="flex items-center">
                <FaCity className="text-blue-500 mr-2" />
                <select
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-blue-500 focus:outline-none w-full"
                >
                  <option value="">All Cities</option>
                  <option value="City A">City A</option>
                  <option value="City B">City B</option>
                  <option value="City C">City C</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="flex items-center">
                <FaStar className="text-blue-500 mr-2" />
                <select
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-blue-500 focus:outline-none w-full"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Discount Filter */}
              <div className="flex items-center">
                <FaPercentage className="text-blue-500 mr-2" />
                <select
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-blue-500 focus:outline-none w-full"
                >
                  <option value="">All Discounts</option>
                  <option value="5">Up to 5%</option>
                  <option value="10">Up to 10%</option>
                  <option value="15">Up to 15%</option>
                  <option value="20">Up to 20%</option>
                  <option value="25">Up to 25%</option>
                  <option value="30">Up to 30%</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Content with Responsive Advertisements */}
        <div className="flex flex-col gap-4 mb-16 mt-12">
         

          <div className="flex flex-col lg:flex-row justify-center items-start gap-4">
            

            {/* Vendor Cards Grid */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="bg-[#1A8FE3] rounded-3xl p-4 text-white shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
                  >
                    <Image
                      src={vendor.logo}
                      alt={vendor.name}
                      width={500} // Example width
                      height={400} // Example height
                      className="w-full h-64 object-cover rounded-3xl mb-2"
                    />
                    <h2 className="text-2xl font-bold mb-2 text-center">{vendor.name}</h2>
                    <p className="text-md text-center break-words">Category: {vendor.category.replace('_', ' ')}</p>
                    <p className="text-md text-center">Rating: {vendor.rating} Stars</p>
                    <p className="text-md text-center">Discount: {vendor.discount}%</p>
                    <p className="text-md text-center">City: {vendor.city}</p>
                    <p className="text-md text-center">Country: {vendor.country}</p>
                    <p className="text-md text-center">Contact: {vendor.contactNo}</p>
                    <button className="mt-4 px-4 py-2 bg-white text-gray-500 rounded-lg">
                      View More
                    </button>
                  </div>
                ))}
              </div>
            </div>

          
          </div>

         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorProf;
