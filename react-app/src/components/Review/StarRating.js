import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const StarRating = ({stars, onClickStars}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || stars) ? 'on' : 'off'}
            onClick={() => onClickStars(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(stars)}
          >
            <span className='star'>
              <FontAwesomeIcon className='reviewratingstar' icon={faStar} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
