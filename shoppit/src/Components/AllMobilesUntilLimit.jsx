import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllProductsPage } from '../services/dummyJsonProducts'

const PAGE_SIZE = 24
const MOBILE_FEED_LIMIT = 60

const isMobileProduct = (product) => {
  const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
  return /phone|mobile|smartphone|iphone|galaxy|vivo|oppo|oneplus|xiaomi|redmi|realme|pixel|nothing|tablet/.test(searchText)
}

const mergeUniqueProducts = (previousProducts, incomingProducts) => {
  const seen = new Set(previousProducts.map((product) => product.id))
  const uniqueIncoming = incomingProducts.filter((product) => !seen.has(product.id))
  return [...previousProducts, ...uniqueIncoming]
}

const AllMobilesUntilLimit = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [rawSkip, setRawSkip] = useState(0)
  const [rawTotal, setRawTotal] = useState(0)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const sentinelRef = useRef(null)

  const inrFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }),
    [],
  )

  const hasReachedLimit = products.length >= MOBILE_FEED_LIMIT
  const hasMoreRawPages = rawTotal === 0 || rawSkip < rawTotal
  const hasMore = !hasReachedLimit && hasMoreRawPages

  const fetchAndMergePage = useCallback(async (skip, signal) => {
    const page = await fetchAllProductsPage({
      limit: PAGE_SIZE,
      skip,
      signal,
    })

    const nextSkip = Number(page.skip) + Number(page.limit)
    const mobileOnlyIncoming = (page.products || []).filter(isMobileProduct)

    setRawTotal(page.total)
    setRawSkip(nextSkip)
    setProducts((prev) => mergeUniqueProducts(prev, mobileOnlyIncoming).slice(0, MOBILE_FEED_LIMIT))
  }, [])

  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || isInitialLoading || !hasMore) {
      return
    }

    setIsLoadingMore(true)

    try {
      await fetchAndMergePage(rawSkip)
    } catch {
      setErrorMessage('Could not load more mobiles right now.')
    } finally {
      setIsLoadingMore(false)
    }
  }, [fetchAndMergePage, hasMore, isInitialLoading, isLoadingMore, rawSkip])

  useEffect(() => {
    const controller = new AbortController()

    const loadInitialProducts = async () => {
      setIsInitialLoading(true)
      setErrorMessage('')

      try {
        await fetchAndMergePage(0, controller.signal)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setProducts([])
          setRawTotal(0)
          setRawSkip(0)
          setErrorMessage('Could not load mobiles right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsInitialLoading(false)
        }
      }
    }

    loadInitialProducts()

    return () => {
      controller.abort()
    }
  }, [fetchAndMergePage])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreProducts()
        }
      },
      {
        root: null,
        rootMargin: '350px 0px',
        threshold: 0,
      },
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loadMoreProducts])

  if (isInitialLoading) {
    return (
      <section className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-bold text-slate-900'>All Mobiles</h2>
        <p className='mt-2 text-sm font-medium text-slate-600'>Loading mobiles...</p>
      </section>
    )
  }

  if (errorMessage && products.length === 0) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm'>
        <h2 className='text-xl font-bold text-slate-900'>All Mobiles</h2>
        <p className='mt-2 text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-bold text-slate-900'>All Mobiles</h2>
        <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
          {products.length}/{MOBILE_FEED_LIMIT}
        </span>
      </div>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => {
          const image = product.thumbnail || product.images?.[0]
          const inrPrice = inrFormatter.format(Number(product.price) * 83)

          return (
            <article
              key={product.id}
              className='group cursor-pointer rounded-xl bg-white p-2 ring-1 ring-slate-200 transition hover:shadow-md'
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
              <div className='flex h-44 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2 sm:h-52'>
                <img
                  src={image}
                  alt={product.title}
                  className='h-full w-full object-contain transition-transform duration-300 group-hover:scale-105'
                  loading='lazy'
                />
              </div>

              <div className='px-1 pb-1 pt-2'>
                <h3 className='line-clamp-2 text-sm font-semibold text-slate-900'>{product.title}</h3>
                <p className='mt-1 line-clamp-1 text-xs font-medium capitalize text-slate-500'>
                  {String(product.category || '').replace(/-/g, ' ')}
                </p>
                <p className='mt-1 text-lg font-black text-slate-900'>{inrPrice}</p>
              </div>
            </article>
          )
        })}
      </div>

      {errorMessage && products.length > 0 ? (
        <p className='mt-4 text-center text-xs font-medium text-red-600'>{errorMessage}</p>
      ) : null}

      <div ref={sentinelRef} className='h-2' />

      {isLoadingMore ? (
        <p className='mt-3 text-center text-sm font-medium text-slate-600'>Loading more mobiles...</p>
      ) : null}

      {!hasMore && products.length > 0 ? (
        <p className='mt-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500'>
          {hasReachedLimit
            ? `You reached the limit of ${MOBILE_FEED_LIMIT} mobiles.`
            : 'You have reached all available mobiles.'}
        </p>
      ) : null}
    </section>
  )
}

export default AllMobilesUntilLimit
