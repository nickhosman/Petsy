import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserFavorites } from '../../store/user'
import ProductManage from '../Product/ProductManage'
import './Manage.css'
import Loader from '../Loader'

function FavoritePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const favoritesObj = useSelector(state => state.user.Favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchUserFavorites(userId))
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
    }
  }
    fetchData();
  }, [ dispatch, userId ])

  let hasFavorites = true
  if(!favoritesObj || Object.values(favoritesObj).length === 0) {
    hasFavorites = false
  };

  if (loading) return <Loader />;
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
