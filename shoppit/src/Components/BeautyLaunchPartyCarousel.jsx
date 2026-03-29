import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BeautyLaunchPartyCarousel = ({ items = [], isLoading = false, errorMessage = '' }) => {
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

  const scrollCards = (direction) => {
    trackRef.current?.scrollBy({
      left: direction === 'right' ? 360 : -360,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-pink-200 bg-white p-4 shadow-sm'>
        <p className='text-sm font-medium text-slate-600'>Loading beauty launch offers...</p>
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
    <section className='overflow-hidden rounded-3xl border border-pink-200 bg-[#ffe7df] shadow-sm'>
      <div className='bg-linear-to-r from-pink-600 via-pink-500 to-orange-400 px-4 py-3 text-white sm:px-5'>
        <h2 className='text-3xl font-black sm:text-4xl'>The Launch Party</h2>
      </div>

      <div className='relative p-3 sm:p-4'>
        <div ref={trackRef} className='no-scrollbar overflow-x-auto px-10'>
          <div className='flex w-max gap-3'>
            {items.map((item) => (
              <article
                key={item.id}
                className='group w-61 shrink-0 overflow-hidden rounded-3xl border border-pink-200 bg-[#ffd8cf] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                <div className='h-78 overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-104'
                    loading='lazy'
                  />
                </div>

                <div className='bg-rose-600 px-3 py-2 text-center text-white'>
                  <h3 className='line-clamp-1 text-2xl font-medium'>{item.title}</h3>
                  <p className='text-4xl font-black'>{item.offerText}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {canScrollLeft ? (
          <button
            type='button'
            onClick={() => scrollCards('left')}
            className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show previous beauty launch products'
          >
            <ChevronLeft className='h-6 w-6' />
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            type='button'
            onClick={() => scrollCards('right')}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show more beauty launch products'
          >
            <ChevronRight className='h-6 w-6' />
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default BeautyLaunchPartyCarousel
