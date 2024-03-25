import Image from 'next/image'
import '../globals.css'
import { redirect } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { getUser } from '@/utils/getUser';

export default async function RootLayout({ children }) {
  await getUser() && redirect('/dashboard')

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src='/icons/nut.svg' alt='logo' width={48} height={48} className='my-8' />
      <ToastContainer position='bottom-right' limit={5} className='select-none w-1/4' />
      {children}
    </div>
  )
}
