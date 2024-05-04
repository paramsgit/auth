'use client'
import useFcmToken from "@/utils/useFCMToken";
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from '../utils/firebase';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ToastContainer, toast,cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rupeesSound } from "@/utils/audioPlayer";
export default function FcmTokenComp() {
  const {theme, setTheme} = useTheme()
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const notify = (e:string) => {toast(`${e}`);};
  const notifySound=()=>{

  }
  
  useEffect(() => {
    if (firebaseApp && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, async(payload) => {console.log('Foreground push notification received:', payload);
        if(payload.data)
        {notify(`${payload.data.title} ₹${payload.data.body}`)
        await rupeesSound(payload.data.body)
        var audio = new Audio('/phonePe.mp3');
        audio.play();
      }
        });

        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return<> <ToastContainer
  position="bottom-right"
  autoClose={10000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme={theme}
  
  
  />
 
  </>
  // {/* Same as */}
  // <ToastContainer />;
}
