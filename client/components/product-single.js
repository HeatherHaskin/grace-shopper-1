import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonAddToCart, ReviewList } from './index'
import { Link } from 'react-router-dom'
import { getInitialProductThunk } from '../store'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: auto;
`
const Details = styled.div`
  position: relative;
  display: flex;
`
const Image = styled.img`
  max-height: 35em;
  width: auto;
  height: auto;
  padding: 1em;
`
const ProductInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`
const CartUI = styled.div`
  display: flex;
  position: relative;
`
const Form = styled.form`
  display: flex;
`

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct,
      cartItem: {
        productId: this.props.selectedProduct.id,
        quantity: 1
      },
    }
  }
  async componentDidMount() {
    const urlId = Number(this.props.match.params.id)
    await this.props.getInitialProduct(urlId)
    this.setState({
      selectedProduct: this.props.selectedProduct,
      cartItem: {
        productId: this.props.selectedProduct.id,
        quantity: 1
      }
    })
  }
  handleChange = (evt) => {
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        quantity: Number(evt.target.value)
      }
    })
  }
  render() {
    const productId = Number(this.props.match.params.id)
    const title = this.state.selectedProduct.title
    const description = this.state.selectedProduct.description
    const price = (this.state.selectedProduct.price / 100).toFixed(2)
    const quantity = this.state.selectedProduct.quantity
    const imageUrl = this.state.selectedProduct.imageUrl
    return (
      <Wrapper>
        <h1>{title}</h1>
        <Details>
          <Image src={imageUrl} />
          <ProductInfo>
            <p>
              {description}
            </p>
            <CartUI>
              <h3>
                ${price}
              </h3>
              <Form>
                <label name="quantity">Qty:
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={this.state.cartItem.quantity}
                    onChange={this.handleChange}
                  />
                </label>
                <ButtonAddToCart redirect={true} prodQty={quantity} cartItem={this.state.cartItem} />
              </Form>
              <p>
                {quantity} available in store
                </p>
              {this.props.isAdmin &&
                <Link to={`/products/${productId}/edit`}>
                  <button type="button">Edit Product</button>
                </Link>
              }
            </CartUI>
          </ProductInfo>
        </Details>
        <ReviewList prodId={productId} />
      </Wrapper>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    selectedProduct: store.product.selectedProduct,
    isAdmin: !!store.user.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialProduct(productId) {
      return dispatch(getInitialProductThunk(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
