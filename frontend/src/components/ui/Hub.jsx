import React from 'react';

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
<div className="h-screen flex flex-col md:flex-row bg-white">
  <div
    onClick={handleLeftClick}
    className="w-full md:w-1/2 h-full cursor-pointer flex flex-col justify-center items-center bg-inherit"
  >
    <p className="text-black text-center text-xl">Create Notes</p>
    <img src="/src/assets/One.svg" alt="One" className="w-32 h-32 mt-4" />
  </div>

  <div className="w-full md:w-1/2 h-full flex flex-col bg-inherit">
    <div
      onClick={handleRightTopClick}
      className="w-full h-1/2 cursor-pointer flex flex-col justify-center items-center"
    >
      <p className="text-black text-center text-xl">Collaborate</p>
      <img src="/src/assets/Two.svg" alt="Two" className="w-32 h-32 mt-4" />
    </div>

    <div
      onClick={handleRightBottomClick}
      className="w-full h-1/2 cursor-pointer flex flex-col justify-center items-center"
    >
      <p className="text-black text-center text-xl">My Books</p>
      <img src="/src/assets/Three.svg" alt="Three" className="w-32 h-32 mt-4" />
    </div>
  </div>
</div>

  );
};

export default Hub;

