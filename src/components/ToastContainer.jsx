import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../context/CourseProvider';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiInfo, FiAlertTriangle, FiX } = FiIcons;

const ToastContainer = () => {
  const { toasts } = useCourse();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return FiCheck;
      case 'error': return FiAlertTriangle;
      case 'info': return FiInfo;
      default: return FiInfo;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`${getColors(toast.type)} px-6 py-4 rounded-xl shadow-lg max-w-sm flex items-center space-x-3`}
          >
            <SafeIcon icon={getIcon(toast.type)} className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;