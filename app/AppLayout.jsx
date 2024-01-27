'use client';

import Header from '@/common/Header'
import Navbar from '@/common/Navbar'
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith('/auth'))
    return children;

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <ToastContainer />
      <div className='flex flex-row flex-1'>
        <Navbar />
        <div className='flex-1 p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}