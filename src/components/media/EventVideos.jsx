"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const EventVideos = () => {
  const [albums, setAlbums] = useState([]); // List of video albums
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Currently selected album
  const [selectedVideoId, setSelectedVideoId] = useState(null); // Currently selected video ID

  // Fetch video albums from backend API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `https://api.gkcc.world/api/videomedia/viewalbum`
        );
        if (response.data.success) {
          setAlbums(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching video albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // Helper function to extract YouTube Video ID if missing
  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="w-full mt-36 md:mt-36">
      <div className="text-center mb-4">
        <h1 className="text-6xl font-bold text-blue-500">Videos Gallery</h1>
        <p className="text-2xl text-black mt-6">Explore our memorable video albums</p>
      </div>

      {/* Display Video Albums */}
      {!selectedAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {albums.map((album, index) => {
            // Get the first video thumbnail from the album
            const firstVideoId =
              album.videosdetails.length > 0
                ? album.videosdetails[0].videoId || extractYouTubeVideoId(album.videosdetails[0].url)
                : null;

            return (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() => setSelectedAlbum(album)}
              >
                {/* Album Thumbnail */}
                {firstVideoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${firstVideoId}/0.jpg`}
                    alt={`${album.nameofalbum} thumbnail`}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                    No Videos
                  </div>
                )}
                <div className="p-4 bg-blue-500 text-center">
                  <h2 className="text-lg font-semibold text-white">{album.nameofalbum}</h2>
                  <p className="text-sm text-white">{album.videosdetails.length} Videos</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Display Videos in Selected Album */}
      {selectedAlbum && (
        <div className="w-full">
          <button
            onClick={() => {
              setSelectedAlbum(null);
              setSelectedVideoId(null);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
          >
            Back to Albums
          </button>

          {/* Album Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-500">{selectedAlbum.nameofalbum}</h2>
          </div>

          {/* Display Selected Video */}
          {selectedVideoId && (
            <div className="flex justify-center items-center mb-8">
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
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-4">
            {selectedAlbum.videosdetails.map((video, index) => {
              const videoId =
                video.videoId || extractYouTubeVideoId(video.url);
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
      )}
    </div>
  );
};

export default EventVideos;
