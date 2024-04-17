import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/navbar';
import Front from './home';
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
const queryClient=new QueryClient()
interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>

    <div>
      <Navbar/>
      <div className='mt-20'>{children?children:<Front/>}</div>
    </div>
    </QueryClientProvider>
  );
};

export default Layout;