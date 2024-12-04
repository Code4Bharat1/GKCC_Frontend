"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AwesomeSlider from "react-awesome-slider"; // Importing react-awesome-slider
import "react-awesome-slider/dist/styles.css"; // Import the default styles

const Imageslider = () => {
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null); // Reference for slider to control autoplay and manual navigation

  // Fetch images from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/photomedia/viewphotosofmediapage")
      .then((response) => {
        if (response.data.success) {
          setImages(response.data.message.slice(0, 5));
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []); // Empty array means this effect runs once when the component mounts

  // Settings for the slider
  const sliderSettings = {
    bullets: true,
    organicArrows: false,
    infinite: true,
    autoplay: true,
    duration: 3,
  };

  const handlePrev = () => {
    sliderRef.current.previous(); // Go to previous slide
  };

  const handleNext = () => {
    sliderRef.current.next(); // Go to next slide
  };

  return (
    <div className="w-full h-[500px] overflow-hidden relative">
      <AwesomeSlider {...sliderSettings} ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover" // Ensure images cover the full container and crop if necessary
            />
          </div>
        ))}
      </AwesomeSlider>

      {/* Custom navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Imageslider;
