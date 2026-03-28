import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WeddingStyleShowcase = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const containerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      setCanScrollLeft(container.scrollLeft > 1)
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 1)
    }

    updateScrollState()

    container.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items])

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -430, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 430, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-3xl font-black uppercase text-gray-900 sm:text-5xl'>Wedding Season</h2>
        <p className='mt-1 text-lg font-semibold uppercase tracking-wide text-gray-700 sm:text-2xl'>
          Summer Wardrobe
        </p>
        <p className='mt-4 text-sm text-gray-600'>Loading wedding style collection...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-3xl font-black uppercase text-gray-900 sm:text-5xl'>Wedding Season</h2>
        <p className='mt-1 text-lg font-semibold uppercase tracking-wide text-gray-700 sm:text-2xl'>
          Summer Wardrobe
        </p>
        <p className='mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
      <div className='text-center'>
        <h2 className='text-3xl font-black uppercase text-gray-900 sm:text-6xl'>Wedding Season</h2>
        <p className='mt-1 text-lg font-semibold uppercase tracking-wide text-gray-700 sm:text-3xl'>
          Summer Wardrobe
        </p>
      </div>

      <div className='relative mt-6'>
        <div ref={containerRef} className='overflow-x-auto px-14 no-scrollbar'>
          <div className='flex w-max gap-4'>
            {items.map((item) => (
              <article key={item.id} className='w-45 shrink-0'>
                <div className='relative overflow-hidden rounded-3xl bg-orange-50'>
                  <img
                    src={item.image}
                    alt={item.alt || item.label}
                    className='h-80 w-full object-cover'
                    loading='lazy'
                  />
                  <span className='pointer-events-none absolute -bottom-2 -right-1 text-2xl'>🌸</span>
                </div>
                <h3 className='mt-2 line-clamp-1 text-center text-3xl font-medium text-gray-900 sm:text-4xl'>
                  {item.label}
                </h3>
                <p className='text-center text-sm font-medium text-gray-700 sm:text-base'>{item.promoText}</p>
              </article>
            ))}
          </div>
        </div>

        {canScrollLeft ? (
          <button
            onClick={handleScrollLeft}
            className='absolute left-2 top-[40%] -translate-y-1/2 rounded-full bg-white p-3 text-gray-800 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50'
            aria-label='Show previous wedding styles'
          >
            <ChevronLeft className='h-6 w-6' />
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            onClick={handleScrollRight}
            className='absolute right-2 top-[40%] -translate-y-1/2 rounded-full bg-white p-3 text-gray-800 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50'
            aria-label='Show more wedding styles'
          >
            <ChevronRight className='h-6 w-6' />
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default WeddingStyleShowcase
