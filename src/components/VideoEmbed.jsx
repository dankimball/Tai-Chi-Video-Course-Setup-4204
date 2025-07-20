import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiExternalLink } = FiIcons;

const VideoEmbed = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(url);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <p className="text-gray-600 mb-4">Video not available</p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <SafeIcon icon={FiExternalLink} className="mr-2" />
          Open Video Link
        </a>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
      {!isPlaying ? (
        <motion.div 
          className="relative cursor-pointer group"
          onClick={handlePlay}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <SafeIcon icon={FiPlay} className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black bg-opacity-75 rounded-lg p-3">
              <h4 className="text-white font-semibold">🌄 Tai Chi Practice Video</h4>
              <p className="text-gray-300 text-sm">Click to play embedded video</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Tai Chi Practice Video"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;