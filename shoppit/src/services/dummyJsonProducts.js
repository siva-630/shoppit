const DUMMY_JSON_BASE_URL = 'https://dummyjson.com'

export const MAX_SLIDES = 5
const MAX_SUGGESTIONS = 10
const FOR_YOU_SUGGESTION_LIMIT = 12

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
