import React from 'react';
import Image from 'next/image';

const Mission = () => {
  return (
    <div className="w-full h-[100%] flex items-center justify-center flex-col lg:flex-row">
      <div className="w-full lg:w-[50%] h-[100%] flex items-center justify-center">
        <div className="w-1/2 h-[60%] overflow-hidden">
          <Image
            src="/images/mission.jpg" // Update with the correct image path
            alt="Descriptive Alt Text"
            layout="responsive"
            width={100}
            height={100}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="w-full lg:w-[50%] h-[100%] flex flex-col items-center justify-center p-8 mt-4 sm:mt-0">
        <h1 className="text-4xl sm:text-3xl font-bold w-full text-[#1A8FE3] text-center sm:text-center md:text-left lg:text-left xl:text-left md:w-[80%]">
          Our Mission
        </h1>
        <div className="text-base sm:text-xl text-[#353535] w-full sm:w-4/5 mx-auto">
          <p>
            At GKCC, our mission is to provide a cohesive platform where Kokani communities worldwide can unite and make a meaningful impact. We focus on creating opportunities for growth and collaboration in three key areas:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li><strong>Unity:</strong> Strengthening the connections within the Kokani community and building bridges with other communities.</li>
            <li><strong>Economic Development:</strong> Supporting entrepreneurship, fostering economic growth, and offering resources like mentorship and partnerships.</li>
            <li><strong>Education & Skill Enhancement:</strong> Committed to education as the foundation for success, we provide programs for skill development, vocational training, and personal growth.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mission;