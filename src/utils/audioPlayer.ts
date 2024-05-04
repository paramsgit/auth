import { Howl } from 'howler';

export const playSuccessSound = () => {
    const sound = new Howl({
      src: ['/transactionSuccess.mp3'], // Path to your audio file
      autoplay: false, // Do not autoplay by default
      volume: 1, // Set volume level (0 to 1)
    });
    sound.play();
  };

  // const allVoicesObtained = new Promise(function(resolve, reject) {
  //   let voices = window.speechSynthesis.getVoices();
  //   if (voices.length !== 0) {
  //     resolve(voices);
  //   } else {
  //     window.speechSynthesis.addEventListener("voiceschanged", function() {
  //       voices = window.speechSynthesis.getVoices();

  //       resolve(voices);
  //     });
  //   }
  // });

  // let Mvoice:any;
  
  // async function loadu(){
  //    Mvoice= await allVoicesObtained.then(voices => Mvoice=voices);
  //    console.log(Mvoice)
  // }
  // loadu()

  export async function rupeesSound(number:number|string) {
    // loadu()
    if(!number)
    return;
    return new Promise((resolve, reject) => {
        const msg = new SpeechSynthesisUtterance();
        // if(Mvoice)
        // msg.voice = Mvoice[3];
        msg.volume=1
        msg.text = `Rupees, ${number}`;
        msg.onend = resolve;
        window.speechSynthesis.speak(msg);
    });
}