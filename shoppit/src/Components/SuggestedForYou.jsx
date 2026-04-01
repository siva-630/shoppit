import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchProductsForRoute } from '../services/dummyJsonProducts'

const SuggestedForYou = ({ onAddToWishlist, wishlistProductIds = [] }) => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const carouselRef = useRef(null)

  const updateScrollState = useCallback(() => {
    if (!carouselRef.current) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  const scrollCards = (direction) => {
    if (!carouselRef.current) {
      return
    }

    const scrollAmount = Math.max(carouselRef.current.clientWidth * 0.75, 220)
    carouselRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const loadSuggestions = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const suggestions = await fetchProductsForRoute('/products/fashion', controller.signal)
        setProducts(suggestions)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setProducts([])
          setErrorMessage('Could not load suggested products right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadSuggestions()

    return () => {
      controller.abort()
    }
  }, [])

  const formattedProducts = useMemo(() => {
    const inrFormatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })

    return products.map((product) => ({
      ...product,
      image: product.thumbnail || product.images?.[0],
      inrPrice: inrFormatter.format(Number(product.price) * 83),
      typeLabel: product.category?.replace('-', ' ') || 'fashion',
    }))
  }, [products])

  useEffect(() => {
    updateScrollState()

    const track = carouselRef.current
    if (!track) {
      return undefined
    }

    track.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [formattedProducts.length, updateScrollState])

  if (isLoading) {
    return (
      <section className='mt-6 rounded-2xl bg-slate-100 p-5'>
        <p className='text-sm font-medium text-slate-600'>Loading suggested products...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='mt-6 rounded-2xl bg-red-50 p-5'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (formattedProducts.length === 0) {
    return null
  }

  return (
    <section className='mt-6 rounded-2xl bg-blue-100/70 p-4 sm:p-5'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-bold text-slate-800'>Suggested for You</h2>
        <button
          className='inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50'
          type='button'
        >
          Explore
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>

      <div className='relative'>
        {canScrollLeft ? (
          <button
            type='button'
            onClick={() => scrollCards('left')}
            className='absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Scroll suggested products left'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
        ) : null}

        {canScrollRight ? (
          <button
            type='button'
            onClick={() => scrollCards('right')}
            className='absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50'
            aria-label='Scroll suggested products right'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        ) : null}

        <div ref={carouselRef} className='no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2'>
          {formattedProducts.map((product) => (
            <article
              key={product.id}
              className='min-w-56 max-w-56 snap-start cursor-pointer rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200'
              role='button'
              tabIndex={0}
              onClick={() => navigate(`/product/${product.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/product/${product.id}`)
                }
              }}
            >
              <div className='flex h-44 items-center justify-center rounded-lg bg-slate-100 p-2'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='h-full w-full object-contain'
                  loading='lazy'
                />
              </div>

              <div className='px-1 pb-1 pt-2'>
                <p className='line-clamp-1 text-xs font-medium capitalize text-slate-500'>
                  {product.typeLabel}
                </p>
                <h3 className='line-clamp-1 text-base font-semibold text-slate-900'>{product.title}</h3>
                <div className='mt-1 rounded-md bg-slate-100 px-2 py-1'>
                  <p className='line-clamp-1 text-xs font-medium text-slate-600'>{product.typeLabel}</p>
                  <p className='text-sm font-bold text-emerald-700'>{product.inrPrice}</p>
                </div>
                <button
                  type='button'
                  onClick={(event) => {
                    event.stopPropagation()
                    navigate(`/product/${product.id}`)
                  }}
                  className='mt-1 text-xl font-bold leading-none text-slate-900 transition hover:text-slate-700'
                >
                  View Store
                </button>
                <button
                  type='button'
                  onClick={(event) => {
                    event.stopPropagation()
                    onAddToWishlist?.(product)
                  }}
                  disabled={wishlistProductIds.includes(product.id)}
                  className='mt-2 w-full rounded-md bg-orange-500 px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-default disabled:bg-orange-200 disabled:text-orange-700'
                >
                  {wishlistProductIds.includes(product.id) ? 'Added to My Wishlist' : 'My Wishlist'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuggestedForYou
