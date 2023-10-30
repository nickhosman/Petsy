import React, { useState } from "react";
import logo from '../../images/Petsy-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,

} from '@fortawesome/free-brands-svg-icons'

function AboutPetsyModal() {

  return (
    <div id="about-petsy-div">
      <h1>About Petsy</h1>
      <p>Welcome to Petsy. Our ecommerce website offers custom handcrafted products for all types of pets! As a passionate team of pet lovers, we strive to provide our furry friends unique gifts with the best comfort and style. </p>

      <p> Users can browse and purchase a wide variety of products, leave reviews for items they've purchased, and curate a list of their own favorite items. Finding a product for your pet has never been easier thanks to the search and tag feature! As a seller, you have the capability of creating and editing your product listings, as well as removing any previously listed items. </p>

      <p>We hope you enjoy your visit!</p>

      <img id='aboutus-logo' src={logo}></img>
    </div>
  );
}

export default AboutPetsyModal;
