import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import { fetchUserListings } from '../../store/user';

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
  console.log(listings)
  return(
    <>
    {listings.map(listing => (
      <h2>{listing.name}</h2>
    ))}
    </>
  )
}

export default ListingPage
