import React from 'react';
import AudioPlayer from '../components/AudioPlayer';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Mascarata Radio</h1>
      <p className="mb-6 text-gray-300">Streaming live 24/7</p>
      updated
      <AudioPlayer />
    </div>
  );
};

export default HomePage;