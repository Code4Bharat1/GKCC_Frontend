"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import React from "react";
import Link from "next/link";
import Footer from "../layouts/footer/Footer";
import Image from "next/image";
const Home = () => {
  return (
    <div className="w-screen h-screen">
      {/* Home Section */}
      <div className="w-full h-[90vh] flex items-center justify-center flex-col relative">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/bg-img.jpg"
              alt="Background"
              className="z-0 w-full h-full"
              width={1920} // You can set the image's intrinsic width
              height={1080} // and height here if needed
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
      {/* Vision Section */}
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
        <div className="w-full mt-816xmd:w-1/2 h-full p-5 flex justify-center items-center">
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

      {/* Association Section */}
      <div className="w-full h-auto md:h-[60vh] mt-32 md:mt-0">
        <div className="w-full mt-5 text-center">
          <h1 className="text-[#1A8FE3] font-bold text-[8vw] sm:text-[6vw] md:text-[3vw] w-full mb-5">
            Our Association
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
                  alt: "Image 2",
                  name: "JEDAAH",
                },
                {
                  src: "/asociation/makkah.png",
                  alt: "Image 7",
                  name: "MAKKAH",
                },
                { src: "/images/damam.jpg", alt: "Image 6", name: "DAMMAN" },
                { src: "/images/khamis.jpg", alt: "Image 9", name: "KHAMIS" },
                {
                  src: "/asociation/jubail.png",
                  alt: "Image 10",
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
                  alt: "Image 1",
                  name: "QATAR",
                },
                {
                  src: "/asociation/uae.png",
                  alt: "Image 3",
                  name: "UAE",
                },
                {
                  src: "/asociation/oman.png",
                  alt: "Image 4",
                  name: "OMAN",
                },
                {
                  src: "/asociation/bahrain.png",
                  alt: "Image 5",
                  name: "BAHRAIN",
                },
                {
                  src: "/asociation/kuwait.png",
                  alt: "Image 8",
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

      <div className="mt-[20%]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
