import React from 'react'

const sectionThemes = {
  mid: {
    wrapper: 'from-indigo-50 via-violet-50 to-purple-50',
    badge: 'bg-indigo-600 text-white',
    ring: 'ring-indigo-200',
    glow: 'group-hover:shadow-indigo-200/70',
  },
  budget: {
    wrapper: 'from-emerald-50 via-lime-50 to-teal-50',
    badge: 'bg-emerald-600 text-white',
    ring: 'ring-emerald-200',
    glow: 'group-hover:shadow-emerald-200/70',
  },
}

const MobileDealRow = ({ title, subtitle, items, tone = 'mid' }) => {
  const theme = sectionThemes[tone]

  if (!items.length) {
    return null
  }

  return (
    <section className={`rounded-3xl bg-linear-to-r ${theme.wrapper} p-4 shadow-sm ring-1 ${theme.ring} sm:p-5`}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-black text-slate-900 sm:text-3xl'>{title}</h2>
          <p className='text-sm font-medium text-slate-600'>{subtitle}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {items.map((item) => (
          <article
            key={item.id}
            className={`group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.glow}`}
          >
            <div className='relative h-56 overflow-hidden bg-linear-to-b from-white to-slate-50 p-3'>
              <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${theme.badge}`}>
                {item.offerText}
              </span>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-108 group-hover:-rotate-1'
                loading='lazy'
              />
            </div>

            <div className='border-t border-slate-100 px-4 py-3'>
              <h3 className='line-clamp-1 text-lg font-bold text-slate-900'>{item.title}</h3>
              <p className='mt-1 text-3xl font-black text-slate-950'>{item.priceText}</p>
              <button
                type='button'
                className='mt-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-700'
              >
                View Deal
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const MobileRangeDeals = ({ midRangeItems = [], budgetRangeItems = [], isLoading = false, errorMessage = '' }) => {
  if (isLoading) {
    return (
      <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
        <p className='text-sm font-medium text-slate-600'>Loading mid-range and budget deals...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!midRangeItems.length && !budgetRangeItems.length) {
    return null
  }

  return (
    <div className='space-y-4'>
      <MobileDealRow
        title='Mid Range Mobile Phones'
        subtitle='Balanced performance and value picks'
        items={midRangeItems}
        tone='mid'
      />

      <MobileDealRow
        title='Budget Range Phones'
        subtitle='Best affordable smartphones under your budget'
        items={budgetRangeItems}
        tone='budget'
      />
    </div>
  )
}

export default MobileRangeDeals
