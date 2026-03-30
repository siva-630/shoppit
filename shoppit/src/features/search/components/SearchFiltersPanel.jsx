import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import FilterSection from './FilterSection'
import { formatCurrencyFromUsd } from '../utils/searchSpecs'

// Filter sidebar container for search page.
// Receives all values/state from parent to keep logic centralized.
const SearchFiltersPanel = ({
  allCategories,
  allBrands,
  allOperatingSystems,
  allDisplaySizes,
  allBatteryCapacities,
  allProcessorClockSpeeds,
  allPrimaryCameras,
  allVoiceCallingValues,
  allDiscountBuckets,
  categoryCountMap,
  brandCountMap,
  operatingSystemCountMap,
  displayCountMap,
  batteryCapacityCountMap,
  processorClockSpeedCountMap,
  primaryCameraCountMap,
  voiceCallingCountMap,
  discountBucketCountMap,
  selectedCategories,
  selectedBrands,
  selectedOperatingSystems,
  selectedDisplays,
  selectedBatteryCapacities,
  selectedProcessorClockSpeeds,
  selectedPrimaryCameras,
  selectedVoiceCallingValues,
  selectedDiscountBuckets,
  minRatingFilter,
  maxPriceFilter,
  maxAvailablePrice,
  expandedSections,
  onToggleSection,
  onToggleSelection,
  onMinRatingChange,
  onMaxPriceChange,
  onClearFilters,
}) => {
  return (
    <aside className='h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-900'>Filters</h2>
        <button
          type='button'
          onClick={onClearFilters}
          className='text-sm font-medium text-orange-600 hover:text-orange-700'
        >
          Clear
        </button>
      </div>

      <div className='space-y-4'>
        <FilterSection
          title='Categories'
          expanded={expandedSections.categories}
          onToggle={() => onToggleSection('categories')}
          options={allCategories}
          optionCountMap={categoryCountMap}
          selectedValues={selectedCategories}
          onToggleValue={(value) => onToggleSelection(value, 'categories')}
          emptyMessage='No categories available.'
        />

        <FilterSection
          title='Brand'
          expanded={expandedSections.brand}
          onToggle={() => onToggleSection('brand')}
          options={allBrands}
          optionCountMap={brandCountMap}
          selectedValues={selectedBrands}
          onToggleValue={(value) => onToggleSelection(value, 'brands')}
          emptyMessage='No brands available.'
        />

        <FilterSection
          title='Operating System'
          expanded={expandedSections.operatingSystem}
          onToggle={() => onToggleSection('operatingSystem')}
          options={allOperatingSystems}
          optionCountMap={operatingSystemCountMap}
          selectedValues={selectedOperatingSystems}
          onToggleValue={(value) => onToggleSelection(value, 'operatingSystems')}
          emptyMessage='No OS data available.'
        />

        <FilterSection
          title='Display'
          expanded={expandedSections.display}
          onToggle={() => onToggleSection('display')}
          options={allDisplaySizes}
          optionCountMap={displayCountMap}
          selectedValues={selectedDisplays}
          onToggleValue={(value) => onToggleSelection(value, 'displays')}
          emptyMessage='No display data available.'
        />

        <div className='border-b border-gray-200 pb-3'>
          <button
            type='button'
            onClick={() => onToggleSection('customerRatings')}
            className='flex w-full items-center justify-between py-1 text-left text-base font-semibold uppercase tracking-wide text-gray-800'
          >
            <span>Customer Ratings</span>
            {expandedSections.customerRatings ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
          </button>

          {expandedSections.customerRatings && (
            <select
              value={minRatingFilter}
              onChange={(event) => onMinRatingChange(Number(event.target.value))}
              className='mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20'
            >
              <option value={0}>All ratings</option>
              <option value={4}>4★ & above</option>
              <option value={3}>3★ & above</option>
              <option value={2}>2★ & above</option>
            </select>
          )}
        </div>

        <FilterSection
          title='Battery Capacity'
          expanded={expandedSections.batteryCapacity}
          onToggle={() => onToggleSection('batteryCapacity')}
          options={allBatteryCapacities}
          optionCountMap={batteryCapacityCountMap}
          selectedValues={selectedBatteryCapacities}
          onToggleValue={(value) => onToggleSelection(value, 'batteryCapacities')}
          emptyMessage='No battery data available.'
        />

        <FilterSection
          title='Processor Clock Speed'
          expanded={expandedSections.processorClockSpeed}
          onToggle={() => onToggleSection('processorClockSpeed')}
          options={allProcessorClockSpeeds}
          optionCountMap={processorClockSpeedCountMap}
          selectedValues={selectedProcessorClockSpeeds}
          onToggleValue={(value) => onToggleSelection(value, 'processorClockSpeeds')}
          emptyMessage='No processor data available.'
        />

        <FilterSection
          title='Primary Camera'
          expanded={expandedSections.primaryCamera}
          onToggle={() => onToggleSection('primaryCamera')}
          options={allPrimaryCameras}
          optionCountMap={primaryCameraCountMap}
          selectedValues={selectedPrimaryCameras}
          onToggleValue={(value) => onToggleSelection(value, 'primaryCameras')}
          emptyMessage='No camera data available.'
        />

        <FilterSection
          title='Voice Calling Facility'
          expanded={expandedSections.voiceCallingFacility}
          onToggle={() => onToggleSection('voiceCallingFacility')}
          options={allVoiceCallingValues}
          optionCountMap={voiceCallingCountMap}
          selectedValues={selectedVoiceCallingValues}
          onToggleValue={(value) => onToggleSelection(value, 'voiceCallingValues')}
          emptyMessage='No voice calling data available.'
        />

        <FilterSection
          title='Discount'
          expanded={expandedSections.discount}
          onToggle={() => onToggleSection('discount')}
          options={allDiscountBuckets}
          optionCountMap={discountBucketCountMap}
          selectedValues={selectedDiscountBuckets}
          onToggleValue={(value) => onToggleSelection(value, 'discountBuckets')}
          emptyMessage='No discount data available.'
        />

        <div>
          <p className='mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500'>Price</p>
          <input
            type='range'
            min={1000}
            max={maxAvailablePrice}
            step={500}
            value={Math.min(maxPriceFilter, maxAvailablePrice)}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className='w-full accent-orange-500'
          />
          <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
            <span>Min ₹1,000</span>
            <span>Max {formatCurrencyFromUsd(maxPriceFilter / 83)}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SearchFiltersPanel
