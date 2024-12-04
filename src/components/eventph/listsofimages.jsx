"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Modal to view the image in full screen
const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4">
        <img src={imageUrl} alt="Full View" className="max-w-full max-h-[80vh]" />
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

const ImageCards = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images from backend API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/photomedia/viewphotosofmediapage');
        if (response.data.success) {
          setImages(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Fetch images every 5 seconds to update dynamically
    fetchImages();
    const interval = setInterval(fetchImages, 5000);  // Poll every 5 seconds for new data

    return () => clearInterval(interval);  // Clear interval on cleanup
  }, []);

  return (
    <div className="w-full p-4">
      {/* Display the Modal if there's a selected image */}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}

      {/* Image Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={image.url}
              alt={`Image ${index}`}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => setSelectedImage(image.url)}  // Set the clicked image
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCards;
