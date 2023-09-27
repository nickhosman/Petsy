import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import { fetchUserListings } from '../../store/user';
import ProductManage from '../Product/ProductManage';

function ListingPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const listingObj = useSelector((state) => state.user.Listings)
  console.log(listingObj)

  useEffect(() => {
    dispatch(fetchUserListings(userId))
  }, [dispatch]);

  if(!listingObj || Object.values(listingObj).length === 0) return null
  const listings = Object.values(listingObj)

  return(
    <div>
        <h1>Listed Items</h1>
      <div className='manageproduct-wrapper'>
        {listings.map(listing => (
        <ProductManage product={listing} isListing={true}/>
        ))}
      </div>
    </div>
  )
}

export default ListingPage
