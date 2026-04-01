import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const cardToneClasses = [
  'bg-lime-50',
  'bg-amber-50',
  'bg-rose-50',
  'bg-orange-50',
  'bg-yellow-50',
]

const PriceWiseCollections = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <p className='text-sm font-medium uppercase tracking-wide text-amber-700'>Price-Wise</p>
        <h2 className='mt-1 text-2xl font-black uppercase text-gray-900 sm:text-3xl'>Cool Collections</h2>
        <p className='mt-3 text-sm text-gray-600'>Loading price-wise collections...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <p className='text-sm font-medium uppercase tracking-wide text-amber-700'>Price-Wise</p>
        <h2 className='mt-1 text-2xl font-black uppercase text-gray-900 sm:text-3xl'>Cool Collections</h2>
        <p className='mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
      <div className='text-center sm:text-left'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amber-700'>✦ ✦ Price-Wise</p>
        <h2 className='mt-1 text-2xl font-black uppercase text-gray-900 sm:text-4xl'>Cool Collections</h2>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`group relative min-h-64 cursor-pointer overflow-hidden rounded-3xl ${cardToneClasses[index % cardToneClasses.length]}`}
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
            <img
              src={item.image}
              alt={item.title}
              className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-linear-to-r from-black/15 via-transparent to-black/10' />

            <div className='relative z-10 flex h-full flex-col justify-between p-4 sm:p-5'>
              <div className='inline-flex w-fit min-w-36 flex-col rounded-2xl bg-white/85 px-3 py-2 shadow-sm backdrop-blur-sm'>
                <p className='text-base font-semibold uppercase tracking-wide text-lime-900 sm:text-lg'>Under</p>
                <p className='text-5xl leading-none font-black tabular-nums text-lime-900 sm:text-6xl'>₹{item.priceCap}</p>
                <p className='mt-1 line-clamp-1 text-xs font-semibold uppercase tracking-wide text-gray-700/90 sm:text-sm'>
                  {item.category}
                </p>
              </div>

              <div className='flex items-end justify-between gap-3 rounded-2xl bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm'>
                <p className='line-clamp-2 min-h-10 flex-1 pr-2 text-sm font-medium text-gray-900'>{item.title}</p>
                <button
                  type='button'
                  onClick={(event) => {
                    event.stopPropagation()
                    if (item.productId) {
                      navigate(`/product/${item.productId}`)
                    }
                  }}
                  className='rounded-full bg-white/95 p-2 text-gray-900 shadow-sm ring-1 ring-black/10 transition hover:bg-white'
                  aria-label={`Explore items under ${item.priceCap} rupees`}
                >
                  <ArrowRight className='h-5 w-5' />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PriceWiseCollections
