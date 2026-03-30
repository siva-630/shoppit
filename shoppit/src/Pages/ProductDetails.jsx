import React, { useEffect, useMemo, useState } from 'react'
import { ShieldCheck, Star, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../services/dummyJsonProducts'

const formatInr = (price) => {
  const amount = Math.max(99, Math.round((Number(price) || 0) * 83))

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const COLOR_SWATCHES = ['#F4C7D6', '#EDEDED', '#161616', '#6A2B3B', '#BDD8F1']

const ProductDetails = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isImageHovering, setIsImageHovering] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadProduct = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await fetchProductById(productId, controller.signal)
        setProduct(response)
      } catch (error) {
        if (error?.name !== 'AbortError') {
          setProduct(null)
          setErrorMessage('Could not load product details right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [productId])

  const galleryImages = useMemo(() => {
    if (!product) {
      return []
    }

    const images = [product.thumbnail, ...(product.images || [])].filter(Boolean)
    return Array.from(new Set(images))
  }, [product])

  const selectedImage = galleryImages[activeImageIndex] || galleryImages[0] || ''

  const inrPrice = formatInr(product?.price)
  const originalPrice = formatInr((Number(product?.price) || 0) * 1.5)
  const rating = Number(product?.rating || 0)
  const reviews = Array.isArray(product?.reviews) ? product.reviews : []
  const highlightItems = Array.isArray(product?.tags) && product.tags.length > 0
    ? product.tags
    : ['Fast Charging Support', 'With Noise Cancellation', 'With Deep Bass', 'Bluetooth Connectivity']

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
        <p className='text-sm font-medium text-gray-600'>Loading product details...</p>
      </section>
    )
  }

  if (errorMessage || !product) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm'>
        <p className='text-sm font-medium text-red-600'>{errorMessage || 'Product not found.'}</p>
      </section>
    )
  }

  return (
    <section className='space-y-4'>
      <div className='rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm'>
        <nav className='flex flex-wrap items-center gap-1 text-sm text-gray-500'>
          <Link to='/products/for-you' className='hover:text-orange-600 hover:underline'>Home</Link>
          <span>/</span>
          <Link to='/search' className='hover:text-orange-600 hover:underline'>Search</Link>
          <span>/</span>
          <span className='font-medium text-gray-700'>{product.title}</span>
        </nav>
      </div>

      <div className='grid items-start gap-5 lg:grid-cols-[92px_560px_minmax(0,1fr)]'>
        <div className='rounded-xl border border-gray-200 bg-white p-2'>
          <div className='space-y-2'>
            {galleryImages.map((image, index) => (
              <button
                type='button'
                key={`${product.id}-${index}`}
                onMouseEnter={() => setActiveImageIndex(index)}
                onClick={() => setActiveImageIndex(index)}
                className={`w-full overflow-hidden rounded-md border p-1.5 ${
                  activeImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} className='h-18 w-full object-contain' />
              </button>
            ))}
          </div>
        </div>

        <div className='rounded-xl border border-gray-200 bg-[#111317] p-4'>
          <div
            className='relative flex h-96 items-center justify-center overflow-visible rounded-lg bg-[#131722]'
            onMouseEnter={() => setIsImageHovering(true)}
            onMouseLeave={() => setIsImageHovering(false)}
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              const relativeX = event.clientX - bounds.left
              const relativeY = event.clientY - bounds.top
              const x = (relativeX / bounds.width) * 100
              const y = (relativeY / bounds.height) * 100

              setZoomPosition({
                x: Math.min(100, Math.max(0, x)),
                y: Math.min(100, Math.max(0, y)),
              })
            }}
          >
            <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-lg'>
              <img
                src={selectedImage}
                alt={product.title}
                className='h-full w-full object-contain transition-transform duration-200 hover:scale-105'
              />
            </div>

            {isImageHovering ? (
              <div
                className='pointer-events-none absolute left-full top-0 z-40 ml-8 hidden h-120 w-140 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-2xl md:block'
                style={{
                  transform: 'translateY(0)',
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: '380%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ) : null}
          </div>
        </div>

        <div className='space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
          <p className='text-sm font-semibold text-blue-700'>Visit brand store</p>
          <h1 className='text-2xl font-semibold text-gray-900'>{product.title}</h1>

          <div className='flex items-center gap-2'>
            <span className='inline-flex items-center gap-1 rounded bg-emerald-600 px-2 py-0.5 text-sm font-semibold text-white'>
              {rating.toFixed(1)} <Star className='h-3.5 w-3.5 fill-current' />
            </span>
            <span className='text-sm text-gray-600'>{reviews.length || Math.max(50, Number(product.stock) * 8)} ratings</span>
          </div>

          <p className='text-sm text-gray-700'>{product.description}</p>

          <div className='space-y-1'>
            <p className='text-3xl font-bold text-gray-900'>{inrPrice}</p>
            <p className='text-lg text-gray-500'>
              <span className='line-through'>{originalPrice}</span>
              <span className='ml-2 font-semibold text-emerald-700'>{Math.max(5, Math.round(Number(product.discountPercentage) || 0))}% off</span>
            </p>
          </div>

          <div>
            <p className='mb-2 text-base font-semibold text-gray-800'>Selected Color: Blush Pink</p>
            <div className='flex gap-2'>
              {COLOR_SWATCHES.map((color, index) => (
                <button
                  type='button'
                  key={`${color}-${index}`}
                  className='h-10 w-10 rounded-md border border-gray-300'
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
            <p className='text-lg font-semibold text-gray-800'>Delivery details</p>
            <p className='mt-1 text-sm text-gray-700'>532435 Select delivery location</p>
            <p className='mt-1 text-sm font-semibold text-gray-800'>Express delivery in 2 days</p>
            <p className='mt-2 text-sm text-gray-700'>1 Year Warranty from date of purchase</p>
          </div>

          <div>
            <p className='text-lg font-semibold text-gray-800'>Product highlights</p>
            <ul className='mt-2 space-y-1 text-sm text-gray-700'>
              {highlightItems.slice(0, 5).map((item) => (
                <li key={item} className='flex items-center gap-2'>
                  <span className='inline-block h-2 w-2 rounded-full bg-gray-400' />
                  <span className='capitalize'>{String(item).replace(/-/g, ' ')}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='grid grid-cols-2 gap-2 pt-2'>
            <button
              type='button'
              className='rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg font-semibold text-gray-800 transition hover:bg-gray-50'
            >
              Add to cart
            </button>
            <button
              type='button'
              className='rounded-lg bg-yellow-400 px-4 py-3 text-lg font-bold text-gray-900 transition hover:bg-yellow-300'
            >
              Buy at {inrPrice}
            </button>
          </div>

          <div className='grid grid-cols-3 gap-2 pt-1 text-center text-xs text-gray-700'>
            <div className='rounded-md border border-gray-200 p-2'>
              <ShieldCheck className='mx-auto mb-1 h-5 w-5 text-blue-600' />
              7 Days Replacement
            </div>
            <div className='rounded-md border border-gray-200 p-2'>
              <Truck className='mx-auto mb-1 h-5 w-5 text-emerald-600' />
              Cash on Delivery
            </div>
            <div className='rounded-md border border-gray-200 p-2'>
              <ShieldCheck className='mx-auto mb-1 h-5 w-5 text-indigo-600' />
              Shoppit Assured
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
