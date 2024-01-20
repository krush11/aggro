'use client'

import { useEffect } from 'react'
import { login } from './actions'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'

export default function Client() {
  const [state, handleLogin] = useFormState(login, null)

  useEffect(() => {
    if (state?.status !== 200) {
      toast.error(state?.error, {
        position: 'bottom-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true
      })
    }

    if (state?.status === 200) {
      localStorage.setItem('auth-token', state?.status)
      redirect('/')
    }
  }, [state])

  return (
    <div className="w-1/4 ">
      <form className="border p-6 rounded-md" action={handleLogin}>
        <h2 className="text-center font-semibold uppercase text-xl text-gray-800">Sign in to your account</h2>
        <div className="mt-8">
          <label htmlFor="identity" className="block text-xs font-semibold text-gray-600 uppercase ">E-mail or Username</label>
          <input id="identity" type="identity" name="identity" placeholder="Enter your e-mail or username" autoComplete="email" required
            className="block w-full p-2 mt-2 text-gray-800 border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" />

          <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
          <input id="password" type="password" name="password" placeholder="Enter your password" autoComplete="current-password" required
            className="block w-full p-2 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200" />

          <button type="submit" className="w-full py-3 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none">
            Login
          </button>
        </div>
      </form>

      <div className="mt-2 text-sm flex flex-row justify-between">
        <a href="/auth/forgot" className="transition-all hover:text-blue-500">Forgot password?</a>
        <a href="/auth/signup" className="transition-all hover:text-blue-500">Create an Account</a>
      </div>
    </div>
  )
}
