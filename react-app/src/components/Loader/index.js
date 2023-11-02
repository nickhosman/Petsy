import React from 'react';
import { Hearts } from 'react-loader-spinner';
import './Loader.css'

function Loader() {
  return (
    <div className="loader-container">
      <Hearts color="red" height={90} width={90} />
      <p className='loading-text'>loading...</p>
    </div>
  );
}

export default Loader;
