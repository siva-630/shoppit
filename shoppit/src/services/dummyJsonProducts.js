const DUMMY_JSON_BASE_URL = 'https://dummyjson.com'

export const MAX_SLIDES = 5
const MAX_SUGGESTIONS = 10
const FOR_YOU_SUGGESTION_LIMIT = 12
const FASHION_SMALL_CARDS_LIMIT = 20
const FASHION_PRICE_COLLECTION_LIMIT = 5
const WEDDING_STYLE_SHOWCASE_LIMIT = 14

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
