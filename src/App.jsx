import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CourseProvider from './context/CourseProvider';
import CoursePage from './pages/CoursePage';
import './App.css';

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Routes>
            <Route path="/" element={<CoursePage />} />
          </Routes>
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;