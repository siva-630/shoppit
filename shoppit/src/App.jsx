import React, { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import Slidebars from './Components/Slidebars'
import PpitBox from './Components/PpitBox'
import useRouteProducts from './hooks/useRouteProducts'
import { mapProductsToSlides } from './services/dummyJsonProducts'
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
import SearchResults from './Pages/SearchResults'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  const [isPpitOpen, setIsPpitOpen] = useState(false)
  const location = useLocation()

  const isForYouRoute =
    location.pathname === '/products/for-you' || location.pathname === '/'
  const isSearchRoute = location.pathname === '/search'
  const isProductDetailsRoute = location.pathname.startsWith('/product/')
  const hasMinimalHeaderLayout = isSearchRoute || isProductDetailsRoute

  const {
    routeProducts,
    isLoading: isProductsLoading,
    errorMessage: productsError,
  } = useRouteProducts({ pathname: location.pathname, skipFetch: isForYouRoute || hasMinimalHeaderLayout })

  const apiSlides = useMemo(() => {
    return mapProductsToSlides(routeProducts, location.pathname)
  }, [routeProducts, location.pathname])

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='sticky top-0 z-40 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80'>
        <Navbar onOpenPpitBox={() => setIsPpitOpen(true)} />
        {!hasMinimalHeaderLayout && <Products />}
      </div>
      {!hasMinimalHeaderLayout && (
        isForYouRoute ? (
          <Slidebars key='for-you-static-slider' />
        ) : (
          <Slidebars
            key={`dynamic-slider-${location.pathname}`}
            slides={apiSlides}
            isLoading={isProductsLoading}
            errorMessage={productsError}
          />
        )
      )}
      <main className='max-w-7xl mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Navigate to='/products/for-you' replace />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
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