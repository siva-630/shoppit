const DUMMY_JSON_BASE_URL = 'https://dummyjson.com'

export const MAX_SLIDES = 5
const MAX_SUGGESTIONS = 10
const FOR_YOU_SUGGESTION_LIMIT = 12
const FASHION_SMALL_CARDS_LIMIT = 20
const FASHION_PRICE_COLLECTION_LIMIT = 5
const WEDDING_STYLE_SHOWCASE_LIMIT = 14
const OCCASION_SPECIFIC_COLLECTION_LIMIT = 5
const MOBILE_TOP_DEALS_LIMIT = 5
const PREMIUM_SMARTPHONE_DEALS_LIMIT = 10
const MOBILE_RANGE_DEALS_LIMIT = 6
const BEAUTY_LAUNCH_PARTY_LIMIT = 6
const SKINCARE_CIRCLE_ITEMS_LIMIT = 8
const BEAUTY_MINI_CARDS_LIMIT = 18

const BEAUTY_MINI_CARD_CONFIG = [
  { label: 'Global Scents', icon: 'sparkles', categorySlug: 'fragrances' },
  { label: 'Skincare', icon: 'droplets', categorySlug: 'skin-care' },
  { label: 'Hair Care', icon: 'scissors', categorySlug: 'beauty' },
  { label: 'Body Care', icon: 'heart', categorySlug: 'skin-care' },
  { label: 'Derma', icon: 'shield', categorySlug: 'skin-care' },
  { label: 'Oral Care', icon: 'smile', categorySlug: 'beauty' },
  { label: 'K-Beauty', icon: 'star', categorySlug: 'beauty' },
  { label: 'Gifting', icon: 'gift', categorySlug: 'fragrances' },
  { label: 'Beauty Supp.', icon: 'pill', categorySlug: 'beauty' },
  { label: 'Perfumes', icon: 'sparkles', categorySlug: 'fragrances' },
  { label: 'Eye', icon: 'eye', categorySlug: 'beauty' },
  { label: 'Deos', icon: 'spray', categorySlug: 'fragrances' },
  { label: 'Bath & Spa', icon: 'bath', categorySlug: 'skin-care' },
  { label: 'Hygiene', icon: 'shield', categorySlug: 'beauty' },
  { label: 'Grooming', icon: 'ribbon', categorySlug: 'beauty' },
  { label: 'Premium', icon: 'crown', categorySlug: 'fragrances' },
  { label: 'Face Makeup', icon: 'palette', categorySlug: 'beauty' },
  { label: 'Lip', icon: 'heart', categorySlug: 'beauty' },
]

const OCCASION_SPECIFIC_CONFIG = [
  { label: 'Office', caption: 'Polished picks', categorySlug: 'mens-shirts', productIndex: 0 },
  { label: 'Vacation', caption: 'Resort-ready looks', categorySlug: 'womens-dresses', productIndex: 0 },
  { label: 'Festive', caption: 'Celebration edits', categorySlug: 'tops', productIndex: 1 },
  { label: 'Casual', caption: 'Everyday comfort', categorySlug: 'mens-shoes', productIndex: 0 },
  { label: 'Party', caption: 'Evening glam', categorySlug: 'womens-shoes', productIndex: 0 },
]

const WEDDING_STYLE_SHOWCASE_CONFIG = [
  { label: 'Embroidered Kurtas', promoText: 'From ₹499', categorySlug: 'mens-shirts', productIndex: 0 },
  { label: "Kids' Ethnic Sets", promoText: 'From ₹249', categorySlug: 'tops', productIndex: 0 },
  { label: 'Kolhapuri Chappals', promoText: 'From ₹219', categorySlug: 'mens-shoes', productIndex: 0 },
  { label: 'Wedding Kurtas', promoText: 'Min. 70% Off', categorySlug: 'mens-shirts', productIndex: 1 },
  { label: "Kids Dhoti Sets", promoText: 'From ₹299', categorySlug: 'tops', productIndex: 1 },
  { label: 'Elegant Ethnics', promoText: 'New Season', categorySlug: 'mens-shirts', productIndex: 2 },
  { label: 'Gold Braided Watches', promoText: 'Up to 80% Off', categorySlug: 'mens-shoes', productIndex: 1 },
  { label: 'Bandhani Kurtas', promoText: 'From ₹299', categorySlug: 'mens-shirts', productIndex: 3 },
  { label: 'Shaded Kurtas', promoText: 'Min. 50% Off', categorySlug: 'mens-shirts', productIndex: 4 },
  { label: 'Pastel Shirts', promoText: 'From ₹399', categorySlug: 'mens-shirts', productIndex: 0 },
  { label: 'Festive Saree Picks', promoText: 'From ₹699', categorySlug: 'womens-dresses', productIndex: 0 },
  { label: 'Wedding Heels', promoText: 'From ₹449', categorySlug: 'womens-shoes', productIndex: 0 },
  { label: 'Ethnic Clutches', promoText: 'From ₹349', categorySlug: 'womens-bags', productIndex: 0 },
  { label: 'Statement Jewellery', promoText: 'From ₹299', categorySlug: 'womens-jewellery', productIndex: 0 },
]

const FASHION_REFERENCE_TYPE_CONFIG = [
  { label: 'Menswear', audience: 'men', categorySlug: 'mens-shirts', productIndex: 0 },
  { label: 'Men Casual Shirts', audience: 'men', categorySlug: 'mens-shirts', productIndex: 1 },
  { label: 'Men Streetwear', audience: 'men', categorySlug: 'mens-shirts', productIndex: 2 },
  { label: 'Men Formal Look', audience: 'men', categorySlug: 'mens-shirts', productIndex: 3 },
  { label: 'Men Shoes', audience: 'men', categorySlug: 'mens-shoes', productIndex: 0 },
  { label: 'Men Sneakers', audience: 'men', categorySlug: 'mens-shoes', productIndex: 1 },
  { label: 'Women Dresses', audience: 'women', categorySlug: 'womens-dresses', productIndex: 0 },
  { label: 'Western Dresses', audience: 'women', categorySlug: 'womens-dresses', productIndex: 1 },
  { label: 'Ethnic Dresses', audience: 'women', categorySlug: 'womens-dresses', productIndex: 2 },
  { label: 'Women Tops', audience: 'women', categorySlug: 'tops', productIndex: 0 },
  { label: 'Women Casual Tops', audience: 'women', categorySlug: 'tops', productIndex: 1 },
  { label: 'Women Shoes', audience: 'women', categorySlug: 'womens-shoes', productIndex: 0 },
  { label: 'Women Heels', audience: 'women', categorySlug: 'womens-shoes', productIndex: 1 },
  { label: 'Women Bags', audience: 'women', categorySlug: 'womens-bags', productIndex: 0 },
  { label: 'Handbags', audience: 'women', categorySlug: 'womens-bags', productIndex: 1 },
  { label: 'Jewellery', audience: 'women', categorySlug: 'womens-jewellery', productIndex: 0 },
  { label: 'Sunglasses', audience: 'unisex', categorySlug: 'sunglasses', productIndex: 0 },
  { label: 'Unisex Shades', audience: 'unisex', categorySlug: 'sunglasses', productIndex: 1 },
]

const FASHION_REFERENCE_TYPES_LIMIT = FASHION_REFERENCE_TYPE_CONFIG.length

const ROUTE_PRODUCT_SOURCES = {
  '/products/fashion': {
    categorySlugs: ['mens-shirts', 'womens-dresses', 'tops', 'mens-shoes', 'womens-shoes'],
  },
  '/products/mobiles': {
    categorySlugs: ['smartphones', 'mobile-accessories', 'tablets'],
  },
  '/products/beauty': {
    categorySlugs: ['beauty', 'skin-care', 'fragrances'],
  },
  '/products/electronics': {
    categorySlugs: ['smartphones', 'laptops', 'tablets'],
  },
  '/products/home': {
    categorySlugs: ['home-decoration', 'kitchen-accessories', 'furniture'],
  },
  '/products/appliances': {
    categorySlugs: ['kitchen-accessories', 'home-decoration'],
  },
  '/products/toys-baby': {
    searchTerms: ['toy', 'baby'],
    fallbackCategories: ['tops', 'sports-accessories'],
  },
  '/products/food-health': {
    categorySlugs: ['groceries'],
  },
  '/products/auto-accessories': {
    categorySlugs: ['vehicle', 'motorcycle'],
  },
  '/products/two-wheelers': {
    categorySlugs: ['motorcycle'],
  },
  '/products/sports-fitness': {
    categorySlugs: ['sports-accessories'],
  },
  '/products/books-more': {
    searchTerms: ['book'],
    fallbackCategories: ['laptops'],
  },
  '/products/furniture': {
    categorySlugs: ['furniture'],
  },
}

const mapProducts = (data) => (Array.isArray(data?.products) ? data.products : [])

const dedupeProducts = (products) => {
  const seen = new Set()

  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false
    }

    seen.add(product.id)
    return true
  })
}

const fetchCategoryProducts = async (categorySlug, signal) => {
  const response = await fetch(
    `${DUMMY_JSON_BASE_URL}/products/category/${encodeURIComponent(categorySlug)}?limit=${MAX_SLIDES}`,
    { signal },
  )

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return mapProducts(data)
}

const fetchSearchProducts = async (query, signal, limit = MAX_SLIDES) => {
  const response = await fetch(
    `${DUMMY_JSON_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    { signal },
  )

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return mapProducts(data)
}

const fetchDefaultProducts = async (signal) => {
  const response = await fetch(`${DUMMY_JSON_BASE_URL}/products?limit=${MAX_SLIDES}`, { signal })

  if (!response.ok) {
    throw new Error('Unable to fetch products from DummyJSON')
  }

  const data = await response.json()
  return mapProducts(data)
}

export const fetchAllProductsPage = async ({ limit = 18, skip = 0, signal } = {}) => {
  const response = await fetch(
    `${DUMMY_JSON_BASE_URL}/products?limit=${limit}&skip=${skip}`,
    { signal },
  )

  if (!response.ok) {
    throw new Error('Unable to fetch all products from DummyJSON')
  }

  const data = await response.json()

  return {
    products: mapProducts(data),
    total: Number(data?.total) || 0,
    skip: Number(data?.skip) || skip,
    limit: Number(data?.limit) || limit,
  }
}

export const fetchSearchSuggestions = async (query, signal, limit = 8) => {
  const normalizedQuery = String(query || '').trim()

  if (!normalizedQuery) {
    return []
  }

  const products = await fetchSearchProducts(normalizedQuery, signal, limit)

  return products.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    thumbnail: product.thumbnail || product.images?.[0] || '',
  }))
}

export const fetchProductsBySearchQuery = async (query, signal, limit = 100) => {
  const normalizedQuery = String(query || '').trim()

  if (!normalizedQuery) {
    return []
  }

  return fetchSearchProducts(normalizedQuery, signal, limit)
}

export const fetchProductById = async (productId, signal) => {
  const normalizedId = Number(productId)

  if (!Number.isFinite(normalizedId) || normalizedId <= 0) {
    throw new Error('Invalid product id')
  }

  const response = await fetch(`${DUMMY_JSON_BASE_URL}/products/${normalizedId}`, { signal })

  if (!response.ok) {
    throw new Error('Unable to fetch product details')
  }

  return response.json()
}

export const fetchProductsForRoute = async (pathname, signal) => {
  const routeSource = ROUTE_PRODUCT_SOURCES[pathname]

  if (!routeSource) {
    return fetchDefaultProducts(signal)
  }

  let products = []

  if (routeSource.categorySlugs?.length) {
    for (const slug of routeSource.categorySlugs) {
      const categoryProducts = await fetchCategoryProducts(slug, signal)
      products = dedupeProducts([...products, ...categoryProducts])

      if (products.length >= MAX_SLIDES) {
        break
      }
    }
  }

  if (products.length < MAX_SLIDES && routeSource.searchTerms?.length) {
    for (const term of routeSource.searchTerms) {
      const searchProducts = await fetchSearchProducts(term, signal)
      products = dedupeProducts([...products, ...searchProducts])

      if (products.length >= MAX_SLIDES) {
        break
      }
    }
  }

  if (products.length < MAX_SLIDES && routeSource.fallbackCategories?.length) {
    for (const slug of routeSource.fallbackCategories) {
      const categoryProducts = await fetchCategoryProducts(slug, signal)
      products = dedupeProducts([...products, ...categoryProducts])

      if (products.length >= MAX_SLIDES) {
        break
      }
    }
  }

  if (products.length === 0) {
    return fetchDefaultProducts(signal)
  }

  return products.slice(0, MAX_SLIDES)
}

export const mapProductsToSlides = (products, pathname) => {
  if (!Array.isArray(products)) {
    return []
  }

  return products.slice(0, MAX_SLIDES).map((product, index) => ({
    id: `${product.id}-${pathname}-${index}`,
    image: product.thumbnail || product.images?.[0],
    alt: product.title,
    title: product.title,
    category: product.category,
    price: product.price,
  }))
}

export const fetchForYouSuggestions = async (signal) => {
  const terms = ['pants', 'jeans', 'trousers']
  let suggestions = []

  for (const term of terms) {
    const searchResults = await fetchSearchProducts(term, signal, FOR_YOU_SUGGESTION_LIMIT)
    suggestions = dedupeProducts([...suggestions, ...searchResults])

    if (suggestions.length >= FOR_YOU_SUGGESTION_LIMIT) {
      break
    }
  }

  const pantsOnlySuggestions = suggestions.filter((product) => {
    const searchableText = `${product.title ?? ''} ${product.description ?? ''}`.toLowerCase()
    return /pants|jeans|trouser/.test(searchableText)
  })

  if (pantsOnlySuggestions.length > 0) {
    return pantsOnlySuggestions.slice(0, MAX_SUGGESTIONS)
  }

  const fashionFallback = await Promise.all([
    fetchCategoryProducts('mens-shirts', signal),
    fetchCategoryProducts('tops', signal),
    fetchCategoryProducts('womens-dresses', signal),
  ])

  return dedupeProducts(fashionFallback.flat()).slice(0, MAX_SUGGESTIONS)
}

export const fetchPreviousOrders = async (signal) => {
  const terms = ['shirt', 'shoes', 'watch', 'bag']
  let results = []

  for (const term of terms) {
    const searchResults = await fetchSearchProducts(term, signal, MAX_SLIDES)
    results = dedupeProducts([...results, ...searchResults])

    if (results.length >= MAX_SLIDES) {
      break
    }
  }

  if (results.length > 0) {
    return results.slice(0, MAX_SLIDES)
  }

  return fetchDefaultProducts(signal)
}

export const fetchFashionSmallCards = async (signal) => {
  const fashionCategorySlugs = [
    'mens-shirts',
    'womens-dresses',
    'tops',
    'mens-shoes',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
  ]

  let products = []

  for (const slug of fashionCategorySlugs) {
    const categoryProducts = await fetchCategoryProducts(slug, signal)
    products = dedupeProducts([...products, ...categoryProducts])

    if (products.length >= FASHION_SMALL_CARDS_LIMIT) {
      break
    }
  }

  if (products.length === 0) {
    const fallbackProducts = await fetchDefaultProducts(signal)
    return dedupeProducts(fallbackProducts).slice(0, FASHION_SMALL_CARDS_LIMIT)
  }

  return products.slice(0, FASHION_SMALL_CARDS_LIMIT)
}

export const fetchFashionReferenceTypes = async (signal) => {
  const categoryResults = await Promise.all(
    FASHION_REFERENCE_TYPE_CONFIG.map((item) => fetchCategoryProducts(item.categorySlug, signal)),
  )

  const fallbackProducts = await fetchAllProductsPage({
    limit: FASHION_REFERENCE_TYPES_LIMIT,
    skip: 0,
    signal,
  })

  return FASHION_REFERENCE_TYPE_CONFIG.map((item, index) => {
    const preferredIndex = Number.isInteger(item.productIndex) ? item.productIndex : 0
    const categoryProduct = categoryResults[index]?.[preferredIndex] ?? categoryResults[index]?.[0]
    const fallbackProduct = fallbackProducts.products?.[index]
    const selectedProduct = categoryProduct ?? fallbackProduct

    return {
      id: `${item.categorySlug}-${index}`,
      label: item.label,
      audience: item.audience,
      image: selectedProduct?.thumbnail || selectedProduct?.images?.[0] || '',
      alt: selectedProduct?.title || item.label,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchFashionPriceCollections = async (signal) => {
  const fashionCategorySlugs = [
    'womens-dresses',
    'tops',
    'mens-shirts',
    'mens-shoes',
    'womens-shoes',
    'womens-bags',
    'sunglasses',
  ]

  const categoryResults = await Promise.all(
    fashionCategorySlugs.map((slug) => fetchCategoryProducts(slug, signal)),
  )

  let products = dedupeProducts(categoryResults.flat()).filter(
    (product) => Number.isFinite(Number(product?.price)),
  )

  if (products.length < FASHION_PRICE_COLLECTION_LIMIT) {
    const fallbackProducts = await fetchAllProductsPage({
      limit: 20,
      skip: 0,
      signal,
    })

    products = dedupeProducts([...products, ...(fallbackProducts.products || [])]).filter(
      (product) => Number.isFinite(Number(product?.price)),
    )
  }

  const sortedByPrice = [...products].sort((first, second) => Number(first.price) - Number(second.price))

  return sortedByPrice.slice(0, FASHION_PRICE_COLLECTION_LIMIT).map((product, index) => {
    const inrValue = Number(product.price) * 83
    const roundedPriceCap = Math.max(299, Math.ceil(inrValue / 100) * 100)

    return {
      id: `price-collection-${product.id}-${index}`,
      title: product.title,
      image: product.thumbnail || product.images?.[0] || '',
      priceCap: roundedPriceCap,
      category: product.category,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchWeddingStyleShowcase = async (signal) => {
  const categoryResults = await Promise.all(
    WEDDING_STYLE_SHOWCASE_CONFIG.map((item) => fetchCategoryProducts(item.categorySlug, signal)),
  )

  const fallbackProducts = await fetchAllProductsPage({
    limit: WEDDING_STYLE_SHOWCASE_LIMIT,
    skip: 0,
    signal,
  })

  return WEDDING_STYLE_SHOWCASE_CONFIG.map((item, index) => {
    const preferredIndex = Number.isInteger(item.productIndex) ? item.productIndex : 0
    const categoryProduct = categoryResults[index]?.[preferredIndex] ?? categoryResults[index]?.[0]
    const fallbackProduct = fallbackProducts.products?.[index]
    const selectedProduct = categoryProduct ?? fallbackProduct

    return {
      id: `wedding-style-${item.categorySlug}-${index}`,
      label: item.label,
      promoText: item.promoText,
      image: selectedProduct?.thumbnail || selectedProduct?.images?.[0] || '',
      alt: selectedProduct?.title || item.label,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchOccasionSpecificCollections = async (signal) => {
  const categoryResults = await Promise.all(
    OCCASION_SPECIFIC_CONFIG.map((item) => fetchCategoryProducts(item.categorySlug, signal)),
  )

  const fallbackProducts = await fetchAllProductsPage({
    limit: OCCASION_SPECIFIC_COLLECTION_LIMIT,
    skip: 0,
    signal,
  })

  return OCCASION_SPECIFIC_CONFIG.map((item, index) => {
    const preferredIndex = Number.isInteger(item.productIndex) ? item.productIndex : 0
    const categoryProduct = categoryResults[index]?.[preferredIndex] ?? categoryResults[index]?.[0]
    const fallbackProduct = fallbackProducts.products?.[index]
    const selectedProduct = categoryProduct ?? fallbackProduct

    return {
      id: `occasion-${item.categorySlug}-${index}`,
      label: item.label,
      caption: item.caption,
      image: selectedProduct?.thumbnail || selectedProduct?.images?.[0] || '',
      alt: selectedProduct?.title || item.label,
    }
  }).slice(0, OCCASION_SPECIFIC_COLLECTION_LIMIT)
}

export const fetchMobileBrands = async (signal) => {
  const mobileCategorySlugs = ['smartphones', 'mobile-accessories', 'tablets']

  const categoryResults = await Promise.all(
    mobileCategorySlugs.map((slug) => fetchCategoryProducts(slug, signal)),
  )

  const mergedProducts = dedupeProducts(categoryResults.flat())
  const brandMap = new Map()

  mergedProducts.forEach((product) => {
    const brandName = String(product?.brand || '').trim()

    if (!brandName) {
      return
    }

    const normalizedBrand = brandName.toLowerCase()

    if (brandMap.has(normalizedBrand)) {
      return
    }

    brandMap.set(normalizedBrand, {
      id: `mobile-brand-${normalizedBrand.replace(/\s+/g, '-')}`,
      label: brandName,
      image: product.thumbnail || product.images?.[0] || '',
      alt: `${brandName} phones`,
    })
  })

  if (brandMap.size < 5) {
    const fallbackProducts = await fetchAllProductsPage({
      limit: 40,
      skip: 0,
      signal,
    })

    fallbackProducts.products.forEach((product) => {
      const brandName = String(product?.brand || '').trim()
      const searchableText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()

      if (!brandName || !/phone|mobile|tablet|smartphone|accessor/.test(searchableText)) {
        return
      }

      const normalizedBrand = brandName.toLowerCase()

      if (brandMap.has(normalizedBrand)) {
        return
      }

      brandMap.set(normalizedBrand, {
        id: `mobile-brand-${normalizedBrand.replace(/\s+/g, '-')}`,
        label: brandName,
        image: product.thumbnail || product.images?.[0] || '',
        alt: `${brandName} phones`,
      })
    })
  }

  const fallbackBrands = ['iPhone', 'Motorola', 'Vivo', 'OPPO', 'Samsung']

  fallbackBrands.forEach((brand) => {
    const normalizedBrand = brand.toLowerCase()

    if (brandMap.has(normalizedBrand)) {
      return
    }

    brandMap.set(normalizedBrand, {
      id: `mobile-brand-${normalizedBrand}`,
      label: brand,
      image: '',
      alt: `${brand} phones`,
    })
  })

  return Array.from(brandMap.values()).sort((first, second) => first.label.localeCompare(second.label))
}

export const fetchMobileTopDeals = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('smartphones', signal),
    fetchCategoryProducts('mobile-accessories', signal),
  ])

  let deals = dedupeProducts(categoryResults.flat()).filter((product) => {
    const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
    return /phone|mobile|smartphone/.test(searchText)
  })

  if (deals.length < MOBILE_TOP_DEALS_LIMIT) {
    const searchFallback = await fetchSearchProducts('smartphone', signal, 20)
    deals = dedupeProducts([...deals, ...searchFallback])
  }

  if (deals.length < MOBILE_TOP_DEALS_LIMIT) {
    const allProductsFallback = await fetchAllProductsPage({
      limit: 50,
      skip: 0,
      signal,
    })

    const phoneOnlyFallback = (allProductsFallback.products || []).filter((product) => {
      const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
      return /phone|mobile|smartphone/.test(searchText)
    })

    deals = dedupeProducts([...deals, ...phoneOnlyFallback])
  }

  const sortedDeals = [...deals].sort((first, second) => {
    const firstDiscount = Number(first?.discountPercentage) || 0
    const secondDiscount = Number(second?.discountPercentage) || 0
    return secondDiscount - firstDiscount
  })

  return sortedDeals.slice(0, MOBILE_TOP_DEALS_LIMIT).map((product, index) => {
    const inrBasePrice = Number(product.price) * 83
    const roundedDealPrice = Math.max(6999, Math.round(inrBasePrice / 100) * 100)

    return {
      id: `mobile-top-deal-${product.id}-${index}`,
      title: product.title,
      image: product.thumbnail || product.images?.[0] || '',
      priceText: `From ₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(roundedDealPrice)}`,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchPremiumSmartphoneDeals = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('smartphones', signal),
    fetchCategoryProducts('tablets', signal),
  ])

  let products = dedupeProducts(categoryResults.flat()).filter((product) => {
    const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
    return /phone|smartphone|galaxy|iphone|pixel|vivo|oppo|xiaomi|oneplus/.test(searchText)
  })

  if (products.length < PREMIUM_SMARTPHONE_DEALS_LIMIT) {
    const searchFallback = await fetchSearchProducts('premium smartphone', signal, 30)
    products = dedupeProducts([...products, ...searchFallback])
  }

  if (products.length < PREMIUM_SMARTPHONE_DEALS_LIMIT) {
    const pageOne = await fetchAllProductsPage({
      limit: 60,
      skip: 0,
      signal,
    })

    const pageTwo = await fetchAllProductsPage({
      limit: 60,
      skip: 60,
      signal,
    })

    const premiumFallback = [...(pageOne.products || []), ...(pageTwo.products || [])].filter((product) => {
      const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
      return /phone|smartphone|galaxy|iphone|pixel|vivo|oppo|xiaomi|oneplus/.test(searchText)
    })

    products = dedupeProducts([...products, ...premiumFallback])
  }

  const rankedDeals = [...products].sort((first, second) => {
    const firstScore = (Number(first?.rating) || 0) + (Number(first?.discountPercentage) || 0) / 10
    const secondScore = (Number(second?.rating) || 0) + (Number(second?.discountPercentage) || 0) / 10
    return secondScore - firstScore
  })

  return rankedDeals.slice(0, PREMIUM_SMARTPHONE_DEALS_LIMIT).map((product, index) => {
    const inrBasePrice = Number(product.price) * 83
    const roundedPrice = Math.max(29999, Math.round(inrBasePrice / 100) * 100)

    return {
      id: `premium-smartphone-deal-${product.id}-${index}`,
      title: product.title,
      image: product.thumbnail || product.images?.[0] || '',
      priceText: `From ₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(roundedPrice)}*`,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchMobileRangeDeals = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('smartphones', signal),
    fetchCategoryProducts('mobile-accessories', signal),
    fetchCategoryProducts('tablets', signal),
  ])

  let mobileProducts = dedupeProducts(categoryResults.flat()).filter((product) => {
    const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
    return /phone|mobile|smartphone|iphone|galaxy|vivo|oppo|oneplus|xiaomi|redmi|realme|pixel|nothing/.test(searchText)
  })

  if (mobileProducts.length < MOBILE_RANGE_DEALS_LIMIT * 2) {
    const searchFallback = await fetchSearchProducts('smartphone', signal, 40)
    mobileProducts = dedupeProducts([...mobileProducts, ...searchFallback])
  }

  if (mobileProducts.length < MOBILE_RANGE_DEALS_LIMIT * 2) {
    const pageOne = await fetchAllProductsPage({ limit: 80, skip: 0, signal })
    const pageTwo = await fetchAllProductsPage({ limit: 80, skip: 80, signal })

    const broaderFallback = [...(pageOne.products || []), ...(pageTwo.products || [])].filter((product) => {
      const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
      return /phone|mobile|smartphone|iphone|galaxy|vivo|oppo|oneplus|xiaomi|redmi|realme|pixel|nothing/.test(searchText)
    })

    mobileProducts = dedupeProducts([...mobileProducts, ...broaderFallback])
  }

  const rankedProducts = [...mobileProducts].sort((first, second) => {
    const firstScore = (Number(first?.rating) || 0) + (Number(first?.discountPercentage) || 0) / 8
    const secondScore = (Number(second?.rating) || 0) + (Number(second?.discountPercentage) || 0) / 8
    return secondScore - firstScore
  })

  const toDealCard = (product, index, bucket) => {
    const inrPrice = Math.max(6999, Math.round((Number(product?.price) * 83) / 100) * 100)
    const discount = Math.max(5, Math.round(Number(product?.discountPercentage) || 0))

    return {
      id: `${bucket}-deal-${product.id}-${index}`,
      title: product.title,
      image: product.thumbnail || product.images?.[0] || '',
      priceText: `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(inrPrice)}`,
      offerText: `${discount}% OFF`,
    }
  }

  const midRange = rankedProducts
    .filter((product) => {
      const inrPrice = Number(product?.price) * 83
      return inrPrice >= 20000 && inrPrice <= 45000
    })
    .slice(0, MOBILE_RANGE_DEALS_LIMIT)
    .map((product, index) => toDealCard(product, index, 'mid'))
    .filter((item) => Boolean(item.image))

  const budgetRange = rankedProducts
    .filter((product) => {
      const inrPrice = Number(product?.price) * 83
      return inrPrice < 20000
    })
    .slice(0, MOBILE_RANGE_DEALS_LIMIT)
    .map((product, index) => toDealCard(product, index, 'budget'))
    .filter((item) => Boolean(item.image))

  return { midRange, budgetRange }
}

export const fetchBeautyLaunchPartyDeals = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('fragrances', signal),
    fetchCategoryProducts('beauty', signal),
    fetchCategoryProducts('skin-care', signal),
  ])

  let products = dedupeProducts(categoryResults.flat()).filter((product) => {
    const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
    return /perfume|fragrance|serum|cream|beauty|skin|care|makeup/.test(searchText)
  })

  if (products.length < BEAUTY_LAUNCH_PARTY_LIMIT) {
    const searchFallback = await fetchSearchProducts('perfume serum beauty', signal, 24)
    products = dedupeProducts([...products, ...searchFallback])
  }

  if (products.length < BEAUTY_LAUNCH_PARTY_LIMIT) {
    const page = await fetchAllProductsPage({ limit: 60, skip: 0, signal })
    const fallback = (page.products || []).filter((product) => {
      const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
      return /perfume|fragrance|serum|cream|beauty|skin|care|makeup/.test(searchText)
    })
    products = dedupeProducts([...products, ...fallback])
  }

  return products.slice(0, BEAUTY_LAUNCH_PARTY_LIMIT).map((product, index) => {
    const discount = Math.max(10, Math.round(Number(product?.discountPercentage) || 0))
    return {
      id: `beauty-launch-${product.id}-${index}`,
      title: product.title,
      image: product.thumbnail || product.images?.[0] || '',
      offerText: `Up to ${discount}% Off`,
    }
  }).filter((item) => Boolean(item.image))
}

export const fetchSkincareCircleItems = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('skin-care', signal),
    fetchCategoryProducts('beauty', signal),
  ])

  let products = dedupeProducts(categoryResults.flat()).filter((product) => {
    const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
    return /skin|care|cleanser|serum|moisturizer|cream|sunscreen|lotion|face/.test(searchText)
  })

  if (products.length < SKINCARE_CIRCLE_ITEMS_LIMIT) {
    const searchFallback = await fetchSearchProducts('skincare serum moisturizer', signal, 30)
    products = dedupeProducts([...products, ...searchFallback])
  }

  if (products.length < SKINCARE_CIRCLE_ITEMS_LIMIT) {
    const fallbackPage = await fetchAllProductsPage({
      limit: 80,
      skip: 0,
      signal,
    })

    const fallbackSkincare = (fallbackPage.products || []).filter((product) => {
      const searchText = `${product?.title ?? ''} ${product?.description ?? ''} ${product?.category ?? ''}`.toLowerCase()
      return /skin|care|cleanser|serum|moisturizer|cream|sunscreen|lotion|face/.test(searchText)
    })

    products = dedupeProducts([...products, ...fallbackSkincare])
  }

  return products.slice(0, SKINCARE_CIRCLE_ITEMS_LIMIT).map((product, index) => ({
    id: `skincare-circle-${product.id}-${index}`,
    title: product.title,
    image: product.thumbnail || product.images?.[0] || '',
    subtitle: product.brand || 'Skin Care',
  })).filter((item) => Boolean(item.image))
}

export const fetchBeautyMiniCards = async (signal) => {
  const categoryResults = await Promise.all([
    fetchCategoryProducts('beauty', signal),
    fetchCategoryProducts('skin-care', signal),
    fetchCategoryProducts('fragrances', signal),
  ])

  const categoryMap = {
    beauty: categoryResults[0] || [],
    'skin-care': categoryResults[1] || [],
    fragrances: categoryResults[2] || [],
  }

  const fallbackPage = await fetchAllProductsPage({
    limit: BEAUTY_MINI_CARDS_LIMIT,
    skip: 0,
    signal,
  })

  return BEAUTY_MINI_CARD_CONFIG.slice(0, BEAUTY_MINI_CARDS_LIMIT).map((item, index) => {
    const categoryProducts = categoryMap[item.categorySlug] || []
    const categoryProduct = categoryProducts[index % Math.max(categoryProducts.length, 1)]
    const fallbackProduct = fallbackPage.products?.[index]
    const selectedProduct = categoryProduct || fallbackProduct

    return {
      id: `beauty-mini-card-${item.label.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      label: item.label,
      icon: item.icon,
      image: selectedProduct?.thumbnail || selectedProduct?.images?.[0] || '',
      alt: selectedProduct?.title || item.label,
    }
  }).filter((item) => Boolean(item.image))
}
