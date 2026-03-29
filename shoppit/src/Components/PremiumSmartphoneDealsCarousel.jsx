import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PremiumSmartphoneDealsCarousel = ({ items = [], isLoading = false, errorMessage = '' }) => {
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
      left: direction === 'right' ? 380 : -380,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
        <h2 className='text-3xl font-black text-slate-900'>Premium Smartphones Deals</h2>
        <p className='mt-2 text-sm text-slate-600'>Loading premium deals...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm'>
        <h2 className='text-3xl font-black text-slate-900'>Premium Smartphones Deals</h2>
        <p className='mt-2 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!items.length) {
    return null
  }

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
      <h2 className='text-3xl font-black text-slate-900'>Premium Smartphones Deals</h2>

      <div className='relative mt-4'>
        <div ref={trackRef} className='no-scrollbar overflow-x-auto px-10'>
          <div className='flex w-max gap-4'>
            {items.map((item) => (
              <article
                key={item.id}
                className='w-74 shrink-0 overflow-hidden rounded-3xl border border-[#9b7ac7] bg-[#cdbce8]'
              >
                <div
                  className='h-88 bg-cover bg-center p-3'
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 15% 25%, rgba(255,255,255,0.35) 0 12%, transparent 13%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.3) 0 10%, transparent 11%), linear-gradient(160deg, #b994df, #aa82d8)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className='h-full w-full object-contain'
                    loading='lazy'
                  />
                </div>

                <div className='bg-white/90 px-3 py-2 text-center'>
                  <h3 className='line-clamp-1 text-[42px] font-medium leading-tight text-slate-900'>{item.title}</h3>
                  <p className='mt-1 text-[50px] font-black leading-none text-black'>{item.priceText}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {canScrollLeft ? (
          <button
            type='button'
            onClick={() => scrollCards('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show previous premium phone deals'
          >
            <ChevronLeft className='h-7 w-7' />
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            type='button'
            onClick={() => scrollCards('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Show more premium phone deals'
          >
            <ChevronRight className='h-7 w-7' />
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default PremiumSmartphoneDealsCarousel
