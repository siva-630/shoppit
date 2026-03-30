import React from 'react'

// Reusable sort bar for search result ordering.
const SearchSortBar = ({ sortBy, onSortByChange }) => {
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='flex flex-wrap items-center gap-3'>
        <p className='text-sm font-semibold text-gray-700'>Sort by</p>
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className='rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20'
        >
          <option value='relevance'>Relevance</option>
          <option value='price-low-to-high'>Price -- Low to High</option>
          <option value='price-high-to-low'>Price -- High to Low</option>
          <option value='rating-high-to-low'>Rating -- High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default SearchSortBar
