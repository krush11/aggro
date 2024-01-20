'use client'

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Component() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsProfileDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className='py-3 px-4 w-full flex flex-row justify-between border-b'>
      <a href='/' className="flex flex-row items-center">
        <Image src='/icons/nut.svg' alt='logo' width={24} height={24} />
      </a>
      <span className={`cursor-pointer relative ${isProfileDropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
        <Image src='/icons/person.svg' alt='Profile' width={24} height={24} onClick={() => setIsProfileDropdownOpen(v => !v)} />
        {isProfileDropdownOpen && <div className='absolute right-0 top-8 w-40 border rounded-md bg-white py-1 drop-shadow-lg'>
          <div className='text-sm font-medium w-full p-2 hover:bg-red-500 hover:text-white'>
            <a href='/' className='w-full p-2' onClick={() => { localStorage.removeItem('auth-token'); redirect('/auth/login') }}>Logout</a>
          </div>
        </div>}
      </span>
    </header >
  )
}