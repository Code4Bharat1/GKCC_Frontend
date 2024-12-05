// src/components/EventVideos.jsx
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const EventVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch videos from backend API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/videomedia/viewvideosofmediapage`
          
        );
        if (response.data.success) {
          setVideos(response.data.message);
          if (response.data.message.length > 0) {
            setSelectedVideoId(response.data.message[0].videoId);
          }
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Automatic slider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // 5 seconds gap

    return () => clearInterval(interval);
  }, [videos.length]);

  // Helper function to extract YouTube Video ID if missing
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="w-full mt-32 md:mt-28">
      <div className="text-center mb-4">
        <h1 className="text-6xl font-bold text-blue-500">Video Gallery</h1>
        <p className="text-2xl text-black mt-6">Explore our collection of memorable moments</p>
      </div>

      {/* Video Player */}
      <div className="flex justify-center items-center mt-8">
        {selectedVideoId ? (
          <div className="w-[80%] h-[450px] md:h-[500px] lg:h-[600px]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500">Select a video to play</p>
        )}
      </div>

      {/* Video Album Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-4 mt-8">
        {videos.map((video, index) => {
          const videoId = video.videoId || extractYouTubeVideoId(video.url);
          if (!videoId) {
            console.warn(`Could not extract videoId for video at index ${index}`);
            return null;
          }

          return (
            <div
              key={index}
              className={`bg-gray-100 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer border-2 ${
                selectedVideoId === videoId ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setSelectedVideoId(videoId)}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt={`Video ${index}`}
                className="w-full h-48 object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventVideos;