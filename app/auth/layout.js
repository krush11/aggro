'use client'

import Image from 'next/image'
import '../globals.css'
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');

    if (token && pathname.startsWith('/auth'))
      window.location.href = '/dashboard';
  }, [pathname])

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer className='w-1/4' />
      <Image src='/icons/nut.svg' alt='logo' width={48} height={48} className='my-8' />
      {children}
    </div>
  )
}
