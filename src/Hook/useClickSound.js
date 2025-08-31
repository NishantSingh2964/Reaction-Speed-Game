import { useRef } from "react";

export default function useClickSound(soundUrl = "/sounds/button.mp3") {
  const audioRef = useRef(new Audio(soundUrl));

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return playClick;
}
