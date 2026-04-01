import React from 'react'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatCurrencyFromUsd } from '../utils/searchSpecs'

// Reusable compact product card for search results grid.
const ProductResultCard = ({ product }) => {
  const navigate = useNavigate()
  const image = product.thumbnail || product.images?.[0]
  const rating = Number(product.rating || 0)
  const discount = Math.max(0, Math.round(Number(product.discountPercentage || 0)))
  const originalPrice = Number(product.price || 0)
  const discountedPrice = originalPrice * (1 - discount / 100)
  const reviewCount = product.reviews?.length || Math.max(12, Math.round((Number(product.stock) || 20) * 7))

  const deliveryLabel = discount >= 15 ? 'Free Delivery' : 'Delivery ₹75'
  const productDetailsUrl = `/product/${product.id}`

  return (
    <article
      className='cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md'
      role='button'
      tabIndex={0}
      onClick={() => navigate(productDetailsUrl)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate(productDetailsUrl)
        }
      }}
      aria-label={`Open details for ${product.title}`}
    >
      <div className='flex h-44 items-center justify-center overflow-hidden bg-gray-50 p-2.5'>
        {image ? (
          <img src={image} alt={product.title} className='h-full w-full object-contain' />
        ) : (
          <div className='flex h-full min-h-45 items-center justify-center text-sm text-gray-400'>
            No image
          </div>
        )}
      </div>

      <div className='space-y-1.5 p-3'>
        <h3 className='line-clamp-2 text-lg font-medium leading-tight text-[#5f5d77]'>
          {product.title}
        </h3>

        <p className='text-3xl font-bold leading-none text-[#20284f]'>
          {formatCurrencyFromUsd(discountedPrice)}
        </p>

        <span className='inline-block rounded-full bg-[#f1f2f8] px-2.5 py-0.5 text-sm font-medium text-[#555f86]'>
          {deliveryLabel}
        </span>

        <div className='flex items-center gap-2'>
          <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-sm font-semibold text-white'>
            {rating.toFixed(1)} <Star className='h-3.5 w-3.5 fill-current' />
          </span>
          <span className='text-sm font-medium text-[#7f7d96]'>{reviewCount} Reviews</span>
        </div>

        {discount > 0 && (
          <p className='text-xs text-gray-500 line-through'>{formatCurrencyFromUsd(originalPrice)}</p>
        )}
      </div>
    </article>
  )
}

export default ProductResultCard
