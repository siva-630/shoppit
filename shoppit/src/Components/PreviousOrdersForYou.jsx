import React, { useEffect, useMemo, useState } from 'react'
import { PackageCheck, RotateCcw } from 'lucide-react'
import { fetchPreviousOrders } from '../services/dummyJsonProducts'

const PreviousOrdersForYou = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadPreviousOrders = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const previousOrders = await fetchPreviousOrders(controller.signal)
        setOrders(previousOrders)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setOrders([])
          setErrorMessage('Could not load previous orders right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadPreviousOrders()

    return () => {
      controller.abort()
    }
  }, [])

  const formattedOrders = useMemo(() => {
    const inrFormatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    })

    return orders.map((order, index) => ({
      ...order,
      image: order.thumbnail || order.images?.[0],
      inrPrice: inrFormatter.format(Number(order.price) * 83),
      orderDateLabel: `Ordered on ${new Date(2026, 1, 25 - index).toLocaleDateString('en-IN')}`,
    }))
  }, [orders])

  if (isLoading) {
    return (
      <section className='mt-6 rounded-2xl border border-orange-200 bg-orange-100/70 p-5'>
        <p className='text-sm font-medium text-orange-900'>Loading previous orders...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='mt-6 rounded-2xl border border-red-200 bg-red-50 p-5'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (formattedOrders.length === 0) {
    return null
  }

  return (
    <section
      id='previous-orders-section'
      className='mt-6 rounded-2xl border border-orange-200 bg-orange-100/70 p-4 sm:p-5'
    >
      <div className='mb-4 flex items-center gap-2 text-orange-900'>
        <PackageCheck className='h-5 w-5' />
        <h2 className='text-xl font-bold'>Previous Orders</h2>
      </div>

      <div className='no-scrollbar flex gap-3 overflow-x-auto pb-1'>
        {formattedOrders.map((order) => (
          <article
            key={order.id}
            className='min-w-56 max-w-56 rounded-xl bg-white p-2 shadow-sm ring-1 ring-orange-200'
          >
            <div className='flex h-36 items-center justify-center rounded-lg bg-orange-50 p-2'>
              <img
                src={order.image}
                alt={order.title}
                className='h-full w-full object-contain'
                loading='lazy'
              />
            </div>

            <div className='px-1 pb-1 pt-2'>
              <h3 className='line-clamp-1 text-sm font-semibold text-gray-900'>{order.title}</h3>
              <p className='mt-1 text-sm font-bold text-emerald-700'>{order.inrPrice}</p>
              <p className='mt-1 text-xs font-medium text-orange-700'>{order.orderDateLabel}</p>
              <span className='mt-2 inline-flex rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700'>
                Delivered
              </span>

              <button
                type='button'
                className='mt-2 inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200 transition hover:bg-orange-100'
              >
                <RotateCcw className='h-3.5 w-3.5' />
                Buy Again
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PreviousOrdersForYou