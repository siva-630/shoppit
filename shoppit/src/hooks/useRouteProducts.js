import { useEffect, useState } from 'react'
import { fetchProductsForRoute } from '../services/dummyJsonProducts'

const useRouteProducts = ({ pathname, skipFetch = false }) => {
  const [routeProducts, setRouteProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (skipFetch) {
      setRouteProducts([])
      setErrorMessage('')
      setIsLoading(false)
      return undefined
    }

    const controller = new AbortController()

    const loadProductsForRoute = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const products = await fetchProductsForRoute(pathname, controller.signal)
        setRouteProducts(products)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setRouteProducts([])
          setErrorMessage('Could not load product slides right now.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProductsForRoute()

    return () => {
      controller.abort()
    }
  }, [pathname, skipFetch])

  return { routeProducts, isLoading, errorMessage }
}

export default useRouteProducts
