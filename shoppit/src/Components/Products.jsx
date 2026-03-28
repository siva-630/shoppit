import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Smartphone,
  Paintbrush,
  Tv,
  Lamp,
  Monitor,
  ToyBrick,
  Utensils,
  Car,
  Bike,
  Dumbbell,
  BookOpen,
  Sofa,
  User,
  Shirt,
} from 'lucide-react'

const categories = [
  { id: 'for-you', label: 'For You', icon: User, path: '/products/for-you' },
  { id: 'fashion', label: 'Fashion', icon: Shirt, path: '/products/fashion' },
  { id: 'mobiles', label: 'Mobiles', icon: Smartphone, path: '/products/mobiles' },
  { id: 'beauty', label: 'Beauty', icon: Paintbrush, path: '/products/beauty' },
  { id: 'electronics', label: 'Electronics', icon: Tv, path: '/products/electronics' },
  { id: 'home', label: 'Home', icon: Lamp, path: '/products/home' },
  { id: 'appliances', label: 'Appliances', icon: Monitor, path: '/products/appliances' },
  { id: 'toys', label: 'Toys, baby', icon: ToyBrick, path: '/products/toys-baby' },
  { id: 'food', label: 'Food & Health', icon: Utensils, path: '/products/food-health' },
  { id: 'auto', label: 'Auto Accessories', icon: Car, path: '/products/auto-accessories' },
  { id: 'two-wheelers', label: '2 Wheelers', icon: Bike, path: '/products/two-wheelers' },
  { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell, path: '/products/sports-fitness' },
  { id: 'books', label: 'Books & More', icon: BookOpen, path: '/products/books-more' },
  { id: 'furniture', label: 'Furniture', icon: Sofa, path: '/products/furniture' },
]

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('for-you')
  const [showIcons, setShowIcons] = useState(true)
  const lastScrollYRef = useRef(0)
  const showIconsRef = useRef(true)
  const toggleLockUntilRef = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    showIconsRef.current = showIcons
  }, [showIcons])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isForYouRoute = location.pathname === '/products/for-you' || location.pathname === '/'

      if (isForYouRoute) {
        const previousOrdersSection = document.getElementById('previous-orders-section')
        const previousOrdersTop = previousOrdersSection?.offsetTop ?? Number.POSITIVE_INFINITY
        const previousOrdersHeight = previousOrdersSection?.offsetHeight ?? 0
        const previousOrdersBottom = previousOrdersTop + previousOrdersHeight
        const triggerBuffer = 24

        if (currentScrollY <= previousOrdersBottom + triggerBuffer) {
          if (!showIconsRef.current) {
            setShowIcons(true)
            showIconsRef.current = true
          }
          toggleLockUntilRef.current = 0
          lastScrollYRef.current = currentScrollY
          return
        }

        if (showIconsRef.current) {
          setShowIcons(false)
          showIconsRef.current = false
        }

        lastScrollYRef.current = currentScrollY
        return
      }

      const previousScrollY = lastScrollYRef.current
      const scrollDelta = currentScrollY - previousScrollY

      if (Math.abs(scrollDelta) < 12) {
        return
      }

      const nextShowIcons = scrollDelta < 0
      const now = performance.now()

      if (currentScrollY <= 60) {
        if (!showIconsRef.current) {
          setShowIcons(true)
          showIconsRef.current = true
        }
        lastScrollYRef.current = currentScrollY
        return
      }

      if (nextShowIcons === showIconsRef.current) {
        lastScrollYRef.current = currentScrollY
        return
      }

      if (now < toggleLockUntilRef.current) {
        lastScrollYRef.current = currentScrollY
        return
      }

      setShowIcons(nextShowIcons)
      showIconsRef.current = nextShowIcons
      toggleLockUntilRef.current = now + 180

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  return (
    <section className='border-b border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='no-scrollbar flex items-stretch gap-0.5 overflow-x-auto xl:gap-1 xl:overflow-x-hidden'>
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = location.pathname === category.path || activeCategory === category.id
            const hasImageIcon = Boolean(category.image)

            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  navigate(category.path)
                }}
                className={`group relative flex min-w-18 shrink-0 flex-col items-center justify-center px-2 py-2.5 text-center transition-all duration-400 ease-out xl:min-w-0 xl:flex-1 ${showIcons ? 'gap-1.5' : 'gap-0.5'}`}
                aria-label={category.label}
              >
                <div
                  className={`flex items-center justify-center overflow-hidden rounded-full transition-all duration-400 ease-out ${showIcons ? 'h-9 w-9 opacity-100' : 'h-0 w-0 opacity-0'} ${isActive ? 'bg-orange-100' : 'group-hover:bg-orange-50'}`}
                >
                  {hasImageIcon ? (
                    <img
                      src={category.image}
                      alt={category.label}
                      className='h-5 w-5 object-contain'
                    />
                  ) : (
                    <Icon
                      className={`h-5 w-5 transition-colors ${isActive ? 'text-orange-500' : 'text-gray-600 group-hover:text-orange-500'}`}
                    />
                  )}
                </div>
                <span
                  className={`max-w-20 text-[11px] leading-3.5 text-gray-700 ${isActive ? 'font-semibold' : 'font-medium'}`}
                >
                  {category.label}
                </span>

                <span
                  className={`absolute bottom-0 left-0 h-0.75 w-full rounded-t-full transition-colors ${isActive ? 'bg-orange-500' : 'bg-transparent'}`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products
