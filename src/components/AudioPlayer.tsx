import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // Уровень громкости от 0 до 1
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Управляет видимостью бегунка громкости

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume; // Восстанавливаем громкость
      } else {
        setVolume(audioRef.current.volume); // Сохраняем текущую громкость
        audioRef.current.volume = 0; // Уменьшаем до 0
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      // Сбрасываем "беззвучный" режим, если громкость больше 0
      if (newVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full max-w-md relative"
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <audio ref={audioRef}>
        <source src="http://mascarata.space:8000/stream" type="audio/mpeg" />
        Ваш браузер не поддерживает аудиовоспроизведение.
      </audio>
      <motion.button
        onClick={togglePlay}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
      </motion.button>
      <div className="relative flex items-center ml-4">
        <motion.button
          onClick={toggleMute}
          className="flex items-center justify-center p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <FaVolumeMute size={30} /> : <FaVolumeUp size={30} />}
        </motion.button>
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 left-full ml-2"
            >
              <input
                type="range"
                className="w-32"
                min="0"
                max="1"
                step="0.1"
                value={audioRef.current ? audioRef.current.volume : volume}
                onChange={handleVolumeChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
