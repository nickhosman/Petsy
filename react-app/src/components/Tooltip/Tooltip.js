import React, { useState } from 'react';
import './Tooltip.css'

function Tooltip(props) {
  const [show, setShow] = useState(false);
  let delay = 0;

  const showToolTip = () => {
    delay = setTimeout(() => {
      setShow(true);
    }, 80)
  };

  const hideToolTip = () => {
    clearInterval(delay);
    setShow(false)
  };

  return (
    <div
    className="Tooltip-Wrapper"
    onMouseEnter={showToolTip}
    onMouseLeave={hideToolTip}
  >
    {props.children}
    {show && (
      <div className={`Tooltip-Tip ${"top"}`}>
        {props.content}
      </div>
    )}
  </div>
  )
}

export default Tooltip
