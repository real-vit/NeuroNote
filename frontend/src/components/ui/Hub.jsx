import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './NavBar.jsx';
import { useNavigate } from 'react-router-dom';

const Hub = () => {
    const navigate = useNavigate();

    const handleLeftClick = () => {
      navigate('/canvas');
    };

  const handleRightTopClick = () => {
    alert('Collab clicked');
  };

  const handleRightBottomClick = () => {
    alert('My notes clicked');
  };

  return (
    <>
    <Navbar/>
    <div className="h-screen w-full flex flex-col bg-black font-inter overflow-hidden px-[5%]">
   
      <div className="w-full h-full flex flex-col justify-between">

        <div className="w-full h-1/2 flex flex-col justify-center items-center pl-0 p-4">
        <motion.h1
  className="text-6xl font-bold font-inter text-white text-center relative z-10 mb-4 mt-25"
  initial={{ clipPath: 'inset(0 100% 0 0)' }}
  animate={{ clipPath: 'inset(0 0% 0 0)' }}
  transition={{ duration: 2, ease: "easeOut" }}
>
  Welcome to NeuroNote!
</motion.h1>


          
          <motion.h1
            className="text-2xl font-inter text-white text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 }}
          >
            Your all in one place for note taking
          </motion.h1>
        </div>

        <div className="w-full h-1/2 flex justify-between items-center p-4 space-x-4">
          <button
            onClick={handleLeftClick}
            className="group w-1/3 h-4/5 rounded-lg flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-105 bg-white relative overflow-hidden cursor-pointer"
          >
            <motion.p
              className="text-2xl font-bold text-black text-center relative z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration:3 }}
            >
              Create Notes
            </motion.p>
            <motion.p
  className="text-center text-sm text-black-500 mt-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 5}}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</motion.p>
            <motion.img
              src="/src/assets/One.svg"
              alt="One"
              className="w-24 h-24 mt-4 md:w-32 md:h-32 relative z-10 pointer-events-none mix-blend-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
            />
          </button>

          <button
            onClick={handleRightTopClick}
            className="group w-1/3 h-4/5 rounded-lg flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-105 bg-white relative overflow-hidden cursor-pointer"
          >
            <motion.p
              className="text-2xl font-bold text-black text-center relative z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3}}
            >
              Collaborate
            </motion.p>
            <motion.p
  className="text-center text-sm text-black-500 mt-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 5}}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</motion.p>
            <motion.img
              src="/src/assets/Two.svg"
              alt="Two"
              className="w-24 h-24 mt-4 md:w-32 md:h-32 relative z-10 pointer-events-none mix-blend-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5}}
            />
          </button>

          <button
            onClick={handleRightBottomClick}
            className="group w-1/3 h-4/5 rounded-lg flex flex-col justify-center items-center shadow-lg transition-transform hover:scale-105 bg-white relative overflow-hidden cursor-pointer"
          >
            <motion.p
              className="text-2xl font-bold text-black text-center relative z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3}}
            >
              My Notes
            </motion.p>
            <motion.p
  className="text-center text-sm text-black-500 mt-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 5}}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</motion.p>
            <motion.img
              src="/src/assets/Three.svg"
              alt="Three"
              className="w-24 h-24 mt-4 md:w-32 md:h-32 relative z-10 pointer-events-none mix-blend-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
            />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hub;
















