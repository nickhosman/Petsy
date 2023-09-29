import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,

} from '@fortawesome/free-brands-svg-icons'

function AboutPetsyModal() {
  const handleToYiGithub = e => {
    e.preventDefault()
    window.open('https://github.com/heehyun1128')
  }

  const handleToNickGithub = e => {
    e.preventDefault()
    window.open('https://github.com/nickhosman')
  }

  const handleToKevinGithub = e => {
    e.preventDefault()
    window.open('https://github.com/kevindbaik')
  }

  const handleToHuynhGithub = e => {
    e.preventDefault()
    window.open('https://github.com/huynhlam56')
  }


  return (
    <div id="about-petsy-div">
      <h1>About Us</h1>
      <p>Welcome to Petsy. We are a passionate team of pet lovers striving to provide our furry friends products with the best comfort and style.</p>
      <h4>Developers</h4>
      <div id='developer-github' onClick={handleToYiGithub}>
        <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
        <p>
          Yi Chen
        </p>
      </div>
      <div id='developer-github' onClick={handleToNickGithub}>
        <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
        <p>
          Nick Hosman
        </p>
      </div>
      <div id='developer-github' onClick={handleToKevinGithub}>
        <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
        <p>
          Kevin Baik
        </p>
      </div>
      <div id='developer-github' onClick={handleToHuynhGithub}>
        <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
        <p>
          Huynh Lam
        </p>
      </div>
    </div>
  );
}

export default AboutPetsyModal;
