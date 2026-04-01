import React from 'react'
import { useNavigate } from 'react-router-dom'

const SkincareCircleShowcase = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <section className='rounded-3xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-2xl font-black text-slate-900 sm:text-3xl'>Skincare Essentials</h2>
        <p className='mt-2 text-sm font-medium text-slate-600'>Loading skincare products...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-3xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-5'>
        <h2 className='text-2xl font-black text-slate-900 sm:text-3xl'>Skincare Essentials</h2>
        <p className='mt-2 text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!items.length) {
    return null
  }

  return (
    <section className='rounded-3xl border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-cyan-50 p-4 shadow-sm sm:p-5'>
      <div className='mb-4 text-center'>
        <h2 className='text-2xl font-black text-slate-900 sm:text-3xl'>Skincare Essentials</h2>
        <p className='text-sm font-medium text-slate-600'>Circle-style product cards</p>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {items.map((item) => (
          <article
            key={item.id}
            className='group cursor-pointer rounded-2xl bg-white/85 p-3 text-center shadow-sm ring-1 ring-emerald-100 transition hover:-translate-y-0.5 hover:shadow-md'
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
            <div className='mx-auto flex h-30 w-30 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-cyan-100 p-2 ring-4 ring-white'>
              <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='h-full w-full object-contain transition-transform duration-300 group-hover:scale-108'
                  loading='lazy'
                />
              </div>
            </div>

            <h3 className='mt-3 line-clamp-1 text-base font-bold text-slate-900'>{item.title}</h3>
            <p className='line-clamp-1 text-xs font-semibold uppercase tracking-wide text-emerald-700'>
              {item.subtitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkincareCircleShowcase
