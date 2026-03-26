import React, { useState } from 'react'
import { Search, ShoppingCart, User, Plus } from 'lucide-react'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search for:', searchQuery)
  }

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4'>
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
            
            {/* Profile Icon */}
            <button className='flex items-center gap-2 hover:text-orange-500 transition-colors'>
              <User className='h-6 w-6 text-gray-700' />
              <span className='text-sm font-medium text-gray-700 hidden sm:inline'>Login</span>
            </button>

        

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

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
