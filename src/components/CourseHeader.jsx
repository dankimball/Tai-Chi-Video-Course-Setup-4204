import React from 'react';
import { motion } from 'framer-motion';

const CourseHeader = ({ course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {course.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            {course.description}
          </motion.p>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default CourseHeader;