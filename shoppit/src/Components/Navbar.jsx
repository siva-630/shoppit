import React, { useEffect, useState } from 'react'
import { Search, ShoppingCart, User, LogOut, X } from 'lucide-react'
import shoppitAiIcon from '../assets/shoppit_ai_icon_no_label.svg'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const Navbar = ({ onOpenPpitBox }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search for:', searchQuery)
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setAuthError('')
    setIsLoading(true)

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }

      setEmail('')
      setPassword('')
      setIsAuthModalOpen(false)
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setAuthError('')
    setIsLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      setIsAuthModalOpen(false)
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setAuthError('')
    try {
      await signOut(auth)
    } catch (error) {
      setAuthError(error.message)
    }
  }

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 mt-4 mb-3'>
        <div className='flex items-center justify-between h-16 gap-4'>
          
          {/* Left - Logo */}
          <div className='shrink-0'>
            <img 
              src='/shoppit.png' 
              alt='Shoppit Logo' 
              className='h-10 w-auto object-contain'
            />
          </div>

          {/* Middle - Search Bar */}
          <div className='flex-1 max-w-md'>
            <form onSubmit={handleSearch}>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                />
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              </div>
            </form>
          </div>

          {/* Right - Profile, Add to Cart, Cart */}
          <div className='flex items-center gap-6'>
            
            {/* Profile/Login */}
            {user ? (
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 text-gray-700'>
                  <User className='h-6 w-6' />
                  <span className='text-sm font-medium hidden sm:inline max-w-28 truncate'>
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors'
                >
                  <LogOut className='h-5 w-5' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className='flex items-center gap-2 hover:text-orange-500 transition-colors'
              >
                <User className='h-6 w-6 text-gray-700' />
                <span className='text-sm font-medium text-gray-700 hidden sm:inline'>Login</span>
              </button>
            )}

        

            {/* Shopping Cart Icon with Badge */}
            <button className='flex items-center gap-2 hover:text-orange-500 transition-colors relative'>
              <div className='relative'>
                <ShoppingCart className='h-6 w-6 text-gray-700' />
                <span className='absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                  0
                </span>
              </div>
              <span className='text-sm font-medium text-gray-700 hidden sm:inline'>Cart</span>
            </button>

            {/* Shoppit AI icon */}
            <button
              onClick={onOpenPpitBox}
              className='group relative flex items-center justify-center rounded-full p-1.5 transition-colors hover:bg-orange-50'
              aria-label='Ask PPit'
            >
              <img
                src={shoppitAiIcon}
                alt='Shoppit AI'
                className='h-10 w-10 object-contain'
              />
              <span className='pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100'>
                Ask PPit
              </span>
            </button>

          </div>
        </div>
      </div>

      {isAuthModalOpen && (
        <div className='fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 p-4'>
          <div className='mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {isLoginMode ? 'Login to Shoppit' : 'Create your Shoppit account'}
              </h2>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className='text-gray-500 hover:text-gray-700'
                aria-label='Close auth modal'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <form onSubmit={handleEmailAuth} className='space-y-3'>
              <input
                type='email'
                required
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20'
              />
              <input
                type='password'
                required
                minLength={6}
                placeholder='Password (min 6 characters)'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20'
              />

              <button
                type='submit'
                disabled={isLoading}
                className='w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isLoading ? 'Please wait...' : isLoginMode ? 'Login with Email' : 'Sign up with Email'}
              </button>
            </form>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className='mt-3 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70'
            >
              Continue with Google
            </button>

            {authError && (
              <p className='mt-3 rounded-md bg-red-50 p-2 text-sm text-red-600'>
                {authError}
              </p>
            )}

            <button
              onClick={() => {
                setIsLoginMode((prev) => !prev)
                setAuthError('')
              }}
              className='mt-4 text-sm font-medium text-orange-600 hover:text-orange-700'
            >
              {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
