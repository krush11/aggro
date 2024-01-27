'use client'

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Component() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null)

  async function fetchUser() {
    const res = await fetch('/api/user')
    const data = await res.json()
    if (res.status !== 200)
      return redirect('/auth/login')

    setUser(data.user)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsProfileDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);

    fetchUser()

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className='py-3 px-4 w-full flex flex-row justify-between border-b'>
      <a href='/dashboard' className="flex flex-row items-center">
        <Image src='/icons/nut.svg' alt='logo' width={24} height={24} />
      </a>
      <span className={`cursor-pointer relative ${isProfileDropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
        <span className='flex flex-row items-center'>
          <span className='text-md font-medium mr-2'>Hi {user?.firstName}</span>
          <Image src='/icons/person.svg' alt='Profile' width={24} height={24} onClick={() => setIsProfileDropdownOpen(v => !v)} />
        </span>
        {isProfileDropdownOpen &&
          <div className='absolute right-0 top-8 w-40 border rounded-md bg-white py-1 drop-shadow-lg'>
            <a href='/dashboard' className='inline-block text-sm font-medium w-full py-2 px-4 hover:bg-red-500 hover:text-white' onClick={() => { redirect('/auth/login') }}>
              Logout
            </a>
          </div>}
      </span>
    </header >
  )
}