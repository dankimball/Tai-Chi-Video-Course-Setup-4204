import React, { createContext, useContext, useState, useEffect } from 'react';
import { courseData } from '../data/courseData';

const CourseContext = createContext();

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(courseData);
  const [user, setUser] = useState({ name: '', email: '' });
  const [completedModules, setCompletedModules] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [courseStarted, setCourseStarted] = useState(false);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const startCourse = () => {
    setCourseStarted(true);
    // Execute onStart actions
    course.onStart?.forEach(action => {
      if (action.action === 'showToast') {
        showToast(action.message);
      }
    });
  };

  const completeModule = (moduleId) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    
    // Find the module and execute onComplete actions
    const module = course.modules.find(m => m.id === moduleId);
    if (module?.onComplete) {
      module.onComplete.forEach(action => {
        if (action.action === 'showToast') {
          showToast(action.message);
        }
        // Add other action handlers as needed
      });
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    course,
    user,
    completedModules,
    toasts,
    courseStarted,
    showToast,
    startCourse,
    completeModule,
    updateUser
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;