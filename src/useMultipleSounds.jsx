import { useState, useCallback } from "react";
import { useSound } from "use-sound";

export const useMultipleSounds = (soundFiles) => {
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const soundHooks = soundFiles.map((file) =>
    useSound(file, { volume: Math.random() * 0.1 + 0.1 })
  );

  const playRandomSound = useCallback(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * soundHooks.length);
    } while (soundHooks.length > 1 && randomIndex === lastPlayedIndex);

    const [play] = soundHooks[randomIndex];
    play();
    setLastPlayedIndex(randomIndex);
  }, [soundHooks, lastPlayedIndex]);

  return playRandomSound;
};
