import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserFavorites } from '../../store/user'
import ProductManage from '../Product/ProductManage'
import './Manage.css'

function FavoritePage() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const favoritesObj = useSelector(state => state.user.Favorites)

  useEffect(() => {
    dispatch(fetchUserFavorites(userId))
  }, [ dispatch, userId ])

  let hasFavorites = true
  if(!favoritesObj || Object.values(favoritesObj).length === 0) {
    hasFavorites = false
  }
  return (
    <div className='manage-container'>
      <h1 className='manage-header'>Favorited Items</h1>
      {!hasFavorites ? <h2 style={{ color: 'rgb(212, 25, 25)' }}>No Favorites</h2>
      :
      <div className='manageproduct-wrapper'>
      {Object.values(favoritesObj).map(favorite => (
        <ProductManage product={favorite}/>
      ))}
      </div>
      }
    </div>
  )
}

export default FavoritePage
