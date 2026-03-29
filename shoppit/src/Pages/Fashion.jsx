import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FashionReferenceTypes from '../Components/FashionReferenceTypes'
import OccasionSpecificCollections from '../Components/OccasionSpecificCollections'
import PriceWiseCollections from '../Components/PriceWiseCollections'
import WeddingStyleShowcase from '../Components/WeddingStyleShowcase'
import {
  fetchOccasionSpecificCollections,
  fetchFashionPriceCollections,
  fetchFashionReferenceTypes,
  fetchFashionSmallCards,
  fetchWeddingStyleShowcase,
} from '../services/dummyJsonProducts'

const Fashion = () => {
  const [smallCards, setSmallCards] = useState([])
  const [isLoadingCards, setIsLoadingCards] = useState(false)
  const [cardError, setCardError] = useState('')
  const [referenceTypes, setReferenceTypes] = useState([])
  const [isLoadingReferenceTypes, setIsLoadingReferenceTypes] = useState(false)
  const [referenceTypesError, setReferenceTypesError] = useState('')
  const [priceWiseCollections, setPriceWiseCollections] = useState([])
  const [isLoadingPriceWise, setIsLoadingPriceWise] = useState(false)
  const [priceWiseError, setPriceWiseError] = useState('')
  const [weddingStyles, setWeddingStyles] = useState([])
  const [isLoadingWeddingStyles, setIsLoadingWeddingStyles] = useState(false)
  const [weddingStylesError, setWeddingStylesError] = useState('')
  const [occasionCollections, setOccasionCollections] = useState([])
  const [isLoadingOccasions, setIsLoadingOccasions] = useState(false)
  const [occasionError, setOccasionError] = useState('')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadSmallCards = async () => {
      setIsLoadingCards(true)
      setCardError('')

      try {
        const products = await fetchFashionSmallCards(controller.signal)
        setSmallCards(products)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSmallCards([])
          setCardError('Unable to load fashion cards right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingCards(false)
        }
      }
    }

    loadSmallCards()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadPriceWiseCollections = async () => {
      setIsLoadingPriceWise(true)
      setPriceWiseError('')

      try {
        const collections = await fetchFashionPriceCollections(controller.signal)
        setPriceWiseCollections(collections)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setPriceWiseCollections([])
          setPriceWiseError('Unable to load price-wise collections right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingPriceWise(false)
        }
      }
    }

    loadPriceWiseCollections()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadWeddingStyles = async () => {
      setIsLoadingWeddingStyles(true)
      setWeddingStylesError('')

      try {
        const showcaseItems = await fetchWeddingStyleShowcase(controller.signal)
        setWeddingStyles(showcaseItems)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setWeddingStyles([])
          setWeddingStylesError('Unable to load wedding style collection right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingWeddingStyles(false)
        }
      }
    }

    loadWeddingStyles()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadReferenceTypes = async () => {
      setIsLoadingReferenceTypes(true)
      setReferenceTypesError('')

      try {
        const styles = await fetchFashionReferenceTypes(controller.signal)
        setReferenceTypes(styles)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setReferenceTypes([])
          setReferenceTypesError('Unable to load style references right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingReferenceTypes(false)
        }
      }
    }

    loadReferenceTypes()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadOccasionCollections = async () => {
      setIsLoadingOccasions(true)
      setOccasionError('')

      try {
        const occasionItems = await fetchOccasionSpecificCollections(controller.signal)
        setOccasionCollections(occasionItems)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setOccasionCollections([])
          setOccasionError('Unable to load occasion specific collections right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingOccasions(false)
        }
      }
    }

    loadOccasionCollections()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const container = cardsContainerRef.current

    if (!container) {
      return undefined
    }

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      setCanScrollLeft(container.scrollLeft > 1)
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 1)
    }

    updateScrollState()

    container.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [smallCards])

  const handleScrollRight = () => {
    cardsContainerRef.current?.scrollBy({ left: 420, behavior: 'smooth' })
  }

  const handleScrollLeft = () => {
    cardsContainerRef.current?.scrollBy({ left: -420, behavior: 'smooth' })
  }

  const toneClasses = useMemo(
    () => ['bg-yellow-100', 'bg-orange-50', 'bg-rose-50', 'bg-amber-50', 'bg-lime-50', 'bg-blue-50'],
    [],
  )

  return (
    <div className='space-y-4'>
      <section className='relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <h2 className='text-base font-semibold text-gray-900 sm:text-lg'>Fashion Picks</h2>

        {isLoadingCards ? (
          <div className='mt-4 text-sm text-gray-600'>Loading fashion cards...</div>
        ) : cardError ? (
          <div className='mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600'>{cardError}</div>
        ) : (
          <div className='relative mt-4'>
            <div ref={cardsContainerRef} className='overflow-x-auto px-14 no-scrollbar'>
              <div className='grid grid-flow-col grid-rows-2 auto-cols-[122px] gap-3 sm:auto-cols-[130px] sm:gap-4'>
                {smallCards.map((item, index) => (
                  <article key={item.id} className='group'>
                    <div
                      className={`h-29.5 overflow-hidden rounded-2xl ${toneClasses[index % toneClasses.length]}`}
                    >
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        loading='lazy'
                      />
                    </div>
                    <p className='mt-2 line-clamp-1 text-sm font-medium text-gray-800'>{item.title}</p>
                  </article>
                ))}
              </div>
            </div>

            {canScrollLeft ? (
              <button
                onClick={handleScrollLeft}
                className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-700 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50'
                aria-label='Show previous fashion cards'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
            ) : null}

            {canScrollRight ? (
              <button
                onClick={handleScrollRight}
                className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-700 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50'
                aria-label='Show more fashion cards'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            ) : null}
          </div>
        )}
      </section>

      <FashionReferenceTypes
        items={referenceTypes}
        isLoading={isLoadingReferenceTypes}
        errorMessage={referenceTypesError}
      />

      <PriceWiseCollections
        items={priceWiseCollections}
        isLoading={isLoadingPriceWise}
        errorMessage={priceWiseError}
      />

      <OccasionSpecificCollections
        items={occasionCollections}
        isLoading={isLoadingOccasions}
        errorMessage={occasionError}
      />

      <WeddingStyleShowcase
        items={weddingStyles}
        isLoading={isLoadingWeddingStyles}
        errorMessage={weddingStylesError}
      />
    </div>
  )
}

export default Fashion
