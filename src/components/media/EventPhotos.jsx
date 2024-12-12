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
        <img src={imageUrl} alt="Full View" className="max-w-full max-h-[80vh] rounded-md" />
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
  const [albums, setAlbums] = useState([]); // List of albums
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Album currently being viewed
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for slider
  const [selectedImage, setSelectedImage] = useState(null); // Selected image for full view modal

  // Fetch albums from backend API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          'https://api.gkcc.world/api/photomedia/viewphotosofmediapage'
        );
        if (response.data.success) {
          setAlbums(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // Automatic slider movement for the album
  useEffect(() => {
    if (selectedAlbum && selectedAlbum.photosdetails.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % selectedAlbum.photosdetails.length
        );
      }, 5000); // 5 seconds gap

      return () => clearInterval(interval);
    }
  }, [selectedAlbum]);

  return (
    <div className="w-full mt-32 md:mt-28 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500">Pictures Gallery</h1>
        <p className="text-xl sm:text-2xl text-black mt-4">
          Explore our collection of memorable albums and moments
        </p>
      </div>

      {/* Modal for full view */}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Display Albums */}
      {!selectedAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {albums.map((album, index) => {
            // Get the latest image URL
            const latestImage =
              album.photosdetails.length > 0
                ? album.photosdetails[album.photosdetails.length - 1].url
                : null;

            return (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() => setSelectedAlbum(album)}
              >
                {/* Album Thumbnail */}
                {latestImage ? (
                  <img
                    src={latestImage}
                    alt={`${album.nameofalbum} thumbnail`}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                    No Images
                  </div>
                )}
                <div className="p-4 bg-blue-500 text-center">
                  <h2 className="text-lg font-semibold text-white">{album.nameofalbum}</h2>
                  <p className="text-sm text-white">{album.photosdetails.length} Images</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Display Selected Album */}
      {selectedAlbum && (
        <div className="w-full">
          <button
            onClick={() => setSelectedAlbum(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
          >
            Back to Albums
          </button>

          {/* Album Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-500">{selectedAlbum.nameofalbum}</h2>
          </div>

          {/* Slider */}
          {selectedAlbum.photosdetails.length > 0 ? (
            <div className="flex justify-center items-center mb-8">
              <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] h-[300px] sm:h-[400px] relative">
                <AwesomeSlider
                  className="rounded-lg"
                  bullets={true}
                  infinite={true}
                  selected={currentIndex}
                >
                  {selectedAlbum.photosdetails.map((image, index) => (
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
          ) : (
            <p className="text-center text-gray-500">No images in this album</p>
          )}

          {/* Album Grid */}
          <div className=" md:mt-32 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
            {selectedAlbum.photosdetails.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
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
      )}
    </div>
  );
};

export default EventPhotos;
