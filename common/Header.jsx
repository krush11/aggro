'use client'

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Component() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null)
  const router = useRouter()
  const tool = usePathname().split('/')[1]

  async function fetchUser() {
    const res = await fetch('/api/user')
    const user = await res.json()
    setUser(user)

    if (res.status !== 200)
      return router.push('/auth/login')
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsProfileDropdownOpen(false);
    }

    fetchUser()

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, []);

  async function logout() {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200)
      router.push('/auth/login')
  }

  return (
    <header className='py-3 px-4 flex flex-row justify-between border-b'>
      <a href='/dashboard' className="flex flex-row items-center">
        <Image src='/icons/nut.svg' alt='logo' width={24} height={24} />
      </a>
      <span className='ml-2 uppercase text-md font-medium'>Aggro / {tool}</span>
      <span className={`relative ${isProfileDropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
        <span className='flex flex-row items-center cursor-pointer' onClick={() => setIsProfileDropdownOpen(v => !v)} >
          <span className='text-md font-medium mr-2'>Hi {user?.firstName}</span>
          <Image src='/icons/person.svg' alt='Profile' width={24} height={24} />
        </span>
        {isProfileDropdownOpen &&
          <div className='absolute z-20 cursor-pointer right-0 top-8 w-40 border rounded-md bg-white py-1 drop-shadow-lg'>
            <div onClick={() => { logout() }} className='inline-block text-sm font-medium w-full py-2 px-4 hover:bg-red-500 hover:text-white'>
              Logout
            </div>
          </div>}
      </span>
    </header >
  )
}