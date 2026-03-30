import {
  BATTERY_OPTIONS,
  DISPLAY_OPTIONS,
  DISCOUNT_BUCKETS,
  OPERATING_SYSTEM_OPTIONS,
  PRIMARY_CAMERA_OPTIONS,
  PROCESSOR_CLOCK_OPTIONS,
  VOICE_CALLING_OPTIONS,
} from '../constants/filterOptions'

// Converts a numeric amount to INR display style.
// Input is treated as USD-like source (from DummyJSON) and mapped to INR.
export const formatCurrencyFromUsd = (amount) => {
  const numericAmount = Number(amount) || 0
  const inrValue = Math.max(99, Math.round(numericAmount * 83))

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrValue)
}

// Creates deterministic, stable mock specs based on product id.
// This ensures filters always map to consistent values for each product.
export const getDeterministicSpec = (product) => {
  const seed = Number(product?.id) || 1
  const discountValue = Math.max(0, Math.round(Number(product?.discountPercentage) || 0))

  let discountBucket = '0-9%'

  if (discountValue >= 30) {
    discountBucket = '30%+'
  } else if (discountValue >= 20) {
    discountBucket = '20-29%'
  } else if (discountValue >= 10) {
    discountBucket = '10-19%'
  }

  return {
    operatingSystem: OPERATING_SYSTEM_OPTIONS[seed % OPERATING_SYSTEM_OPTIONS.length],
    display: DISPLAY_OPTIONS[seed % DISPLAY_OPTIONS.length],
    batteryCapacity: BATTERY_OPTIONS[seed % BATTERY_OPTIONS.length],
    processorClockSpeed: PROCESSOR_CLOCK_OPTIONS[seed % PROCESSOR_CLOCK_OPTIONS.length],
    primaryCamera: PRIMARY_CAMERA_OPTIONS[seed % PRIMARY_CAMERA_OPTIONS.length],
    voiceCallingFacility: VOICE_CALLING_OPTIONS[seed % VOICE_CALLING_OPTIONS.length],
    discountBucket,
  }
}

export const enrichProductsWithSpecs = (products) => {
  return products.map((product) => ({
    ...product,
    dummySpec: getDeterministicSpec(product),
  }))
}

export const getSortedUniqueValues = (values) => {
  return Array.from(new Set(values.filter(Boolean))).sort()
}

export const getAvailableDiscountBuckets = (enrichedProducts) => {
  const foundBuckets = new Set(enrichedProducts.map((product) => product.dummySpec.discountBucket))
  return DISCOUNT_BUCKETS.filter((bucket) => foundBuckets.has(bucket))
}
