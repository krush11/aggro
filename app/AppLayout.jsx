import Header from '@/common/Header'
import Navbar from '@/common/Navbar'
import { ToastContainer } from 'react-toastify';
import { headers } from 'next/headers';

export default function Layout({ children }) {
  const headersList = headers()
  if (headersList.get('x-pathname').startsWith('/auth'))
    return children

  return (
    <div className='flex flex-col h-screen bg-[#f0f0f2]'>
      <Header />
      <ToastContainer position='bottom-right' />
      <div className='flex flex-row flex-1 overflow-auto'>
        <Navbar />
        <div className='flex-1 overflow-y-scroll'>
          {children}
        </div>
      </div>
    </div>
  )
}