import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
export default function Switcher() {
  const {theme, setTheme} = useTheme()
  const [darkMode, setdarkMode] = useState(false)
    useEffect(() => {
    if(theme=="dark"){
      setdarkMode(true)
    } 
    }, [theme])
    

  return (
    <>
       <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        { darkMode?"light":"dark"}

      </button>
    </>
  );
}