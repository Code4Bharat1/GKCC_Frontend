import React from "react";
import Image from "next/image";

const Vision = () => {
  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row items-center justify-center p-4 lg:p-8 gap-8">
      {/* Left Column: Vision and Core Values */}
      <div className="w-full lg:w-[50%] flex flex-col items-start justify-start p-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A8FE3] text-center lg:text-left">
          Our Vision
        </h1>
        <div className="text-base sm:text-sm text-[#353535] w-full lg:w-4/5 mx-auto mt-4 lg:mt-2">
          <p>
            Foster unity, development, and empowerment for every Kokani member.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Build a global network.</li>
            <li>Create strategic partnerships.</li>
            <li>Encourage personal and professional growth.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-[#1A8FE3] mt-6">
            Our Core Values
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Development:</strong> Prioritize community advancement.
            </li>
            <li>
              <strong>Teamwork:</strong> Achieve success through collaboration.
            </li>
            <li>
              <strong>Innovation:</strong> Embrace creative solutions.
            </li>
            <li>
              <strong>Excellence:</strong> Exceed expectations.
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Strategies and What We Do */}
      <div className="w-full lg:w-[50%] flex flex-col items-start justify-start p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A8FE3] mt-4 lg:mt-0 text-center lg:text-left">
          Our Strategies
        </h2>
        <div className="text-base sm:text-sm text-[#353535] w-full lg:w-4/5 mx-auto mt-4 lg:mt-2">
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Global Network:</strong> Connect local and global resources.
            </li>
            <li>
              <strong>Community Empowerment:</strong> Leverage community strengths.
            </li>
            <li>
              <strong>Leadership Development:</strong> Cultivate leadership skills.
            </li>
            <li>
              <strong>Sustainable Practices:</strong> Prioritize long-term sustainability.
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-[#1A8FE3] mt-6">
            What We Do
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Cultural Preservation:</strong> Celebrate Kokani heritage.
            </li>
            <li>
              <strong>Humanitarian Aid:</strong> Provide global assistance.
            </li>
            <li>
              <strong>Educational Support:</strong> Foster learning and development.
            </li>
            <li>
              <strong>Economic Empowerment:</strong> Support economic growth.
            </li>
          </ul>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[50%] h-[100%] flex items-center justify-center mt-6 lg:mt-0">
        <div className="w-3/4 sm:w-1/2 h-[60%] overflow-hidden">
          <Image
            src="/images/vision.jpg"
            alt="Descriptive Alt Text"
            layout="responsive"
            width={100}
            height={100}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Vision;
