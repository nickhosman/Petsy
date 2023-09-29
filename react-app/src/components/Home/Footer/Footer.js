import React from 'react'
import './Footer.css'
import SignupFormModal from "../../SignupFormModal";
import OpenModalButton from "../../OpenModalButton";
import AboutPetsyModal from './AboutPetsyModal'
import {
  faGithub,
  faCss3,
  faHtml5,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {

  const handleToGithub = e => {
    e.preventDefault()
    window.location.replace('https://github.com/nickhosman/Petsy')
  }
  return (
    <div id="footer-div">
      <div id="footer-top">
        {<OpenModalButton
          buttonText="ABOUT PETSY"
          styleClass='join-us-btn'
          modalComponent={<AboutPetsyModal />}
        />
        }


        {<OpenModalButton
          buttonText="JOIN PETSY"
          styleClass='join-us-btn'
          modalComponent={<SignupFormModal />}
        />
        }

        <div onClick={handleToGithub}>
          <h4>CONTACT PETSY </h4>
          <FontAwesomeIcon icon={faGithub} color="black" size="2x" />
        </div>
        <div>
          <h4>STACK</h4>
          <FontAwesomeIcon icon={faReact} color="#add8e6" size="2x" />
          <FontAwesomeIcon icon={faPython} color="#2f5284" size="2x" />
          <FontAwesomeIcon icon={faHtml5} color="red" size="2x" />
          <FontAwesomeIcon icon={faCss3} color="#b2c248" size="2x" />
        </div>
      </div>
      <div id="copyright-div">
        <p>Petsy © 2023</p>
      </div>
    </div>
  )
}


export default Footer