import { Howl } from 'howler';

export const playSuccessSound = () => {
    const sound = new Howl({
      src: ['/transactionSuccess.mp3'], // Path to your audio file
      autoplay: false, // Do not autoplay by default
      volume: 1, // Set volume level (0 to 1)
    });
    sound.play();
  };

