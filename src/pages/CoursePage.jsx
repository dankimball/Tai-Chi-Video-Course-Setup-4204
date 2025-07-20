import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCourse } from '../context/CourseProvider';
import CourseHeader from '../components/CourseHeader';
import UserForm from '../components/UserForm';
import ModuleCard from '../components/ModuleCard';
import ToastContainer from '../components/ToastContainer';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiCheck } = FiIcons;

const CoursePage = () => {
  const { 
    course, 
    user, 
    courseStarted, 
    startCourse, 
    completedModules 
  } = useCourse();
  
  const [showUserForm, setShowUserForm] = useState(false);

  const handleStartCourse = () => {
    if (!user.name || !user.email) {
      setShowUserForm(true);
      return;
    }
    startCourse();
  };

  const handleUserFormComplete = () => {
    setShowUserForm(false);
    startCourse();
  };

  return (
    <div className="min-h-screen">
      <CourseHeader course={course} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!courseStarted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Begin?
              </h2>
              <p className="text-gray-600 mb-6">
                {course.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCourse}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <SafeIcon icon={FiPlay} className="mr-2" />
                Start Course
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Course Progress
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiCheck} className="mr-1 text-green-500" />
                  {completedModules.size} / {course.modules.length} modules
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(completedModules.size / course.modules.length) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <ModuleCard 
                  key={module.id}
                  module={module}
                  index={index}
                  isCompleted={completedModules.has(module.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {showUserForm && (
        <UserForm 
          onComplete={handleUserFormComplete}
          onClose={() => setShowUserForm(false)}
        />
      )}
      
      <ToastContainer />
    </div>
  );
};

export default CoursePage;