import React from 'react'
import './Footer.css'
import SignupFormModal from "../../SignupFormModal";
import OpenModalButton from "../../OpenModalButton";
import AboutPetsyModal from './AboutPetsyModal'
import ContactModal from './ContactModal';
import StackModal from './StackModal';

function Footer() {

  return (
    <div id="footer-div">
      <div id="footer-top">
        {<OpenModalButton
          buttonText="About Petsy"
          styleClass='join-us-btn'
          modalComponent={<AboutPetsyModal />}
        />
        }


        {<OpenModalButton
          buttonText="Join Petsy"
          styleClass='join-us-btn'
          modalComponent={<SignupFormModal />}
        />
        }

        {<OpenModalButton
          buttonText="Contact Us"
          styleClass='join-us-btn'
          modalComponent={<ContactModal />}
        />
        }

        {<OpenModalButton
          buttonText="Stack"
          styleClass='join-us-btn'
          modalComponent={<StackModal />}
        />
        }

        <p className='trademark'>Petsy © 2023</p>
      </div>
    </div>
  )
}


export default Footer
