import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const audienceTitleMap = {
  men: 'Men Styles',
  women: 'Women Styles',
  unisex: 'Unisex Styles',
}

const audienceOrder = ['men', 'women', 'unisex']

const FashionReferenceTypes = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  const groupedItems = useMemo(() => {
    return items.reduce(
      (accumulator, item) => {
        const key = item.audience || 'unisex'

        if (!accumulator[key]) {
          accumulator[key] = []
        }

        accumulator[key].push(item)
        return accumulator
      },
      { men: [], women: [], unisex: [] },
    )
  }, [items])

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-base font-semibold text-gray-900 sm:text-lg'>Shop by Style</h2>
        <p className='mt-3 text-sm text-gray-600'>Loading style references...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-base font-semibold text-gray-900 sm:text-lg'>Shop by Style</h2>
        <p className='mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
      <h2 className='text-base font-semibold text-gray-900 sm:text-lg'>Shop by Style</h2>
      <p className='mt-1 text-sm text-gray-600'>Choose from men, women, and unisex dress types.</p>

      <div className='mt-4 space-y-6'>
        {audienceOrder.map((audienceKey) => {
          const sectionItems = groupedItems[audienceKey] || []

          if (sectionItems.length === 0) {
            return null
          }

          return (
            <div key={audienceKey}>
              <h3 className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
                {audienceTitleMap[audienceKey]}
              </h3>

              <div className='mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                {sectionItems.map((item) => (
                  <article
                    key={item.id}
                    className='cursor-pointer text-center'
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
                    <div className='mx-auto h-36 w-full max-w-42.5 overflow-hidden rounded-t-full rounded-b-2xl bg-[#efe5ef] sm:h-40'>
                      <img
                        src={item.image}
                        alt={item.alt || item.label}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <p className='mt-2 text-sm font-medium text-gray-800 sm:text-base'>{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FashionReferenceTypes
