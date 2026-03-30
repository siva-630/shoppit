import React, { useEffect, useRef, useState } from 'react'
import { Search, ShoppingCart, User, LogOut, X, Clock3 } from 'lucide-react'
import shoppitAiIcon from '../assets/shoppit_ai_icon_no_label.svg'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../firebase'
import { fetchSearchSuggestions } from '../services/dummyJsonProducts'

const RECENT_SEARCHES_STORAGE_KEY = 'shoppit-recent-searches'
const MAX_RECENT_SEARCHES = 6
const POPULAR_SEARCHES = [
  'phone',
  'laptop',
  'earbuds',
  'watch',
  'kurti',
  'saree',
  'shoes',
  'tshirt',
  'blouse',
  'perfume',
]

const Navbar = ({ onOpenPpitBox }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [liveSuggestions, setLiveSuggestions] = useState([])
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchContainerRef = useRef(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    try {
      const rawRecentSearches = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY)
      const parsedRecentSearches = JSON.parse(rawRecentSearches || '[]')

      if (Array.isArray(parsedRecentSearches)) {
        setRecentSearches(parsedRecentSearches.filter((item) => typeof item === 'string').slice(0, MAX_RECENT_SEARCHES))
      }
    } catch {
      setRecentSearches([])
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/search') {
      return
    }

    const queryFromUrl = new URLSearchParams(location.search).get('q') || ''
    setSearchQuery(queryFromUrl)
  }, [location.pathname, location.search])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchContainerRef.current?.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    const query = searchQuery.trim()

    if (!isSearchOpen || query.length < 2) {
      setLiveSuggestions([])
      setIsSuggestionLoading(false)
      return undefined
    }

    const controller = new AbortController()

    const timerId = setTimeout(async () => {
      setIsSuggestionLoading(true)

      try {
        const suggestions = await fetchSearchSuggestions(query, controller.signal, 8)
        setLiveSuggestions(suggestions)
      } catch (error) {
        if (error?.name !== 'AbortError') {
          setLiveSuggestions([])
        }
      } finally {
        setIsSuggestionLoading(false)
      }
    }, 250)

    return () => {
      controller.abort()
      clearTimeout(timerId)
    }
  }, [isSearchOpen, searchQuery])

  const addRecentSearch = (term) => {
    const normalizedTerm = String(term || '').trim()

    if (!normalizedTerm) {
      return
    }

    setRecentSearches((previousRecentSearches) => {
      const nextRecentSearches = [
        normalizedTerm,
        ...previousRecentSearches.filter(
          (item) => item.toLowerCase() !== normalizedTerm.toLowerCase(),
        ),
      ].slice(0, MAX_RECENT_SEARCHES)

      localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(nextRecentSearches))
      return nextRecentSearches
    })
  }

  const runSearch = (term) => {
    const normalizedTerm = String(term || '').trim()

    if (!normalizedTerm) {
      return
    }

    setSearchQuery(normalizedTerm)
    addRecentSearch(normalizedTerm)
    setIsSearchOpen(false)
    navigate(`/search?q=${encodeURIComponent(normalizedTerm)}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    runSearch(searchQuery)
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
          <button
            type='button'
            onClick={() => navigate('/products/for-you')}
            className='shrink-0 cursor-pointer'
            aria-label='Go to home page'
          >
            <img 
              src='/shoppit.png' 
              alt='Shoppit Logo' 
              className='h-10 w-auto object-contain'
            />
          </button>

          {/* Middle - Search Bar */}
          <div className='flex-1 max-w-md'>
            <form onSubmit={handleSearch}>
              <div className='relative' ref={searchContainerRef}>
                <input
                  type='text'
                  placeholder='Try Saree, Kurti or Search by Product Code'
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsSearchOpen(true)
                  }}
                  className='w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                />
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />

                {isSearchOpen && (
                  <div className='absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
                    <div className='max-h-96 overflow-y-auto'>
                      {searchQuery.trim().length >= 2 ? (
                        <div className='py-2'>
                          <p className='px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>
                            Suggestions
                          </p>

                          {isSuggestionLoading ? (
                            <p className='px-4 py-3 text-sm text-gray-500'>Searching...</p>
                          ) : liveSuggestions.length > 0 ? (
                            liveSuggestions.map((item) => (
                              <button
                                key={item.id}
                                type='button'
                                onClick={() => runSearch(item.title)}
                                className='flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-50'
                              >
                                <Search className='h-4 w-4 shrink-0 text-gray-400' />
                                <span className='truncate text-sm text-gray-700'>{item.title}</span>
                                {item.category && (
                                  <span className='ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500'>
                                    {item.category}
                                  </span>
                                )}
                              </button>
                            ))
                          ) : (
                            <p className='px-4 py-3 text-sm text-gray-500'>No matching items found.</p>
                          )}
                        </div>
                      ) : (
                        <div className='py-3'>
                          <div className='px-4 pb-3'>
                            <p className='pb-2 text-2xl font-semibold text-gray-800'>Recent Searches</p>

                            {recentSearches.length > 0 ? (
                              <div className='space-y-1'>
                                {recentSearches.map((item) => (
                                  <button
                                    key={item}
                                    type='button'
                                    onClick={() => runSearch(item)}
                                    className='flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-gray-100'
                                  >
                                    <Clock3 className='h-4 w-4 text-gray-500' />
                                    <span className='text-sm text-gray-700'>{item}</span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <p className='text-sm text-gray-500'>No recent searches yet.</p>
                            )}
                          </div>

                          <div className='border-t border-gray-100 px-4 pt-3'>
                            <p className='pb-3 text-2xl font-semibold text-gray-800'>Popular Searches</p>
                            <div className='flex flex-wrap gap-2'>
                              {POPULAR_SEARCHES.map((item) => (
                                <button
                                  key={item}
                                  type='button'
                                  onClick={() => runSearch(item)}
                                  className='rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100'
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
