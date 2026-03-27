import React, { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import slideOne from '../assets/sidebar/Gemini_Generated_Image_3nv8zm3nv8zm3nv8.png'
import slideTwo from '../assets/sidebar/Gemini_Generated_Image_5ntsz5ntsz5ntsz5.png'
import slideThree from '../assets/sidebar/Gemini_Generated_Image_oibagoibagoibago.png'
import slideFour from '../assets/sidebar/Gemini_Generated_Image_vf0do0vf0do0vf0d.png'
import slideFive from '../assets/sidebar/Gemini_Generated_Image_hkprtihkprtihkpr.png'
import slidesix from '../assets/sidebar/Gemini_Generated_Image_2arfe32arfe32arf.png'
import slideSeven from '../assets/sidebar/Gemini_Generated_Image_w0nrarw0nrarw0nr.png'
import slideeight from '../assets/sidebar/Gemini_Generated_Image_329how329how329h.png'
const Slidebars = () => {
  const slides = useMemo(
    () => [
      { id: 1, image: slideOne, alt: 'Shoppit promotional slide 1' },
      { id: 2, image: slideTwo, alt: 'Shoppit promotional slide 2' },
      { id: 3, image: slideThree, alt: 'Shoppit promotional slide 3' },
          { id: 4, image: slideFour, alt: 'Shoppit promotional slide 4' },
          { id: 5, image: slideFive, alt: 'Shoppit promotional slide 5' },
          { id: 6, image: slidesix, alt: 'Shoppit promotional slide 6' },
          { id: 7, image: slideSeven, alt: 'Shoppit promotional slide 7' },
          { id: 8, image: slideeight, alt: 'Shoppit promotional slide 8' },

    ],
    [],
  )

  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className='mx-auto mt-3 w-full max-w-7xl px-4'>
      <div className='relative h-44 overflow-hidden rounded-xl bg-gray-100 shadow-sm sm:h-60 lg:h-72'>
        {slides.map((slide, index) => {
          const isActive = index === currentSlide

          return (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          )
        })}

        <button
          onClick={goToPrevious}
          className='absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md transition hover:bg-white'
          aria-label='Previous slide'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>

        <button
          onClick={goToNext}
          className='absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-md transition hover:bg-white'
          aria-label='Next slide'
        >
          <ChevronRight className='h-5 w-5' />
        </button>

        <div className='absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-sm'>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Slidebars;
