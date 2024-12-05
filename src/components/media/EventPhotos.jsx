"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

// Modal Component to view the image in full screen
const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg">
        <img
          src={imageUrl}
          alt="Full View"
          className="max-w-full max-h-[80vh] rounded-md"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  );
};

const EventPhotos = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from backend API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/photomedia/viewphotosofmediapage`

        );
        if (response.data.success) {
          setImages(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Automatic slider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds gap

    return () => clearInterval(interval);
  }, [images.length]);

  return (
<<<<<<< HEAD
    <div className="w-full mt-32 md:mt-28 px-4">
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500">Image Gallery</h1>
        <p className="text-xl sm:text-2xl text-black mt-6">Explore our collection of memorable moments</p>
=======
    <div className="w-full md:mt-28">
      <div className="text-center mb-4">
        <h1 className="text-6xl font-bold text-blue-500">Image Gallery</h1>
        <p className="text-2xl text-black mt-6">
          Explore our collection of memorable moments
        </p>
>>>>>>> 09faca5326893f8f297c1859c7fe599a1182a195
      </div>

      {/* Modal for full view */}
      {selectedImage && (
        <Modal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Image Slider */}
      <div className="flex justify-center items-center mb-8">
        <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[60%] h-[300px] sm:h-[400px] relative">
          <AwesomeSlider
            className="rounded-lg"
            bullets={true}
            infinite={true}
            selected={currentIndex}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={image.url}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </AwesomeSlider>
        </div>
      </div>

      {/* Image Album Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 sm:gap-10 md:mt-52 p-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white md:w-[70%] md:ml-16 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => setSelectedImage(image.url)}
          >
            <img
              src={image.url}
              alt={`Image ${index}`}
              className="w-full h-40 sm:h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPhotos;
