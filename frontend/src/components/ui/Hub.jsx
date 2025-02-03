import React from 'react';
import { motion } from 'framer-motion'; 

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
    <div className="h-screen flex flex-col md:flex-row bg-white font-inter"> 
      <div
        onClick={handleLeftClick}
        className="w-full sm:h-1/2 md:w-1/2 md:h-full cursor-pointer flex flex-col justify-center items-center bg-inherit border-b border-black-200 md:border-r"

      >
 <motion.p
  className="text-2xl mt-20 text-black text-center md:text-3xl md:mt-20"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  style={{
    background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.35) 100%)', 
    '-webkit-background-clip': 'text',
    color: 'transparent', 
  }}
>
  Create Notes
</motion.p>

        <motion.img
          src="/src/assets/One.svg"
          alt="One"
          className="w-48 h-48 mt-5 sm:w-20 sm:h-20 sm:mt-5 md:w-56 md:h-56"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex flex-col bg-inherit">
        <div
          onClick={handleRightTopClick}
          className="mt-2 w-full h-1/2 cursor-pointer flex flex-col justify-center items-center md:mt-17 border-b border-black-200"
        >
          <motion.p
            className="text-black text-center text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.35) 100%)', 
              '-webkit-background-clip': 'text',
              color: 'transparent', 
            }}
          >
            Collaborate
          </motion.p>
          <motion.img
            src="/src/assets/Two.svg"
            alt="Two"
            className="w-45 h-45 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        <div
          onClick={handleRightBottomClick}
          className="w-full h-1/2 cursor-pointer flex flex-col justify-center items-center mt-4"
        >
          <motion.p
            className="text-black text-center text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.35) 100%)', 
              '-webkit-background-clip': 'text',
              color: 'transparent', 
            }}
          >
            My Books
          </motion.p>
          <motion.img
            src="/src/assets/Three.svg"
            alt="Three"
            className="w-45 h-45 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hub;





