import { useState } from "react"

function CartCheckoutProduct({product}) {
  const [quantity, setQuantity] = useState(product.quantity)

  return(
    <div className="cartcheckout-productcont-flex">
      <div className="cartcheckout-productcont">
        <div className="cartcheckout-left">
          <div className="cartcheckout-seller">
            <img className='loggedin-defaultprofilepic' src='https://i.ibb.co/1LCJZZZ/Default-pfp-svg.png'></img>
              <p>{product.seller}</p>
              </div>
              <img className="cartcheckout-image" src={product.image} alt=''/>
              <button id='cartcheckout-remove' className="petsy-button">× Remove</button>
            </div>
          <div className="cartcheckout-right">
                <p>{product.name}</p>
                <p>${product.price}</p>
                <div className="cartcheckout-dropdown" style={{ width: '80px' }}>
                  <label htmlFor="number-select">Quantity</label>
                  <select
                    id="number-select"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      height: '30px',
                      fontSize: '1rem',
                    }}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                  </select>
          </div>
          </div>
      </div>
    </div>
  )
};

export default CartCheckoutProduct
