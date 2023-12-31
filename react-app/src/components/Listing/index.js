import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import { fetchUserListings } from '../../store/user';
import ProductManage from '../Product/ProductManage';
import Loader from '../Loader';

function ListingPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const listingObj = useSelector((state) => state.user.Listings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchUserListings(userId))
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
    }
  }
    fetchData();
  }, [dispatch, userId]);

  let hasListings = true
  if(!listingObj || Object.values(listingObj).length === 0) {
    hasListings = false
  }

  if (loading) return <Loader />;
  return(
    <div className='manage-container'>
      <h1 className='manage-header'>Listed Items</h1>
      {!hasListings ? <h2 style={{ color: 'rgb(212, 25, 25)' }}> No Listings</h2>
      :
      <div className='manageproduct-wrapper'>
        {Object.values(listingObj).map(listing => (
        <ProductManage product={listing} isListing={true}/>
        ))}
      </div>
      }
    </div>
  )
}

export default ListingPage
