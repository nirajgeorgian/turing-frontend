import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

import AltTextField from '../../components/UIs/input_elements/text_field'
import AltSelectField from '../../components/UIs/input_elements/select'
import AltButton from '../../components/UIs/button'
import { getCartAction, removeCartAction, incrementCartAction, decrementCartAction } from './flux'
import CartItems from './cart_item'

class CartForm extends Component {
	state = {
		price: 0
	}
	async componentDidMount() {
		await this.props.fetchCart()
		await this.computePrice(this.props.cart.cart)
	}
	onToken = (token) => {
		axios.post('http://localhost:8080/api/v1/payment', token).then((response) => {
			response.json().then((data) => {
				alert(`We are in business, ${data.email}`)
			})
		})
	}
	computePrice = (cart) => {
		const price = cart.reduce((acc, item) => {
			return acc + Number(item.product.price) * item.quantity
		}, 0)
		this.setState({
			price
		})
	}
	deleteCartClk = async (data) => {
		await this.props.deleteCart(data)
		this.computePrice(this.props.cart.cart)
	}
	increaseCartClk = async (data) => {
		await this.props.increaseCart(data)
		this.computePrice(this.props.cart.cart)
	}
	decreaseCartClk = async (data) => {
		await this.props.decreaseCart(data)
		this.computePrice(this.props.cart.cart)
	}
	render() {
		const { values, handleSubmit, handleChange } = this.props
		return (
			<div className="row">
				<div className="col-md-5 order-md-2 mb-4">
					<div className="container">
						<h4 className="d-flex justify-content-between align-items-center mb-3">
							<span className="text-muted">Your cart</span>
							<span className="badge badge-secondary badge-pill">{this.props.cart.cart.length}</span>
						</h4>
					</div>
					<ul className="list-group mb-6">
						<CartItems
							cart={this.props.cart.cart}
							onDelete={this.deleteCartClk}
							onIncrease={this.increaseCartClk}
							onDecrease={this.decreaseCartClk}
						/>
						<li className="list-group-item d-flex justify-content-between">
							<span>Total (USD)</span>
							<strong>${this.state.price.toFixed(2)}</strong>
						</li>
					</ul>
				</div>
				<div className="col-md-7 order-md-1 mb-4">
					<div className="container">
						<h4 className="mb-3">Billing address</h4>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<AltTextField
									type="text"
									name="name"
									defaultValue={values.name}
									disabled={true}
									placeholder="Your Full name"
									label="Name"
									valid
								/>
							</div>
							<div className="mb-3">
								<AltTextField
									type="email"
									name="email"
									defaultValue={values.email}
									disabled={true}
									placeholder="Enter your email"
									label="Email"
									valid
								/>
							</div>
							<div className="mb-3">
								<AltTextField
									onChange={handleChange}
									type="text"
									name="address1"
									value={values.address1}
									placeholder="Enter your address"
									label="Address"
								/>
							</div>
							<div className="mb-3">
								<AltTextField
									onChange={handleChange}
									type="text"
									name="address2"
									value={values.address2}
									placeholder="Enter your address2"
									label="Address 2"
								/>
							</div>
							<div className="row">
								<div className="col-md-5 mb-3">
									<AltSelectField
										onChange={handleChange}
										value={values.country}
										label="Country"
										name="country"
										options={['india', 'United States']}
									/>
								</div>
								<div className="col-md-4 mb-3">
									<AltSelectField
										onChange={handleChange}
										value={values.state}
										label="State"
										name="state"
										options={['Bihar', 'California']}
									/>
								</div>
								<div className="col-md-3 mb-3">
									<AltTextField
										onChange={handleChange}
										type="text"
										name="zip"
										value={values.zip}
										placeholder="Enter your Zip"
										label="Zip"
									/>
								</div>
							</div>
							<hr className="mb-4" />
							<StripeCheckout
								token={this.onToken}
								stripeKey="pk_test_J9jSgeV7hwhz9WlWbfZL07P2"
								name="Ecommerce Payment"
								amount={this.state.price.toFixed(2) * 100}
								currency="USD"
								description="Please pay to get your product">
								<AltButton color="primary" size="lg" type="submit" block>
									Continue To Checkout
								</AltButton>
							</StripeCheckout>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const FormikForm = withFormik({
	mapPropsToValues: ({ name, email, address1, address2 }) => {
		return {
			name: 'full name',
			email: 'dododuck@example.com',
			address1: 'bihar, india',
			address2: 'india, bihar',
			country: 'United States',
			state: 'California',
			zip: '123456'
		}
	},
	displayName: 'CartForm'
})(CartForm)

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			fetchCart: getCartAction,
			deleteCart: removeCartAction,
			increaseCart: incrementCartAction,
			decreaseCart: decrementCartAction
		},
		dispatch
	)
}
const mapStateToProps = (state) => ({
	cart: state.cart
})
const Cart = connect(
	mapStateToProps,
	mapDispatchToProps
)(FormikForm)

export default withRouter(Cart)
