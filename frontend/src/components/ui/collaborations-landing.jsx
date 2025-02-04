import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const CollaborationLanding = () => {
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate('/collab-canvas');
    }, 1500);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
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
        <div className="aspect-video rounded-lg bg-gray-200 flex items-center justify-center">
          <img 
            src="/api/placeholder/400/225" 
            alt="Collaboration" 
            className="rounded-lg"
          />
        </div>

        {/* Input and Button */}
        <div className="space-y-3">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          
          <button
            onClick={handleJoinRoom}
            disabled={isLoading || !roomId.trim()}
            className="w-full bg-blue-600 text-white py-2 px-3 text-sm rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting now...
              </span>
            ) : (
              'JOIN A ROOM'
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