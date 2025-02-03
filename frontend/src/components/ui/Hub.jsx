import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './NavBar.jsx';
import BackgroundLines from './background-lines.jsx';

const Hub = () => {
  const handleLeftClick = () => {
    alert('Left section clicked');
  };

  const handleRightTopClick = () => {
    alert('Top-right section clicked');
  };

  const handleRightBottomClick = () => {
    alert('Bottom-right section clicked');
  };

  return (
    <body className='bg-black h-screen'>
      <div className=''>
    
    <BackgroundLines className="w-full flex flex-col bg-black font-inter overflow-hidden px-[5%]">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full h-1/2 flex flex-col justify-center items-center pl-0 p-4">
          <motion.h1
            className="font-bold text-4xl md:text-6xl font-inter text-center relative z-10 mb-4 mt-25 bg-clip-text text-white"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            Welcome to NeuroNote!
          </motion.h1>
          
          <motion.h1
            className="text-xl md:text-2xl font-inter text-white text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 }}
          >
            Your all in one place for note taking
          </motion.h1>
        </div>
</div>
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-center p-4 md:gap-6">
  {[
  { 
    title: 'Create Notes', 
    description: 'Transform your notes or create something new',
    image: '/src/assets/One.svg',
    onClick: handleLeftClick 
  },
  { 
    title: 'Collaborate', 
    description: 'Learn, create and develop together...',
    image: '/src/assets/Two.svg',
    onClick: handleRightTopClick 
  },
  { 
    title: 'My Notes', 
    description: 'Find all your saved notes here',
    image: '/src/assets/Three.svg',
    onClick: handleRightBottomClick 
  }
].map((section, index) => (
         <motion.button
          key={index}
          onClick={section.onClick}
          initial={{ y: 0, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
          whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="group w-full md:w-1/3 h-auto min-h-[150px] md:min-h-[250px] rounded-lg flex flex-row md:flex-col justify-between md:justify-center items-center shadow-lg relative overflow-hidden cursor-pointer mb-4 md:mb-0 p-6 md:p-8"
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-gray-300 opacity-20"
            whileHover={{ filter: "blur(2px)" }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Content Wrapper */}
          <div className="relative z-10 opacity-100 flex flex-row md:flex-col items-center w-full">
            {/* Text Content (Left on Mobile, Centered on Desktop) */}
            <div className="flex flex-col items-start md:items-center text-left md:text-center w-2/3 md:w-full">
              <motion.p
                className="text-xl md:text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
              >
                {section.title}
              </motion.p>
              <motion.p
                className="text-sm md:text-md text-white mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
              >
                {section.description}
              </motion.p>
            </div>

            {/* Image (Right on Mobile, Centered on Desktop) */}
            <motion.img
              src={section.image}
              alt={section.title}
              className="w-20 h-20 md:w-32 md:h-32 pointer-events-none ml-4 md:ml-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
            />
          </div>
        </motion.button>
      ))}


      </div>
    </BackgroundLines>
    </div>
    </body>
    
  );
};

export default Hub;