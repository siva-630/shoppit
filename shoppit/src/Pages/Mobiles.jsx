import React, { useEffect, useState } from 'react'
import AllMobilesUntilLimit from '../Components/AllMobilesUntilLimit'
import MobileBrandsCarousel from '../Components/MobileBrandsCarousel'
import MobileRangeDeals from '../Components/MobileRangeDeals'
import MobileTopDeals from '../Components/MobileTopDeals'
import PremiumSmartphoneDealsCarousel from '../Components/PremiumSmartphoneDealsCarousel'
import {
  fetchMobileBrands,
  fetchMobileRangeDeals,
  fetchMobileTopDeals,
  fetchPremiumSmartphoneDeals,
} from '../services/dummyJsonProducts'

const Mobiles = () => {
  const [brandItems, setBrandItems] = useState([])
  const [isLoadingBrands, setIsLoadingBrands] = useState(false)
  const [brandsError, setBrandsError] = useState('')
  const [topDeals, setTopDeals] = useState([])
  const [isLoadingTopDeals, setIsLoadingTopDeals] = useState(false)
  const [topDealsError, setTopDealsError] = useState('')
  const [premiumDeals, setPremiumDeals] = useState([])
  const [isLoadingPremiumDeals, setIsLoadingPremiumDeals] = useState(false)
  const [premiumDealsError, setPremiumDealsError] = useState('')
  const [midRangeDeals, setMidRangeDeals] = useState([])
  const [budgetRangeDeals, setBudgetRangeDeals] = useState([])
  const [isLoadingRangeDeals, setIsLoadingRangeDeals] = useState(false)
  const [rangeDealsError, setRangeDealsError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadMobileBrands = async () => {
      setIsLoadingBrands(true)
      setBrandsError('')

      try {
        const brands = await fetchMobileBrands(controller.signal)
        setBrandItems(brands)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setBrandItems([])
          setBrandsError('Could not load mobile brands right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingBrands(false)
        }
      }
    }

    loadMobileBrands()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadRangeDeals = async () => {
      setIsLoadingRangeDeals(true)
      setRangeDealsError('')

      try {
        const rangeDeals = await fetchMobileRangeDeals(controller.signal)
        setMidRangeDeals(rangeDeals.midRange || [])
        setBudgetRangeDeals(rangeDeals.budgetRange || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setMidRangeDeals([])
          setBudgetRangeDeals([])
          setRangeDealsError('Could not load mid-range and budget phone deals right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRangeDeals(false)
        }
      }
    }

    loadRangeDeals()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadPremiumDeals = async () => {
      setIsLoadingPremiumDeals(true)
      setPremiumDealsError('')

      try {
        const deals = await fetchPremiumSmartphoneDeals(controller.signal)
        setPremiumDeals(deals)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setPremiumDeals([])
          setPremiumDealsError('Could not load premium smartphone deals right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingPremiumDeals(false)
        }
      }
    }

    loadPremiumDeals()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadTopDeals = async () => {
      setIsLoadingTopDeals(true)
      setTopDealsError('')

      try {
        const deals = await fetchMobileTopDeals(controller.signal)
        setTopDeals(deals)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setTopDeals([])
          setTopDealsError('Could not load top mobile deals right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingTopDeals(false)
        }
      }
    }

    loadTopDeals()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className='space-y-4'>
      <MobileBrandsCarousel
        items={brandItems}
        isLoading={isLoadingBrands}
        errorMessage={brandsError}
      />

      <MobileTopDeals
        items={topDeals}
        isLoading={isLoadingTopDeals}
        errorMessage={topDealsError}
      />

      <PremiumSmartphoneDealsCarousel
        items={premiumDeals}
        isLoading={isLoadingPremiumDeals}
        errorMessage={premiumDealsError}
      />

      <MobileRangeDeals
        midRangeItems={midRangeDeals}
        budgetRangeItems={budgetRangeDeals}
        isLoading={isLoadingRangeDeals}
        errorMessage={rangeDealsError}
      />

      <AllMobilesUntilLimit />
    </div>
  )
}

export default Mobiles
