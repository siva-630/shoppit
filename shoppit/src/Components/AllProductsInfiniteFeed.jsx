import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchAllProductsPage } from '../services/dummyJsonProducts'

const PAGE_SIZE = 18

const AllProductsInfiniteFeed = () => {
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const sentinelRef = useRef(null)

  const hasMore = totalProducts === 0 || products.length < totalProducts

  const inrFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }),
    [],
  )

  const mergeUniqueProducts = (previousProducts, incomingProducts) => {
    const seen = new Set(previousProducts.map((product) => product.id))
    const uniqueIncoming = incomingProducts.filter((product) => !seen.has(product.id))
    return [...previousProducts, ...uniqueIncoming]
  }

  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || isInitialLoading || !hasMore) {
      return
    }

    setIsLoadingMore(true)

    try {
      const page = await fetchAllProductsPage({
        limit: PAGE_SIZE,
        skip: products.length,
      })

      setProducts((prev) => mergeUniqueProducts(prev, page.products))
      setTotalProducts(page.total)
    } catch {
      setErrorMessage('Could not load more products right now.')
    } finally {
      setIsLoadingMore(false)
    }
  }, [hasMore, isInitialLoading, isLoadingMore, products.length])

  useEffect(() => {
    const controller = new AbortController()

    const loadInitialProducts = async () => {
      setIsInitialLoading(true)
      setErrorMessage('')

      try {
        const page = await fetchAllProductsPage({
          limit: PAGE_SIZE,
          skip: 0,
          signal: controller.signal,
        })

        setProducts(page.products)
        setTotalProducts(page.total)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setProducts([])
          setTotalProducts(0)
          setErrorMessage('Could not load products right now.')
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
  }, [])

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
      <section className='mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <p className='text-sm font-medium text-slate-600'>Loading products...</p>
      </section>
    )
  }

  if (errorMessage && products.length === 0) {
    return (
      <section className='mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  return (
    <section className='mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => {
          const image = product.thumbnail || product.images?.[0]
          const inrPrice = inrFormatter.format(Number(product.price) * 83)
          const originalPrice = inrFormatter.format(Number(product.price) * 83 * 1.22)

          return (
            <article
              key={product.id}
              className='rounded-xl bg-white p-2 ring-1 ring-slate-200 transition hover:shadow-sm'
            >
              <div className='relative flex h-48 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2 sm:h-56'>
                {product.rating ? (
                  <span className='absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200'>
                    {Number(product.rating).toFixed(1)} ★
                  </span>
                ) : null}
                <img
                  src={image}
                  alt={product.title}
                  className='h-full w-full object-contain'
                  loading='lazy'
                />
              </div>

              <div className='px-1 pb-1 pt-2'>
                <h3 className='line-clamp-2 text-sm font-medium text-slate-800'>{product.title}</h3>
                <p className='mt-1 line-clamp-1 text-xs capitalize text-slate-500'>
                  {String(product.category || '').replace(/-/g, ' ')}
                </p>
                <div className='mt-1 flex items-center gap-2'>
                  <span className='text-xl font-bold text-slate-900'>{inrPrice}</span>
                  <span className='text-sm font-medium text-slate-400 line-through'>
                    {originalPrice}
                  </span>
                </div>
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
        <p className='mt-3 text-center text-sm font-medium text-slate-600'>Loading more products...</p>
      ) : null}

      {!hasMore && products.length > 0 ? (
        <p className='mt-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500'>
          You have reached all available products.
        </p>
      ) : null}
    </section>
  )
}

export default AllProductsInfiniteFeed