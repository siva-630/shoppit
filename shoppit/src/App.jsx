import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import PpitBox from './Components/PpitBox'
import ForYou from './Pages/Foryou'
import Fashion from './Pages/Fashion'
import Mobiles from './Pages/Mobiles'
import Beauty from './Pages/Beauty'
import Electronics from './Pages/Electronics'
import Home from './Pages/Home'
import Appliances from './Pages/Appliances'
import ToysBaby from './Pages/ToysBaby'
import FoodHealth from './Pages/FoodHealth'
import AutoAccessories from './Pages/AutoAccessories'
import TwoWheelers from './Pages/TwoWheelers'
import SportsFitness from './Pages/SportsFitness'
import BooksMore from './Pages/BooksMore'
import Furniture from './Pages/Furniture'

const App = () => {
  const [isPpitOpen, setIsPpitOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar onOpenPpitBox={() => setIsPpitOpen(true)} />
      <Products />
      <main className='max-w-7xl mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Navigate to='/products/for-you' replace />} />
          <Route path='/products/for-you' element={<ForYou />} />
          <Route path='/products/fashion' element={<Fashion />} />
          <Route path='/products/mobiles' element={<Mobiles />} />
          <Route path='/products/beauty' element={<Beauty />} />
          <Route path='/products/electronics' element={<Electronics />} />
          <Route path='/products/home' element={<Home />} />
          <Route path='/products/appliances' element={<Appliances />} />
          <Route path='/products/toys-baby' element={<ToysBaby />} />
          <Route path='/products/food-health' element={<FoodHealth />} />
          <Route path='/products/auto-accessories' element={<AutoAccessories />} />
          <Route path='/products/two-wheelers' element={<TwoWheelers />} />
          <Route path='/products/sports-fitness' element={<SportsFitness />} />
          <Route path='/products/books-more' element={<BooksMore />} />
          <Route path='/products/furniture' element={<Furniture />} />
          <Route path='*' element={<Navigate to='/products/for-you' replace />} />
        </Routes>
      </main>
      <PpitBox isOpen={isPpitOpen} onClose={() => setIsPpitOpen(false)} />
    </div>
  )
}

export default App