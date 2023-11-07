import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faGithub,
//   faCss3,
//   faHtml5,
//   faPython,
//   faReact,
// } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StackModal() {

  return (
    <div id="about-petsy-div">
      <h1>Petsy Stack</h1>
        <div className="stack-container">
          <div className="one-stack">
          <img className="stack-img" src="https://www.svgrepo.com/show/358128/react.svg"></img>
          <p>React.js</p>
          </div>
          <div className="one-stack">
          <img className="stack-img" src="https://cdn.worldvectorlogo.com/logos/redux.svg"></img>
          <p>Redux</p>
          </div>
          <div className="one-stack">
          <img className="stack-img" src="https://www.svgrepo.com/show/473611/flask.svg"></img>
          <p>Flask</p>
          </div>
          <div className="one-stack">
          <img className="stack-img" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"></img>
          <p>PostgreSQL</p>
          </div>
        </div>
    </div>
  );
}

export default StackModal;
