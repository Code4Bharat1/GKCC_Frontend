"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../layouts/footer/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "../ManagementCard/Card";
import { SiMainwp } from "react-icons/si";

const SingleBrand = ({ sponsor }) => {
  if (!sponsor) {
    return null; // Fallback UI if sponsor is undefined
  }

  const { logo, name } = sponsor;

  // Ensure logo is defined and a string
  if (!logo || typeof logo !== "string") {
    return null; // Fallback UI if logo is missing or invalid
  }

  const isPng = logo.toLowerCase().endsWith(".png");

  const containerClasses = `relative aspect-square w-44 h-44 lg:w-48 lg:h-48 opacity-100 transition ${
    isPng ? "bg-white" : "bg-transparent"
  } flex items-center justify-center rounded-lg`;

  return (
    <div className={containerClasses}>
      <Image src={logo} alt={`${name} Logo`} fill className="object-contain" />
    </div>
  );
};

const Home = () => {
  const [sponsors, setSponsors] = useState([]);
  const [shuffledSponsors, setShuffledSponsors] = useState([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [errorSponsors, setErrorSponsors] = useState("");

  // Popup State Variables
  const [popupData, setPopupData] = useState(null);
  const [loadingPopup, setLoadingPopup] = useState(true);
  const [errorPopup, setErrorPopup] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Sponsors from the backend API
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("https://api.gkcc.world/api/sponsor/viewsponsors");
        console.log("Fetched sponsors:", response.data); // Debugging

        const sponsorArray = response.data.message || [];
        if (Array.isArray(sponsorArray)) {
          setSponsors(sponsorArray);
          setShuffledSponsors([...sponsorArray, ...sponsorArray]); // Duplicate for seamless scrolling
        } else {
          setErrorSponsors("Invalid data format received");
        }
        setLoadingSponsors(false);
      } catch (err) {
        console.error(err);
        setErrorSponsors("Failed to load sponsors");
        setLoadingSponsors(false);
      }
    };

    fetchSponsors();
  }, []);

  // Fetch Popup Data from the backend API
  useEffect(() => {
    const fetchPopup = async () => {
      try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/sponsor/viewpopup`);

        if (response.data.success && response.data.data) {
          setPopupData(response.data.data);
          setIsModalOpen(true);
        } else {
          setErrorPopup("No popup data available");
        }
        setLoadingPopup(false);
      } catch (error) {
        console.error("Error fetching popup data:", error);
        setErrorPopup("Failed to load popup data");
        setLoadingPopup(false);
      }
    };

    fetchPopup();
  }, []);

  // Shuffle sponsors periodically for dynamic effect
  useEffect(() => {
    if (sponsors.length === 0) return; // Exit if no sponsors

    const shuffleInterval = setInterval(() => {
      setShuffledSponsors((prev) => {
        const half = Math.floor(prev.length / 2);
        const firstHalf = prev.slice(0, half);
        const shuffled = [...firstHalf].sort(() => Math.random() - 0.5);
        return [...shuffled, ...shuffled];
      });
    }, 20000); // Shuffle every 20 seconds

    return () => clearInterval(shuffleInterval);
  }, [sponsors]);

  // Manage body overflow when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sample Media Data
  const mediaData = [
    { id: 1, image: "/images/bahrain.jpg", alt: "Media 1" },
    { id: 2, image: "/images/jubail.jpg", alt: "Media 2" },
    { id: 3, image: "/images/makkah.jpg", alt: "Media 3" },
    { id: 4, image: "/images/jubail.jpg", alt: "Media 4" },
    { id: 5, image: "/images/bahrain.jpg", alt: "Media 5" },
    // Add more media items as needed
  ];

  const [shuffledBrands, setShuffledBrands] = useState([]); // Duplicate for seamless scrolling

  // Sample Vendors Data
  const vendors = [
    {
      id: 1,
      name: "Dell",
      logo: "/images/dell.png",
      contactNo: "+91 12345 67890",
      city: "City A",
      country: "Country A",
      category: "electronics",
      rating: 4,
      discount: 10,
    },
    {
      id: 2,
      name: "Jaxon",
      logo: "/images/jaxon.png",
      contactNo: "+91 98765 43210",
      city: "City B",
      country: "Country B",
      category: "clothing",
      rating: 3,
      discount: 15,
    },
    {
      id: 3,
      name: "Acer",
      logo: "/images/acer.png",
      contactNo: "+91 11223 44556",
      city: "City C",
      country: "Country C",
      category: "food_beverage",
      rating: 5,
      discount: 5,
    },
    // Add more vendors as needed
  ];

  return (
    <div className="w-screen h-screen">
      {/* Modal */}
      {isModalOpen && popupData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsor-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal} // Close modal when clicking outside the content
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            <Image
              src={popupData.logo} // Dynamic image from API
              alt="Sponsor"
              className="w-full h-auto"
              width={800} // Adjust as needed
              height={600} // Adjust as needed
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition"
              aria-label="Close Sponsor Modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Loading and Error States for Popup */}
      {loadingPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white"> </div>
        </div>
      )}
      {errorPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-red-500">{errorPopup}</div>
        </div>
      )}

      {/* Home Section */}
      <div className="w-full mt-20 h-[90vh] flex items-center justify-center flex-col relative">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/bg-img.jpg"
              alt="Background"
              className="z-0 w-full h-full"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-0"></div>
        </div>
        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-full text-center flex items-center justify-center flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 pt-10 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 relative z-10">
          <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.5vw] text-white font-bold leading-none uppercase">
            Welcome to <br /> Global Kokani Committees Council (GKCC)
          </h1>
          <p className="text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-blue-500 font-medium capitalize">
            We serve better -- together
          </p>
        </div>
      </div>

      {/* Sponsors Slider Section */}
      <section className="pt-12 overflow-hidden mt-12">
        <div className="container mx-auto px-4 mb-16">
          {/* Heading Section */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-5xl font-semibold text-black">
              Our <span className="text-blue-500">Sponsors</span>
            </h2>
          </div>

          {/* Handling Loading and Error States */}
          {loadingSponsors ? (
            <div className="text-center text-blue-500 py-8">Loading sponsors...</div>
          ) : errorSponsors ? (
            <div className="text-center text-red-500 py-8">{errorSponsors}</div>
          ) : (
            <div className="relative overflow-hidden">
              {/* Moving Sponsors Section */}
              <motion.div
                className="flex gap-8"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
              >
                {shuffledSponsors.map((sponsor, index) => (
                  <SingleBrand key={`${sponsor._id || sponsor.id}-${index}`} sponsor={sponsor} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <h2 className="text-2xl mt-2 md:mt-16 text-center md:text-5xl font-semibold text-black">
        About <span className="text-blue-500">Global Kokani Committees&apos; Council</span>
      </h2>
      <div className="w-full h-[80%] p-5 md:p-10 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-0 mt-24 md:mt-0">
        <div className="w-full md:w-1/2 h-full text-center md:text-left p-5 md:p-0 md:flex md:flex-col md:items-center md:justify-center">
          <div className="w-full">
            <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] text-[#1A8FE3] font-medium">
              Our Vision
            </h1>
          </div>
          <div className="w-full mt-5">
            <span className="w-full text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-[#878787] font-medium">
              Our vision is to foster unity, development, and empowerment for
              every Kokani member. We strive to: Build a global network that
              connects regional and international Kokani committees.
            </span>
          </div>
          <div className="w-full mt-5 flex justify-center md:justify-start">
            <Link href="/aboutus">
              <button className="relative inline-block px-6 py-2.5 text-white font-medium text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] leading-tight rounded-md shadow-inner hover:text-black transition-all duration-300 ease-out overflow-hidden custom-btn">
                Read More
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full mt-8 md:w-1/2 h-full p-5 flex justify-center items-center">
          <Image
            src="/images/vision.jpg"
            alt="Our Vision"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-auto object-cover"
            width={600}
            height={600}
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full h-[60%] p-5 md:p-10 flex flex-col md:flex-row items-center justify-center gap-5 mt-32 md:mt-0">
        <div className="w-full md:w-1/2 h-full p-5 flex justify-center items-center">
          <Image
            src="/images/mission.jpg"
            alt="Our Mission"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-auto object-cover"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 h-full text-center md:text-right p-5 md:p-0 flex flex-col items-center justify-center md:items-end">
          <div className="w-full">
            <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] text-[#1A8FE3] font-medium">
              Our Mission
            </h1>
          </div>
          <div className="w-full mt-5">
            <span className="w-full text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-[#878787] font-medium">
              At GKCC, our mission is to provide a cohesive platform where
              Kokani communities worldwide can unite and make a meaningful
              impact.
            </span>
          </div>
          <div className="w-full mt-5 flex justify-center md:justify-end">
            <Link href="/aboutus">
              <button className="relative inline-block px-6 py-2.5 text-white font-medium text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] leading-tight rounded-md shadow-inner hover:text-black transition-all duration-300 ease-out overflow-hidden custom-btn">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full h-[70%] p-5 md:p-10 flex flex-col md:flex-row-reverse items-center justify-center gap-5 md:gap-0 mt-36 md:mt-0">
        <div className="w-full md:w-1/2 h-full p-5 flex justify-center items-center">
          <Image
            src="/images/ourstory.jpg"
            alt="Our Story"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-auto object-cover"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 h-full text-center md:text-left p-5 md:p-0 md:flex md:flex-col md:items-center md:justify-center">
          <div className="w-full">
            <h1 className="text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] text-[#1A8FE3] font-medium">
              Our Story
            </h1>
            <h3 className="text-[5vw] sm:text-[4vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw] text-[#353535] font-medium capitalize">
              Who we are
            </h3>
          </div>
          <div className="w-full mt-5">
            <span className="w-full text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-[#878787] font-medium">
              Welcome to the Global Kokani Committees Council (GKCC), a
              federation committed to empowering the Kokani community worldwide.
            </span>
          </div>
          <div className="w-full mt-5 flex justify-center md:justify-start">
            <Link href="/aboutus">
              <button className="relative inline-block px-6 py-2.5 text-white font-medium text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] leading-tight rounded-md shadow-inner hover:text-black transition-all duration-300 ease-out overflow-hidden custom-btn">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Management Section */}
      <section className="w-full py-20 bg-white">
        <h2 className="text-2xl mt-20 text-center md:text-5xl font-semibold text-black">
          Global Kokani Committees&apos; Council <span className="text-blue-500">Management</span>
        </h2>
        <div className="w-full h-full flex flex-wrap justify-center gap-5 md:gap-10 pt-5 px-5 mt-10">
          <Card
            imageSrc="/images/salim.jpg" // Provide actual image paths
            name="Salim Ansari"
            title="@salim_ansari"
            description="Leader in community engagement and welfare initiatives."
            tooltipTitle="Office Bearers"
            Icon={SiMainwp}
          />
          <Card
            imageSrc="/images/huda.jpg" // Provide actual image paths
            name="Huda Begum"
            title="@huda_begum"
            description="Expert in organizational management and outreach."
            tooltipTitle="Office Bearers"
            Icon={SiMainwp}
          />
          <Card
            imageSrc="/images/faizan.jpg" // Provide actual image paths
            name="Faizan Khan"
            title="@faizan_khan"
            description="Advocate for youth development and empowerment."
            tooltipTitle="Office Bearers"
            Icon={SiMainwp}
          />
        </div>
        <div className="w-full flex justify-center md:justify-center mt-16">
          <Link href="/managements/office-bearers">
            <button className="relative inline-block px-6 py-2.5 text-white font-medium text-base sm:text-lg md:text-sm lg:text-base xl:text-lg leading-tight rounded-md shadow-inner bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-out overflow-hidden">
              View More
            </button>
          </Link>
        </div>
      </section>

      {/* Association Section */}
      <div className="w-full h-auto md:h-[60vh] mt-4 md:-mt-4">
        <div className="w-full mt-5 text-center">
          <h1 className="text-black font-bold text-[8vw] sm:text-[6vw] md:text-[3vw] w-full mb-5">
            Our <span className="text-blue-500">Member Associations</span>
          </h1>
        </div>
        <div className="w-full h-auto md:h-[80%] p-5 md:p-10 mt-5">
          <div className="w-full h-full">
            <h1 className="text-[#353535] font-bold text-[6vw] sm:text-[4vw] md:text-[2vw] text-center md:text-left">
              Kingdom of Saudi Arabia
            </h1>
            <div className="cursor-pointer w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
              {[
                {
                  src: "/asociation/jeddah.png",
                  alt: "Jeddah",
                  name: "JEDDAH",
                },
                {
                  src: "/asociation/makkah.png",
                  alt: "Makkah",
                  name: "MAKKAH",
                },
                { src: "/images/damam.jpg", alt: "Dammam", name: "DAMMAM" },
                { src: "/images/khamis.jpg", alt: "Khamis", name: "KHAMIS" },
                {
                  src: "/asociation/jubail.png",
                  alt: "Jubail",
                  name: "JUBAIL",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full h-60 relative overflow-hidden group"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover md:transition-transform md:duration-300 md:ease-in-out md:group-hover:scale-110"
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg uppercase">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cursor-pointer w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center md:justify-start mt-5">
              {[
                {
                  src: "/asociation/qatar.png",
                  alt: "Qatar",
                  name: "QATAR",
                },
                {
                  src: "/asociation/uae.png",
                  alt: "UAE",
                  name: "UAE",
                },
                {
                  src: "/asociation/oman.png",
                  alt: "Oman",
                  name: "OMAN",
                },
                {
                  src: "/asociation/bahrain.png",
                  alt: "Bahrain",
                  name: "BAHRAIN",
                },
                {
                  src: "/asociation/kuwait.png",
                  alt: "Kuwait",
                  name: "KUWAIT",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full h-60 relative overflow-hidden group"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover md:transition-transform md:duration-300 md:ease-in-out md:group-hover:scale-110"
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg uppercase">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Section */}
      <section className="w-full mt-2 md:mt-80 py-20 bg-white">
        {/* Section Title */}
        <h2 className="text-2xl text-center md:text-5xl font-semibold text-black">
          Our <span className="text-blue-500">Vendors</span>
        </h2>

        {/* Vendors Grid */}
        <div className="flex-grow md:ml-80 mt-12 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
            {vendors && vendors.length > 0 ? (
              vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-[#1A8FE3] rounded-3xl p-4 text-white shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
                >
                  {/* Vendor Logo */}
                  <Image
                    src={vendor.logo}
                    alt={`${vendor.name} Logo`}
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover rounded-3xl mb-2"
                  />

                  {/* Vendor Name */}
                  <h2 className="text-2xl font-bold mb-2 text-center">{vendor.name}</h2>

                  {/* Vendor Details */}
                  <p className="text-md text-center break-words">
                    Category: {vendor.category.replace("_", " ")}
                  </p>
                  <p className="text-md text-center">Rating: {vendor.rating} Stars</p>
                  <p className="text-md text-center">Discount: {vendor.discount}%</p>
                  <p className="text-md text-center">City: {vendor.city}</p>
                  <p className="text-md text-center">Country: {vendor.country}</p>
                  <p className="text-md text-center">Contact: {vendor.contactNo}</p>

                  {/* View More Button */}
                  <Link href={`/vendors/${vendor.id}`}>
                    <button className="mt-4 px-4 py-2 bg-white text-gray-500 rounded-lg hover:bg-gray-200 transition">
                      View More
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No vendors available at the moment.
              </p>
            )}
          </div>
        </div>

        {/* View All Vendors Button */}
        <div className="w-full flex justify-center mt-16">
          <Link href="/vendors">
            <button className="relative inline-block px-6 py-2.5 text-white font-medium text-base sm:text-lg md:text-sm lg:text-base xl:text-lg leading-tight rounded-md shadow-inner bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-out overflow-hidden">
              View More
            </button>
          </Link>
        </div>
      </section>

      {/* Media Section */}
      <section className="w-full sm:-mt-12 py-20 bg-white">
        {/* Section Title */}
        <h2 className="text-2xl text-center md:text-5xl font-semibold text-blue-500">
          Media
        </h2>

        {/* Media Slider */}
        <div className="container mx-auto px-4 mt-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {/* Slides */}
            {mediaData.map((media) => (
              <SwiperSlide key={media.id}>
                <div className="flex justify-center items-center">
                  <Image
                    src={media.image}
                    alt={media.alt}
                    className="object-cover rounded-lg"
                    width={500}
                    height={300}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <div className="w-full flex justify-center mt-2">
        <Link href="/media">
          <button className="relative inline-block px-6 py-2.5 text-white font-medium text-base sm:text-lg md:text-sm lg:text-base xl:text-lg leading-tight rounded-md shadow-inner bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-out overflow-hidden">
            View More
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-[5%]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
