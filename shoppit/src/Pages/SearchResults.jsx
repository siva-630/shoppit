import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProductsBySearchQuery } from '../services/dummyJsonProducts'
import SearchFiltersPanel from '../features/search/components/SearchFiltersPanel'
import ProductResultCard from '../features/search/components/ProductResultCard'
import SearchResultsHeader from '../features/search/components/SearchResultsHeader'
import SearchSortBar from '../features/search/components/SearchSortBar'
import { INITIAL_EXPANDED_SECTIONS } from '../features/search/constants/filterOptions'
import {
  enrichProductsWithSpecs,
  getAvailableDiscountBuckets,
  getSortedUniqueValues,
} from '../features/search/utils/searchSpecs'

const INITIAL_SELECTED_FILTERS = {
  categories: [],
  brands: [],
  operatingSystems: [],
  displays: [],
  batteryCapacities: [],
  processorClockSpeeds: [],
  primaryCameras: [],
  voiceCallingValues: [],
  discountBuckets: [],
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')?.trim() || ''

  const [allResults, setAllResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [selectedFilters, setSelectedFilters] = useState(INITIAL_SELECTED_FILTERS)
  const [maxPriceFilter, setMaxPriceFilter] = useState(200000)
  const [minRatingFilter, setMinRatingFilter] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')
  const [expandedSections, setExpandedSections] = useState(INITIAL_EXPANDED_SECTIONS)

  // Load product results for current query.
  useEffect(() => {
    const controller = new AbortController()

    const loadSearchResults = async () => {
      if (!searchQuery) {
        setAllResults([])
        setErrorMessage('')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const products = await fetchProductsBySearchQuery(searchQuery, controller.signal, 100)
        setAllResults(products)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setAllResults([])
          setErrorMessage('Could not load search results right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadSearchResults()

    return () => {
      controller.abort()
    }
  }, [searchQuery])

  const enrichedResults = useMemo(() => enrichProductsWithSpecs(allResults), [allResults])

  const allCategories = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.category))
  }, [enrichedResults])

  const allBrands = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.brand))
  }, [enrichedResults])

  const allOperatingSystems = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.operatingSystem))
  }, [enrichedResults])

  const allDisplaySizes = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.display))
  }, [enrichedResults])

  const allBatteryCapacities = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.batteryCapacity))
  }, [enrichedResults])

  const allProcessorClockSpeeds = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.processorClockSpeed))
  }, [enrichedResults])

  const allPrimaryCameras = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.primaryCamera))
  }, [enrichedResults])

  const allVoiceCallingValues = useMemo(() => {
    return getSortedUniqueValues(enrichedResults.map((product) => product.dummySpec.voiceCallingFacility))
  }, [enrichedResults])

  const allDiscountBuckets = useMemo(() => {
    return getAvailableDiscountBuckets(enrichedResults)
  }, [enrichedResults])

  const maxAvailablePrice = useMemo(() => {
    const prices = allResults.map((product) => Number(product.price) * 83).filter((price) => Number.isFinite(price))

    if (prices.length === 0) {
      return 200000
    }

    return Math.max(1000, Math.ceil(Math.max(...prices) / 1000) * 1000)
  }, [allResults])

  // Reset filters for every new query.
  useEffect(() => {
    setSelectedFilters(INITIAL_SELECTED_FILTERS)
    setMinRatingFilter(0)
    setSortBy('relevance')
  }, [searchQuery])

  useEffect(() => {
    setMaxPriceFilter(maxAvailablePrice)
  }, [maxAvailablePrice])

  const filteredResults = useMemo(() => {
    let products = [...enrichedResults]

    if (selectedFilters.categories.length > 0) {
      const categorySet = new Set(selectedFilters.categories)
      products = products.filter((product) => categorySet.has(product.category))
    }

    if (selectedFilters.brands.length > 0) {
      const brandSet = new Set(selectedFilters.brands)
      products = products.filter((product) => brandSet.has(product.brand))
    }

    if (selectedFilters.operatingSystems.length > 0) {
      const selectedSet = new Set(selectedFilters.operatingSystems)
      products = products.filter((product) => selectedSet.has(product.dummySpec.operatingSystem))
    }

    if (selectedFilters.displays.length > 0) {
      const selectedSet = new Set(selectedFilters.displays)
      products = products.filter((product) => selectedSet.has(product.dummySpec.display))
    }

    if (selectedFilters.batteryCapacities.length > 0) {
      const selectedSet = new Set(selectedFilters.batteryCapacities)
      products = products.filter((product) => selectedSet.has(product.dummySpec.batteryCapacity))
    }

    if (selectedFilters.processorClockSpeeds.length > 0) {
      const selectedSet = new Set(selectedFilters.processorClockSpeeds)
      products = products.filter((product) => selectedSet.has(product.dummySpec.processorClockSpeed))
    }

    if (selectedFilters.primaryCameras.length > 0) {
      const selectedSet = new Set(selectedFilters.primaryCameras)
      products = products.filter((product) => selectedSet.has(product.dummySpec.primaryCamera))
    }

    if (selectedFilters.voiceCallingValues.length > 0) {
      const selectedSet = new Set(selectedFilters.voiceCallingValues)
      products = products.filter((product) => selectedSet.has(product.dummySpec.voiceCallingFacility))
    }

    if (selectedFilters.discountBuckets.length > 0) {
      const selectedSet = new Set(selectedFilters.discountBuckets)
      products = products.filter((product) => selectedSet.has(product.dummySpec.discountBucket))
    }

    products = products.filter((product) => {
      const inrPrice = (Number(product.price) || 0) * 83
      return inrPrice <= maxPriceFilter
    })

    if (minRatingFilter > 0) {
      products = products.filter((product) => (Number(product.rating) || 0) >= minRatingFilter)
    }

    if (sortBy === 'price-low-to-high') {
      products.sort((first, second) => Number(first.price) - Number(second.price))
    }

    if (sortBy === 'price-high-to-low') {
      products.sort((first, second) => Number(second.price) - Number(first.price))
    }

    if (sortBy === 'rating-high-to-low') {
      products.sort((first, second) => Number(second.rating) - Number(first.rating))
    }

    return products
  }, [enrichedResults, maxPriceFilter, minRatingFilter, selectedFilters, sortBy])

  const toggleSection = (key) => {
    setExpandedSections((previousValues) => ({
      ...previousValues,
      [key]: !previousValues[key],
    }))
  }

  const toggleSelectionFor = (value, filterKey) => {
    setSelectedFilters((previousValues) => {
      const existing = previousValues[filterKey] || []
      const hasValue = existing.includes(value)

      return {
        ...previousValues,
        [filterKey]: hasValue
          ? existing.filter((item) => item !== value)
          : [...existing, value],
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters(INITIAL_SELECTED_FILTERS)
    setMaxPriceFilter(maxAvailablePrice)
    setMinRatingFilter(0)
    setSortBy('relevance')
  }

  const countBy = (items, accessor) => {
    return items.reduce((counts, item) => {
      const value = accessor(item)

      if (!value) {
        return counts
      }

      return {
        ...counts,
        [value]: (counts[value] || 0) + 1,
      }
    }, {})
  }

  const dynamicCountSource = filteredResults.length > 0 ? filteredResults : enrichedResults

  const categoryCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.category), [dynamicCountSource])
  const brandCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.brand), [dynamicCountSource])
  const operatingSystemCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.operatingSystem), [dynamicCountSource])
  const displayCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.display), [dynamicCountSource])
  const batteryCapacityCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.batteryCapacity), [dynamicCountSource])
  const processorClockSpeedCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.processorClockSpeed), [dynamicCountSource])
  const primaryCameraCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.primaryCamera), [dynamicCountSource])
  const voiceCallingCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.voiceCallingFacility), [dynamicCountSource])
  const discountBucketCountMap = useMemo(() => countBy(dynamicCountSource, (product) => product.dummySpec.discountBucket), [dynamicCountSource])

  return (
    <section className='space-y-4'>
      <SearchResultsHeader query={searchQuery} resultCount={filteredResults.length} />

      <div className='grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]'>
        <SearchFiltersPanel
          allCategories={allCategories}
          allBrands={allBrands}
          allOperatingSystems={allOperatingSystems}
          allDisplaySizes={allDisplaySizes}
          allBatteryCapacities={allBatteryCapacities}
          allProcessorClockSpeeds={allProcessorClockSpeeds}
          allPrimaryCameras={allPrimaryCameras}
          allVoiceCallingValues={allVoiceCallingValues}
          allDiscountBuckets={allDiscountBuckets}
          categoryCountMap={categoryCountMap}
          brandCountMap={brandCountMap}
          operatingSystemCountMap={operatingSystemCountMap}
          displayCountMap={displayCountMap}
          batteryCapacityCountMap={batteryCapacityCountMap}
          processorClockSpeedCountMap={processorClockSpeedCountMap}
          primaryCameraCountMap={primaryCameraCountMap}
          voiceCallingCountMap={voiceCallingCountMap}
          discountBucketCountMap={discountBucketCountMap}
          selectedCategories={selectedFilters.categories}
          selectedBrands={selectedFilters.brands}
          selectedOperatingSystems={selectedFilters.operatingSystems}
          selectedDisplays={selectedFilters.displays}
          selectedBatteryCapacities={selectedFilters.batteryCapacities}
          selectedProcessorClockSpeeds={selectedFilters.processorClockSpeeds}
          selectedPrimaryCameras={selectedFilters.primaryCameras}
          selectedVoiceCallingValues={selectedFilters.voiceCallingValues}
          selectedDiscountBuckets={selectedFilters.discountBuckets}
          minRatingFilter={minRatingFilter}
          maxPriceFilter={maxPriceFilter}
          maxAvailablePrice={maxAvailablePrice}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          onToggleSelection={toggleSelectionFor}
          onMinRatingChange={setMinRatingFilter}
          onMaxPriceChange={setMaxPriceFilter}
          onClearFilters={clearFilters}
        />

        <div className='space-y-3'>
          <SearchSortBar sortBy={sortBy} onSortByChange={setSortBy} />

          {isLoading && (
            <div className='rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm'>
              Loading products...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className='rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm'>
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && filteredResults.length === 0 && (
            <div className='rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm'>
              No products found for this search/filter combination.
            </div>
          )}

          {!isLoading && !errorMessage && (
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {filteredResults.map((product) => (
                <ProductResultCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchResults
