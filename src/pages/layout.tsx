import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div className='mt-20'>{children?children:"this is home page"}</div>
    </div>
  );
};

export default Layout;