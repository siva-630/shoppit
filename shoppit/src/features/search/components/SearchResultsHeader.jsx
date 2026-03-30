import React from 'react'
import { Link } from 'react-router-dom'

// Header block shown above search results.
const SearchResultsHeader = ({ query, resultCount }) => {
  return (
    <div className='rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm'>
      <nav className='flex flex-wrap items-center gap-1 text-sm text-gray-500' aria-label='Breadcrumb'>
        <Link to='/products/for-you' className='hover:text-orange-600 hover:underline'>
          Home
        </Link>
        <span>/</span>
        <Link to='/search' className='hover:text-orange-600 hover:underline'>
          Search
        </Link>
        <span>/</span>
        <span className='font-medium text-gray-700'>{query || 'All'}</span>
      </nav>
      <h1 className='mt-2 text-2xl font-bold text-gray-900'>
        Showing {resultCount} result{resultCount === 1 ? '' : 's'} for “{query || 'all products'}”
      </h1>
    </div>
  )
}

export default SearchResultsHeader
