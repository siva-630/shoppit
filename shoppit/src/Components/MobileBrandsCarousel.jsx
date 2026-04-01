import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MobileBrandsCarousel = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth
      setCanScrollLeft(track.scrollLeft > 1)
      setCanScrollRight(track.scrollLeft < maxScrollLeft - 1)
    }

    updateScrollState()

    track.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items])

  const scrollByDirection = (direction) => {
    trackRef.current?.scrollBy({
      left: direction === 'right' ? 420 : -420,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
        <p className='text-sm font-medium text-slate-600'>Loading mobile brands...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!items.length) {
    return null
  }

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-base font-semibold text-slate-900 sm:text-lg'>Shop by Mobile Brand</h2>
        <span className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700'>
          {items.length} brands
        </span>
      </div>

      <div className='relative'>
        <div ref={trackRef} className='no-scrollbar overflow-x-auto px-10'>
          <div className='flex w-max gap-4'>
            {items.map((item) => (
              <article
                key={item.id}
                className='w-30 shrink-0 cursor-pointer rounded-2xl border border-slate-200 bg-sky-50/70 p-2 text-center'
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
                <div className='mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-sky-100'>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt || item.label}
                      className='h-full w-full object-contain'
                      loading='lazy'
                    />
                  ) : (
                    <span className='text-lg font-black text-slate-700'>{item.label.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <p className='mt-2 line-clamp-1 text-sm font-semibold text-slate-800'>{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        {canScrollLeft ? (
          <button
            type='button'
            onClick={() => scrollByDirection('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show previous mobile brands'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            type='button'
            onClick={() => scrollByDirection('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show more mobile brands'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default MobileBrandsCarousel
