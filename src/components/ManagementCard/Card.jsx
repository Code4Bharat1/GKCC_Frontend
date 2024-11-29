import React from "react";
import Image from "next/image";


const Card = ({ imageSrc, title, name, description, tooltipTitle , Icon }) => {
  return (
    <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[20%] h-auto sm:h-[55%] cursor-pointer bg-blue-500 p-2 text-white flex flex-col gap-5 rounded-3xl hover:bg-[#1A8FE3] hover:text-white transition-colors duration-300">
      <div className="w-full flex justify-end">
        <div
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center cursor-pointer"
          title={tooltipTitle} // Tooltip text passed as prop
        >
         {Icon && <Icon />}
        </div>
      </div>
      <div className="w-full flex items-center justify-center h-[40%]">
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-32 md:h-32 rounded-full bg-white overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
            width={176}
            height={176}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-sm sm:text-base md:text-lg">{name}</span>
        <p className="text-xs sm:text-sm md:text-base">{title}</p>
      </div>
      <div className="w-full text-center">
        <p className="text-xs sm:text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
