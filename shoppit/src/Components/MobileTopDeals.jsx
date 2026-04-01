import React from 'react'
import { useNavigate } from 'react-router-dom'

const MobileTopDeals = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-3xl font-black text-slate-900'>Top Deals</h2>
        <p className='mt-3 text-sm text-slate-600'>Loading top mobile deals...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-5'>
        <h2 className='text-3xl font-black text-slate-900'>Top Deals</h2>
        <p className='mt-3 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!items.length) {
    return null
  }

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
      <h2 className='text-3xl font-black text-slate-900'>Top Deals</h2>

      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {items.map((item) => (
          <article
            key={item.id}
            className='cursor-pointer overflow-hidden rounded-3xl bg-[#c8bdf3] ring-1 ring-[#bcaef1]'
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
            <div className='relative h-72 bg-[#c8bdf3] p-3'>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full object-contain'
                loading='lazy'
              />
            </div>

            <div className='bg-[#9c71f4] px-4 py-2 text-center'>
              <h3 className='line-clamp-1 text-2xl font-black uppercase text-white sm:text-3xl'>{item.title}</h3>
            </div>

            <p className='px-4 py-2 text-center text-4xl font-black text-black sm:text-5xl'>{item.priceText}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MobileTopDeals
