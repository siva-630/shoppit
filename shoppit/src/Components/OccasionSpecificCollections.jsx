import React from 'react'
import { useNavigate } from 'react-router-dom'

const OccasionSpecificCollections = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-center text-2xl font-black uppercase tracking-wide text-gray-900 sm:text-4xl'>
          Occasion Specific Collections
        </h2>
        <p className='mt-3 text-center text-sm text-gray-600'>Loading occasion collections...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-center text-2xl font-black uppercase tracking-wide text-gray-900 sm:text-4xl'>
          Occasion Specific Collections
        </h2>
        <p className='mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
      <h2 className='text-center text-2xl font-black uppercase tracking-wide text-gray-900 sm:text-4xl'>
        Occasion Specific Collections
      </h2>

      <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {items.map((item) => (
          <article
            key={item.id}
            className='group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-gray-50'
            role='button'
            tabIndex={0}
            onClick={() => item.productId && navigate(`/product/${item.productId}`)}
            onKeyDown={(event) => {
              if ((event.key === 'Enter' || event.key === ' ') && item.productId) {
                event.preventDefault()
                navigate(`/product/${item.productId}`)
              }
            }}
          >
            <div className='relative h-72 overflow-hidden bg-gray-100'>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt || item.label}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  loading='lazy'
                />
              ) : (
                <div className='flex h-full items-center justify-center text-sm font-medium text-gray-500'>
                  No image
                </div>
              )}
            </div>
            <div className='border-t border-gray-100 bg-white px-3 py-2 text-center'>
              <h3 className='text-2xl font-black uppercase tracking-wide text-gray-900'>{item.label}</h3>
              <p className='mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500'>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OccasionSpecificCollections
