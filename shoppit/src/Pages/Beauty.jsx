import React, { useEffect, useState } from 'react'
import AllBeautyProductsFeed from '../Components/AllBeautyProductsFeed'
import BeautyLaunchPartyCarousel from '../Components/BeautyLaunchPartyCarousel'
import BeautyMiniCards from '../Components/BeautyMiniCards'
import SkincareCircleShowcase from '../Components/SkincareCircleShowcase'
import {
  fetchBeautyLaunchPartyDeals,
  fetchBeautyMiniCards,
  fetchSkincareCircleItems,
} from '../services/dummyJsonProducts'

const Beauty = () => {
  const [launchPartyItems, setLaunchPartyItems] = useState([])
  const [isLoadingLaunchParty, setIsLoadingLaunchParty] = useState(false)
  const [launchPartyError, setLaunchPartyError] = useState('')
  const [skincareItems, setSkincareItems] = useState([])
  const [isLoadingSkincare, setIsLoadingSkincare] = useState(false)
  const [skincareError, setSkincareError] = useState('')
  const [beautyMiniCards, setBeautyMiniCards] = useState([])
  const [isLoadingBeautyMiniCards, setIsLoadingBeautyMiniCards] = useState(false)
  const [beautyMiniCardsError, setBeautyMiniCardsError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadLaunchPartyItems = async () => {
      setIsLoadingLaunchParty(true)
      setLaunchPartyError('')

      try {
        const items = await fetchBeautyLaunchPartyDeals(controller.signal)
        setLaunchPartyItems(items)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLaunchPartyItems([])
          setLaunchPartyError('Could not load beauty launch party offers right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingLaunchParty(false)
        }
      }
    }

    loadLaunchPartyItems()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadBeautyMiniCards = async () => {
      setIsLoadingBeautyMiniCards(true)
      setBeautyMiniCardsError('')

      try {
        const items = await fetchBeautyMiniCards(controller.signal)
        setBeautyMiniCards(items)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setBeautyMiniCards([])
          setBeautyMiniCardsError('Could not load beauty mini categories right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingBeautyMiniCards(false)
        }
      }
    }

    loadBeautyMiniCards()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadSkincareItems = async () => {
      setIsLoadingSkincare(true)
      setSkincareError('')

      try {
        const items = await fetchSkincareCircleItems(controller.signal)
        setSkincareItems(items)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSkincareItems([])
          setSkincareError('Could not load skincare essentials right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSkincare(false)
        }
      }
    }

    loadSkincareItems()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className='space-y-4'>
      <BeautyLaunchPartyCarousel
        items={launchPartyItems}
        isLoading={isLoadingLaunchParty}
        errorMessage={launchPartyError}
      />

      <BeautyMiniCards
        items={beautyMiniCards}
        isLoading={isLoadingBeautyMiniCards}
        errorMessage={beautyMiniCardsError}
      />

      <SkincareCircleShowcase
        items={skincareItems}
        isLoading={isLoadingSkincare}
        errorMessage={skincareError}
      />

      <AllBeautyProductsFeed />
    </div>
  )
}

export default Beauty
