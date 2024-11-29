"use client"
import React, { useEffect, useState } from "react";
import { MdOutlineCastForEducation } from "react-icons/md";
import {
  FaHandHoldingHeart,
  FaSeedling,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaClipboardList,
  FaProjectDiagram,
  FaUserTie,
  FaChartLine,
  FaRegHandshake,
} from "react-icons/fa";
import AboutUs from "../Cards/AboutUs";
import Vision from "../aboutDets/Vision";
import Mission from "../aboutDets/Mission";
import Footer from "../layouts/footer/Footer";

const Aboutus = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect window size only on the client
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial value
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cards = [
    {
      title: "TRUST",
      description:
        "Building and maintaining strong relationships with all stakeholders.",
      conciseDescription: "Strong relationships",
      icon: FaShieldAlt,
    },
    {
      title: "TEAMWORK",
      description: "Working together and inspiring each other to succeed.",
      conciseDescription: "Working together",
      icon: FaUsers,
    },
    {
      title: "INNOVATION",
      description:
        "Encouraging innovative thinking and new ideas for the best results.",
      conciseDescription: "Innovative thinking",
      icon: FaLightbulb,
    },
    {
      title: "QUALITY",
      description: "Meeting or exceeding our commitments to stakeholders.",
      conciseDescription: "Exceeding commitments",
      icon: MdOutlineCastForEducation,
    },
    {
      title: "INTEGRITY",
      description:
        "Transparency, honesty, and consistency in our interactions.",
      conciseDescription: "Honesty & consistency",
      icon: FaHandHoldingHeart,
    },
    {
      title: "COMMITMENT",
      description:
        "Working diligently and devoting resources to accomplish responsibilities.",
      conciseDescription: "Diligent work",
      icon: FaSeedling,
    },
  ];

  const strategies = [
    {
      title: "Committees",
      description:
        "Build a network of existing organizations in the Gulf and foster unity for future development.",
      conciseDescription: "Gulf unity network",
      icon: FaClipboardList,
    },
    {
      title: "Community",
      description:
        "Assess strengths and weaknesses actively, seeking opportunities to transform weaknesses into strengths.",
      conciseDescription: "Strengths to opportunities",
      icon: FaProjectDiagram,
    },
    {
      title: "Members",
      description:
        "Identify and leverage existing members within the Gulf region to harness their skills to serve effectively.",
      conciseDescription: "Leverage Gulf members",
      icon: FaUserTie,
    },
    {
      title: "Sustainability",
      description:
        "Develop finance policy with sustainability in mind by generating resources to achieve sustainability.",
      conciseDescription: "Sustainable finance",
      icon: FaChartLine,
    },
    {
      title: "Leadership",
      description:
        "Establish a core committee board and develop leadership for effective governance.",
      conciseDescription: "Effective governance",
      icon: FaRegHandshake,
    },
  ];

  return (
    <>
      <div className="w-screen h-screen">
        <div className="w-full h-[30%] flex items-center justify-center flex-col">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#353535]">
            Be The <span className="text-[#1A8FE3]">Change</span>
          </h1>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#9A9A9A] text-center">
            Uniting Communities, Empowering Futures.
          </span>
        </div>

        {/* Cards Section */}
        <div className="w-full h-[70%] flex flex-wrap justify-center lg:pl-[10vw] lg:pt-[5vh]  px-5 sm:px-0">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-[45%] sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] m-2 sm:px-5"
            >
              <AboutUs
                title={card.title}
                description={
                  isMobile ? card.conciseDescription : card.description
                }
                icon={card.icon}
              />
            </div>
          ))}
        </div>

        {/* Vision and Mission Sections */}
        <div className="mt-[15em] sm:mt-[10em] md:mt-[5em] lg:mt-[5em] xl:mt-[5em]">
          <Vision />
        </div>
        <div className="mt-[15em] sm:mt-[10em] md:mt-[5em] lg:mt-[5em] xl:mt-[5em]">
          <Mission />
        </div>

        {/* Strategies Section */}
        <div className="w-full h-[30%] flex items-center justify-center flex-col">
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#353535]">
            STRATEGIES / <span className="text-[#1A8FE3]">ACTION PLANS</span>
          </h1>
        </div>
        <div className="w-full h-[70%] flex flex-wrap justify-center lg:pl-[10vw] lg:pt-[5vh]  px-5 sm:px-0">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="w-[45%] sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] m-2"
            >
              <AboutUs
                title={strategy.title}
                description={
                  isMobile ? strategy.conciseDescription : strategy.description
                }
                icon={strategy.icon}
              />
            </div>
          ))}
        </div>
          <div className="mt-60">
        <Footer />

          </div>
      </div>
    </>
  );
};

export default Aboutus;
