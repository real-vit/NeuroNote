import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import Footer from './Footer';
import Navbar from './NavBar';

const CollaborationLanding = () => {
  const [roomId, setRoomId] = useState('');
  const [isJoinLoading, setIsJoinLoading] = useState(false);  
  const [isCreateLoading, setIsCreateLoading] = useState(false);  
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    console.log(roomId);
    if (!roomId.trim()) return; 
    setIsJoinLoading(true);
    
    setTimeout(() => {
      navigate(`/collab-canvas?roomId=${roomId}`);
    }, 1500);
  };
  

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6 mt-15">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 text-sm hover:underline focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            COLLABORATIONS
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            To collaborate with others on a project, please enter a room ID. 
            If you don't have one, ask the room owner to share it.
          </p>
        </div>

        {/* Placeholder Image */}
        <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center">
          <img 
            src="/src/assets/Five.svg" 
            alt="Collaboration" 
            className="rounded-lg w-54 h-54"
          />
        </div>

        {/* Input and Button */}
        <div className="space-y-3">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500  focus:border-transparent"
            disabled={isJoinLoading || isCreateLoading}
          />
          
          <button
            onClick={handleJoinRoom}
            disabled={isJoinLoading || !roomId.trim()}
            className="w-full bg-black text-white py-2 px-3 text-sm rounded-md font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500 disabled:bg-gray-400 disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isJoinLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting now...
              </span>
            ) : (
              'JOIN A ROOM'
            )}
          </button>
          <button
  onClick={() => {
    setIsCreateLoading(true);  
    setTimeout(() => {
      navigate('/collab-canvas');
    }, 1500);  
  }}
  disabled={isCreateLoading}  
  className="w-full bg-black text-white py-2 px-3 text-sm rounded-md font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
>
  {isCreateLoading ? (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      Creating room...
    </span>
  ) : (
    'CREATE A ROOM'
  )}
</button>


        </div>

        {/* Footer */}
        
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CollaborationLanding;
