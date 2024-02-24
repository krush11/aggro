'use client'
import { usePathname } from 'next/navigation';

export default function Redirector({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith('/auth'))
    return children;

  return null
}