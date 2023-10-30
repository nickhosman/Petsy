import React, { useState } from "react";
import logo from '../../images/Petsy-logo.svg'


function ContactModal() {
  const handleToYiGithub = e => {
    e.preventDefault()
    window.open('https://github.com/heehyun1128')
  };

  const handleToYiLinkedin = e => {
    e.preventDefault()
    window.open('https://www.linkedin.com/in/yi-c-452811132/')
  };

  const handleToYiPortfolio= e => {
    e.preventDefault()
    window.open('https://heehyun1128.github.io/')
  };

  const handleToNickGithub = e => {
    e.preventDefault()
    window.open('https://github.com/nickhosman')
  };

  const handleToNickLinkedin = e => {
    e.preventDefault()
    window.open('https://www.linkedin.com/in/nicholas-hosman-428558206/')
  };

  const handleToNickPortfolio = e => {
    e.preventDefault()
    window.open('https://nickhosman.me/')
  };

  const handleToKevinGithub = e => {
    e.preventDefault()
    window.open('https://github.com/kevindbaik')
  };

  const handleToKevinLinkedin = e => {
    e.preventDefault()
    window.open('https://www.linkedin.com/in/kevin-baik-311438193/')
  };

  const handleToKevinPortfolio = e => {
    e.preventDefault()
    window.open('https://kevinbaik.com')
  };

  const handleToHuynhGithub = e => {
    e.preventDefault()
    window.open('https://github.com/huynhlam56')
  }

  const handleToHuynhLinkedin = e => {
    e.preventDefault()
    window.open('https://www.linkedin.com/in/huynh-lam/')
  }

  const handleToHuynhPortfolio = e => {
    e.preventDefault()
    window.open('https://huynhlam56.github.io/')
  }


  return (
    <div id="contact-us-div">
      <h1>The Developers</h1>

      {/* <h4>Developers</h4> */}
      <div id='developer-github'>
      <p className="developer-portfolio" onClick={handleToYiPortfolio}> Yi Chen </p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToYiGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToYiLinkedin}></i>
        </div>
      </div>
      <div id='developer-github'>
        <p className="developer-portfolio" onClick={handleToNickPortfolio}> Nick Hosman </p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToNickGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToNickLinkedin}></i>
        </div>
      </div>
      <div id='developer-github'>
      <p className="developer-portfolio" onClick={handleToKevinPortfolio}> Kevin Baik </p>
      <div className="developer-icons">
          <i class="fa-brands fa-github"  onClick={handleToKevinGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToKevinLinkedin}></i>
        </div>
      </div>
      <div id='developer-github'>
      <p className="developer-portfolio" onClick={handleToHuynhPortfolio}> Huynh Lam </p>
      <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToHuynhGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToHuynhLinkedin}></i>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
