import React, { useContext } from 'react';
import { useSettings } from '../settings/SettingsContext'; // Import the settings context

const InsightOneIntro = () => {
  // Use the settings context to get the current theme
  const { settings } = useSettings();
  const isDarkMode = settings.theme === 'dark';
  
  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'} font-sans overflow-hidden`}>
      <div className="text-center relative w-full">
        <div className="opacity-0 transform translate-y-5" style={{animation: 'fadeInUp 1.5s ease forwards'}}>
          <div className="w-full max-w-6xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350">
              {/* Document with charts */}
              <g fill={isDarkMode ? "#ffffff" : "#1d5b74"} className="floating">
                {/* Document Background */}
                <rect id="document-rect" x="60" y="30" width="170" height="200" rx="15" ry="15" fill="none" stroke={isDarkMode ? "#ffffff" : "#1d5b74"} strokeWidth="8"/>
                
                {/* Pie Chart */}
                <g id="pie-chart" transform="translate(120, 110)">
                  <path d="M0,0 L0,-30 A30,30 0 0,1 30,0 Z" fill={isDarkMode ? "#ffffff" : "#1d5b74"}/>
                  <path d="M0,0 L30,0 A30,30 0 0,1 -18.5,24 Z" fill={isDarkMode ? "#e1e1e1" : "#2e8baa"}/>
                  <path d="M0,0 L-18.5,24 A30,30 0 0,1 -28.5,-9 Z" fill={isDarkMode ? "#cccccc" : "#5aafcf"}/>
                  <path d="M0,0 L-28.5,-9 A30,30 0 0,1 0,-30 Z" fill={isDarkMode ? "#b3b3b3" : "#89c7de"}/>
                  <circle cx="0" cy="0" r="30" fill="none" stroke={isDarkMode ? "#ffffff" : "#1d5b74"} strokeWidth="3"/>
                </g>
                
                {/* Bar Charts */}
                <g id="bar-charts">
                  <rect x="170" y="125" width="8" height="30" rx="2" ry="2" fill={isDarkMode ? "#ffffff" : "#1d5b74"}/>
                  <rect x="185" y="115" width="8" height="40" rx="2" ry="2" fill={isDarkMode ? "#e1e1e1" : "#2e8baa"}/>
                  <rect x="200" y="135" width="8" height="20" rx="2" ry="2" fill={isDarkMode ? "#cccccc" : "#5aafcf"}/>
                </g>
                
                {/* Document Lines */}
                <g id="document-lines">
                  <rect x="90" y="170" width="110" height="8" rx="4" ry="4" fill={isDarkMode ? "#ffffff" : "#1d5b74"}/>
                  <rect x="90" y="190" width="110" height="8" rx="4" ry="4" fill={isDarkMode ? "#ffffff" : "#1d5b74"}/>
                  <rect x="90" y="210" width="80" height="8" rx="4" ry="4" fill={isDarkMode ? "#ffffff" : "#1d5b74"}/>
                </g>
                
                {/* Checkmark Circle */}
                <circle id="checkmark-circle" cx="60" cy="210" r="40" fill={isDarkMode ? "#ffffff" : "#1d5b74"} className="pulse"/>
                <path id="checkmark" d="M40,210 L55,225 L80,195" fill="none" stroke={isDarkMode ? "#000000" : "white"} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
                              {/* <text x="400" y="40" id="tagline-text1" fontFamily="Montserrat" fontWeight="500" fontSize="50" fill={isDarkMode ? "#ffffff" : "#1d5b74"}>welcome in</text> */}

              {/* Text "InsightOne" */}
              <text id="logo-text" x="300" y="150" fontFamily="Montserrat" fontSize="80" fontWeight="700">InsightOne</text>
              
              {/* Tagline */}
              <text id="tagline-text" x="300" y="200" fontFamily="Montserrat" fontSize="24" letterSpacing="1" fill={isDarkMode ? "#ffffff" : "#555"}>EMPOWERING FINANCE WITH ADVANCED AI</text>
              
              {/* Powered by ID&A TECH */}
              <g id="powered-by" opacity="0" style={{animation: 'fadeInUp 1s ease forwards 4s'}}>
                <text x="300" y="250" fontFamily="Montserrat" fontSize="16" fill={isDarkMode ? "#ffffff" : "#888"}>POWERED BY</text>
                <g className="tech-logo" transform="translate(420, 235)">
                  <rect x="0" y="0" width="120" height="30" rx="15" fill="none" stroke={isDarkMode ? "#ffffff" : "#1d5b74"} strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" style={{animation: 'drawBorder 1.5s ease-out forwards 4.2s'}}/>
                  
                  {/* I - From Left */}
                  <text x="15" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#1d5b74"} opacity="0" style={{animation: 'slideFromLeft 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 4.5s'}}>I</text>
                  
                  {/* D - From Right */}
                  <text x="20" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#1d5b74"} opacity="0" style={{animation: 'slideFromRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 4.6s'}}>D</text>
                  
                  {/* & - From Top */}
                  <text x="33" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#2e8baa"} opacity="0" style={{animation: 'slideFromTop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 4.7s'}}>&</text>
                  
                  {/* A - From Bottom */}
                  <text x="45" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#1d5b74"} opacity="0" style={{animation: 'slideFromBottom 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 4.8s'}}>A</text>
                  
                  {/* TECH - Each letter from different directions */}
                  <text x="60" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#5aafcf"} opacity="0" style={{animation: 'slideFromLeft 0.5s ease forwards 5s'}}>T</text>
                  <text x="70" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#5aafcf"} opacity="0" style={{animation: 'slideFromRight 0.5s ease forwards 5.1s'}}>E</text>
                  <text x="80" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#5aafcf"} opacity="0" style={{animation: 'slideFromTop 0.5s ease forwards 5.2s'}}>C</text>
                  <text x="90" y="20" fontFamily="Montserrat" fontSize="14" fontWeight="bold" fill={isDarkMode ? "#ffffff" : "#5aafcf"} opacity="0" style={{animation: 'slideFromBottom 0.5s ease forwards 5.3s'}}>H</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="h-1 w-0 bg-gradient-to-r from-transparent via-blue-800 to-transparent mx-auto mt-8 opacity-70" style={{animation: 'expandLine 1.2s ease forwards 2s'}}></div>
        <div className={`opacity-0 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'} text-3xl mt-8 font-light tracking-wide transform translate-y-5`} style={{animation: 'fadeInUp 1.5s ease forwards 2.5s'}}>
          Solutions intelligentes pour la finance de demain
        </div>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandLine {
          to {
            width: 250px;
          }
        }
        
        /* Document Animation */
        #document-rect {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInSlideUp 0.8s ease forwards 0.2s;
        }
        
        @keyframes fadeInSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Pie Chart Animation */
        #pie-chart path, #pie-chart circle {
          opacity: 0;
          transform: scale(0.8);
        }
        
        #pie-chart path:nth-child(1) {
          animation: fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.4s;
        }
        
        #pie-chart path:nth-child(2) {
          animation: fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.5s;
        }

        #pie-chart path:nth-child(3) {
          animation: fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.6s;
        }

        #pie-chart path:nth-child(4) {
          animation: fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.7s;
        }
        
        #pie-chart circle {
          animation: fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.8s;
        }
        
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Bar Charts Animation */
        #bar-charts rect {
          opacity: 0;
          transform: scaleY(0);
          transform-origin: bottom;
        }
        
        #bar-charts rect:nth-child(1) {
          animation: growBar 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards 0.7s;
        }
        
        #bar-charts rect:nth-child(2) {
          animation: growBar 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards 0.8s;
        }
        
        #bar-charts rect:nth-child(3) {
          animation: growBar 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards 0.9s;
        }
        
        @keyframes growBar {
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        /* Document Lines Animation */
        #document-lines rect {
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
        }
        
        #document-lines rect:nth-child(1) {
          animation: growLine 0.6s ease-out forwards 1.1s;
        }
        
        #document-lines rect:nth-child(2) {
          animation: growLine 0.6s ease-out forwards 1.2s;
        }
        
        #document-lines rect:nth-child(3) {
          animation: growLine 0.6s ease-out forwards 1.3s;
        }
        
        @keyframes growLine {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        /* Checkmark Animation */
        #checkmark-circle {
          opacity: 0;
          transform: scale(0);
          animation: popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards 1.4s;
        }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            opacity: 1;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        #checkmark {
          opacity: 0;
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: drawCheck 0.8s ease-out forwards 1.8s;
        }
        
        @keyframes drawCheck {
          to {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
        
        /* Logo Text Animation */
        #logo-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 80px;
          font-weight: 700;
          fill: transparent;
          stroke: ${isDarkMode ? '#ffffff' : '#1d5b74'};
          stroke-width: 2;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawText 2s ease-in-out forwards 1.5s, 
                     fillText 0.5s ease forwards 3.5s;
        }
        
        @keyframes drawText {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fillText {
          to {
            fill: ${isDarkMode ? '#ffffff' : '#1d5b74'};
            stroke-width: 0;
          }
        }
         #tagline-text1 {
          opacity: 0;
          animation: fadeInSlideUp 1s ease forwards 1s;
        }
        /* Tagline Animation */
        #tagline-text {
          opacity: 0;
          animation: fadeInSlideUp 1s ease forwards 3s;
        }
        
        /* ID&A TECH Animations */
        @keyframes drawBorder {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        /* Directional Slide Animations */
        @keyframes slideFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideFromRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideFromTop {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideFromBottom {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Hover Effect */
        .tech-logo:hover text {
          animation: gentlePulse 0.8s ease infinite alternate;
        }
        
        @keyframes gentlePulse {
          to {
            transform: translateY(-3px);
            opacity: 0.9;
          }
        }
        
        /* Floating Effect */
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        /* Pulse Effect */
        .pulse {
          animation: pulse 4s ease infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default InsightOneIntro;