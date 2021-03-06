import React from 'react'
import { addToCartThunk } from '../store/cart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const ButtonAddToCart = (props) => {
  if (props.prodQty <= 0) {
    return (
      <div>
        <button
          type="button"
          disabled
          onClick={async () => {
            await props.addToCart(props.cartItem)
            props.redirect && props.history.push('/cart')
          }}
        >
          No More Available
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          type="button"
          onClick={async () => {
            await props.addToCart(props.cartItem)
            props.redirect && props.history.push('/cart')
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart(cartItem) {
      return dispatch(addToCartThunk(cartItem))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ButtonAddToCart))
