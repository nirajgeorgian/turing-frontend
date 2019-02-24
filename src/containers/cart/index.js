import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { PropTypes } from 'prop-types'

import AltTextField from '../../components/UIs/input_elements/text_field'
import AltSelectField from '../../components/UIs/input_elements/select'
import AltButton from '../../components/UIs/button'
import { getCartAction } from './flex'

class CartForm extends Component {
	async componentDidMount() {
		await this.props.fetchCart()
	}
	render() {
		const { values, handleSubmit, handleChange } = this.props
		return (
			<div className="row">
				<div className="col-md-4 order-md-2 mb-4">
					<div className="container">
						<h4 className="d-flex justify-content-between align-items-center mb-3">
							<span className="text-muted">Your cart</span>
							<span className="badge badge-secondary badge-pill">3</span>
						</h4>
					</div>
					<ul className="list-group mb-6">
						<li className="list-group-item d-flex justify-content-between lh-condensed">
							<div>
								<h6 className="my-0">Product name</h6>
								<small className="text-muted">Brief description</small>
							</div>
							<span className="text-muted">$12</span>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span>Total (USD)</span>
							<strong>$20</strong>
						</li>
					</ul>
				</div>
				<div className="col-md-8 order-md-1">
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
						<AltButton color="primary" size="lg" type="submit" block>
							Continue To Checkout
						</AltButton>
					</form>
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
	return bindActionCreators({ fetchCart: getCartAction }, dispatch)
}
const Cart = connect(
	(state) => state.login,
	mapDispatchToProps
)(FormikForm)

export default withRouter(Cart)
