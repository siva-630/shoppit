import React from 'react'
import { Heart, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WishlistForYou = ({ items, onRemove }) => {
  const navigate = useNavigate()
  if (!items.length) {
    return (
      <section className='mt-6 rounded-2xl border border-orange-200 bg-orange-100/80 p-5'>
        <div className='flex items-center gap-2 text-orange-900'>
          <Heart className='h-5 w-5' />
          <h2 className='text-xl font-bold'>My Wishlist</h2>
        </div>
        <p className='mt-2 text-sm font-medium text-orange-800'>
          Add products using the <span className='font-semibold'>My Wishlist</span> button to see them here.
        </p>
      </section>
    )
  }

  return (
    <section className='mt-6 rounded-2xl border border-orange-200 bg-orange-100/80 p-4 sm:p-5'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-orange-900'>
          <Heart className='h-5 w-5 fill-orange-500 text-orange-500' />
          <h2 className='text-xl font-bold'>My Wishlist</h2>
        </div>
        <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200'>
          {items.length} item{items.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className='no-scrollbar flex gap-3 overflow-x-auto pb-1'>
        {items.map((item) => (
          <article
            key={item.id}
            className='min-w-52 max-w-52 cursor-pointer rounded-xl bg-white p-2 shadow-sm ring-1 ring-orange-200'
            role='button'
            tabIndex={0}
            onClick={() => navigate(`/product/${item.id}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                navigate(`/product/${item.id}`)
              }
            }}
          >
            <div className='flex h-36 items-center justify-center rounded-lg bg-orange-50 p-2'>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full object-contain'
                loading='lazy'
              />
            </div>

            <div className='px-1 pb-1 pt-2'>
              <p className='line-clamp-1 text-xs font-medium capitalize text-orange-700'>
                {item.typeLabel}
              </p>
              <h3 className='line-clamp-1 text-sm font-semibold text-gray-900'>{item.title}</h3>
              <p className='mt-1 text-sm font-bold text-emerald-700'>{item.inrPrice}</p>

              <button
                type='button'
                onClick={(event) => {
                  event.stopPropagation()
                  onRemove(item.id)
                }}
                className='mt-2 inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200 transition hover:bg-orange-100'
              >
                <Trash2 className='h-3.5 w-3.5' />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WishlistForYou
