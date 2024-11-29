import React from "react";

const AboutUs = ({ title, description, icon: Icon, isActive, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`card ${isActive ? 'active' : ''} w-full sm:w-[45vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] h-[30vh] rounded-3xl cursor-pointer shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-4 bg-[#1A8FE3] text-white hover:bg-zinc-300 hover:text-black`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon className="card-icon mb-4 text-2xl sm:text-3xl md:text-4xl font-bold" />
      <h2 className="card-title text-center font-bold text-base sm:text-lg md:text-xl">{title}</h2>
      <p className="card-description text-center text-sm sm:text-base md:text-lg px-2 sm:px-4">{description}</p>
    </div>
  );
};

export default AboutUs;
