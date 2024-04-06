import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import Front from './home';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div className='mt-20'>{children?children:<Front/>}</div>
    </div>
  );
};

export default Layout;