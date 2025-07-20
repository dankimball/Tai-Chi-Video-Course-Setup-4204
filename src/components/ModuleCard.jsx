import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCourse } from '../context/CourseProvider';
import VideoEmbed from './VideoEmbed';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiCheck, FiChevronDown, FiChevronUp } = FiIcons;

const ModuleCard = ({ module, index, isCompleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { completeModule } = useCourse();

  const parseContent = (content) => {
    const parts = [];
    let currentIndex = 0;
    
    // Find video embeds
    const videoRegex = /<Video url="([^"]+)" \/>/g;
    let match;
    
    while ((match = videoRegex.exec(content)) !== null) {
      // Add text before video
      if (match.index > currentIndex) {
        const textContent = content.slice(currentIndex, match.index);
        if (textContent.trim()) {
          parts.push({ type: 'text', content: textContent });
        }
      }
      
      // Add video
      parts.push({ type: 'video', url: match[1] });
      currentIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (currentIndex < content.length) {
      const textContent = content.slice(currentIndex);
      if (textContent.trim()) {
        parts.push({ type: 'text', content: textContent });
      }
    }
    
    return parts;
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl font-bold text-gray-800 mb-4 mt-6 first:mt-0">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return (
        <p key={i} className="text-gray-600 mb-2">
          {line}
        </p>
      );
    });
  };

  const contentParts = parseContent(module.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {isCompleted ? (
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {module.title}
            </h3>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon 
              icon={isExpanded ? FiChevronUp : FiChevronDown} 
              className="w-5 h-5 text-gray-600" 
            />
          </button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {contentParts.map((part, i) => (
              <div key={i}>
                {part.type === 'text' && (
                  <div className="prose max-w-none">
                    {renderContent(part.content)}
                  </div>
                )}
                {part.type === 'video' && (
                  <VideoEmbed url={part.url} />
                )}
              </div>
            ))}
            
            {!isCompleted && (
              <div className="pt-4 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => completeModule(module.id)}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <SafeIcon icon={FiCheck} className="mr-2" />
                  Complete Module
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ModuleCard;