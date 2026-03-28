import React, { useMemo, useState } from 'react'
import ForYouSuggestions from '../Components/ForYouSuggestions'
import SuggestedForYou from '../Components/SuggestedForYou'
import WishlistForYou from '../Components/WishlistForYou'
import PreviousOrdersForYou from '../Components/PreviousOrdersForYou'
import AllProductsInfiniteFeed from '../Components/AllProductsInfiniteFeed'

const Foryou = () => {
  const [wishlistItems, setWishlistItems] = useState([])

  const wishlistProductIds = useMemo(
    () => wishlistItems.map((item) => item.id),
    [wishlistItems],
  )

  const handleAddToWishlist = (product) => {
    if (!product?.id) {
      return
    }

    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev
      }

      return [...prev, product]
    })
  }

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <>
      <ForYouSuggestions
        onAddToWishlist={handleAddToWishlist}
        wishlistProductIds={wishlistProductIds}
      />
      <SuggestedForYou
        onAddToWishlist={handleAddToWishlist}
        wishlistProductIds={wishlistProductIds}
      />
      <WishlistForYou items={wishlistItems} onRemove={handleRemoveFromWishlist} />
      <PreviousOrdersForYou />
      <AllProductsInfiniteFeed />
    </>
  )
}

export default Foryou