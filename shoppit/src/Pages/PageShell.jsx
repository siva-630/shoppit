import React from 'react'

const PageShell = ({ title, description }) => {
  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
      <p className='mt-2 text-sm text-gray-600'>{description}</p>
    </section>
  )
}

export default PageShell
