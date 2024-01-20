'use client';

import Header from '@/common/Header'
import Navbar from '@/common/Navbar'
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');

    if (!token && !pathname.startsWith('/auth')) redirect('/auth/login');
    if (token && pathname.startsWith('/auth')) redirect('/');
  }, [pathname])

  if (pathname.startsWith('/auth'))
    return children;

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <ToastContainer />
      <div className='flex flex-row flex-1'>
        <Navbar />
        <div className='flex-1'>
          {children}
        </div>
      </div>
    </div>
  )
}