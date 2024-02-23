import Header from '@/common/Header'
import Navbar from '@/common/Navbar'
import { ToastContainer } from 'react-toastify';
import Redirector from './Redirector';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col max-h-screen bg-[#f0f0f2]'>
      <Redirector />
      <Header />
      <ToastContainer position='bottom-right' />
      <div className='flex flex-row flex-1 overflow-auto'>
        <Navbar />
        <div className='flex-1 p-4 overflow-y-scroll'>
          {children}
        </div>
      </div>
    </div>
  )
}