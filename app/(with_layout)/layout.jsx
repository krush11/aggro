import Header from '@/common/Header'
import Navbar from '@/common/Navbar'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }) {
  return (
    <div className='flex flex-col h-screen bg-[#f0f0f2]'>
      <Header />
      <ToastContainer position='bottom-right' limit={5} className='select-none w-1/4' />
      <div className='flex flex-row flex-1 overflow-auto'>
        <Navbar />
        <div className='flex-1 overflow-y-scroll'>
          {children}
        </div>
      </div>
    </div>
  )
}