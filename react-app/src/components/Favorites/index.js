import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserFavorites } from '../../store/user'
import ProductManage from '../Product/ProductManage'

function FavoritePage() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const favoritesObj = useSelector(state => state.user.Favorites)

  useEffect(() => {
    dispatch(fetchUserFavorites(userId))
  }, [ dispatch, userId ])

  if(!favoritesObj || Object.values(favoritesObj).length === 0) return null
  const favorites = Object.values(favoritesObj)
  return (
    <div>
      <h1>Favorite Items</h1>
      {favorites.map(favorite => (
        <ProductManage product={favorite}/>
      ))}
    </div>
  )
}

export default FavoritePage
