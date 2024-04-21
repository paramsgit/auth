import React, { useState } from 'react';
import { useTheme } from 'next-themes';

export default function Switcher() {
  const {theme, setTheme} = useTheme()
    

  return (
    <>
       <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme}
      </button>
    </>
  );
}