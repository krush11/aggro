'use client'

import { useEffect } from "react"
import { useFormState } from "react-dom"
import { createAccount } from "./actions"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

export default function Client() {
  const [state, handleCreateAccount] = useFormState(createAccount, null)

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
    <div className="w-1/4">
      <form className="border p-6 rounded-md" action={handleCreateAccount}>
        <h2 className="text-center font-semibold uppercase text-xl text-gray-800">Create a new account</h2>
        <div className="mt-8">
          <label htmlFor="first-name" className="block text-xs font-semibold text-gray-600 uppercase">First Name</label>
          <input id="first-name" type="text" name="firstName" placeholder="Enter your first name" autoComplete="first-name" required
            className="block w-full p-2 mt-2 text-gray-800 transition-all border-b border-gray-200 focus:text-gray-500 outline-none focus:border-gray-400" />
          <label htmlFor="last-name" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Last Name</label>
          <input id="last-name" type="text" name="lastName" placeholder="Enter your last name" autoComplete="last-name" required
            className="block w-full p-2 mt-2 text-gray-800 transition-all border-b border-gray-200 focus:text-gray-500 outline-none focus:border-gray-400" />

          <label htmlFor="username" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Username</label>
          <input id="username" type="text" name="username" placeholder="Choose a username" autoComplete="username" required
            className="block w-full p-2 mt-2 text-gray-800 transition-all border-b border-gray-200 focus:text-gray-500 outline-none focus:border-gray-400" />

          <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
          <input id="email" type="email" name="email" placeholder="Enter your e-mail" autoComplete="email" required
            className="block w-full p-2 mt-2 text-gray-800 transition-all border-b border-gray-200 focus:text-gray-500 outline-none focus:border-gray-400" />

          <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
          <input id="password" type="password" name="password" placeholder="Enter your password" autoComplete="password" required
            className="block w-full p-2 mt-2 mb-4 text-gray-800 transition-all border-b border-gray-200 focus:text-gray-500 outline-none focus:border-gray-400" />

          <button type="submit" className="w-full py-3 bg-gray-800 rounded-sm font-medium text-white uppercase outline-none hover:bg-gray-700 hover:shadow-none">
            Create account
          </button>
        </div>
      </form>
      <div className="flex flex-row-reverse mt-2">
        <a href="/auth/login" className="text-sm transition-all hover:text-blue-500">Already have an account? Login</a>
      </div>
    </div>
  )
}
