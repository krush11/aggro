import Header from '@/common/Header'
import Navbar from '@/common/Navbar'

export default function Layout({ children }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-row flex-1'>
        <Navbar />
        <div className='flex-1'>
          {children}
        </div>
      </div>
    </div>
  )
}