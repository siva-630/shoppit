import React from 'react'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-8'>
        {/* Your page content goes here */}
      </main>
    </div>
  )
}

export default App