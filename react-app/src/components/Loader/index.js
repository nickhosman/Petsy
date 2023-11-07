import React from 'react';
import { Hearts } from 'react-loader-spinner';
import './Loader.css'

function Loader() {
  return (
    <div className="loader-container">
      <Hearts color="red" height={80} width={80}/>
      <p className='loading-text'>Loading...</p>
    </div>
  );
}

export default Loader;
