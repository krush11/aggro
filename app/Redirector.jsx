'use client'
import { usePathname } from 'next/navigation';

export default function Redirector() {
  const pathname = usePathname();

  if (pathname.startsWith('/auth'))
    return children;

  return null
}