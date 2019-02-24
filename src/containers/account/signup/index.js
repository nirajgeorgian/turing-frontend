import React, { PureComponent } from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as Yup from 'yup'
import { Alert } from 'reactstrap'

import TextField from '../../../components/UIs/input_elements/text_field'
import AltButton from '../../../components/UIs/button'
import { signupAction, signupErrorClear } from './flux'

class SignupForm extends PureComponent {
	render() {
		const { values, handleChange, handleSubmit, errors, touched, signedUp, error, user, status } = this.props
		return (
			<form className="alt-form" onSubmit={handleSubmit}>
				<TextField
					type="text"
					name="name"
					value={values.name}
					onChange={(e) => {
						handleChange(e)
						return error ? this.props.dispatch(signupErrorClear()) : null
					}}
					placeholder="Enter your full name"
					label="Name"
					hasError={errors.name && touched.name ? true : false}
					error={errors.name && touched.name && errors.name}
					valid={!errors.name && touched.name}
				/>
				<TextField
					type="email"
					name="email"
					value={values.email}
					onChange={(e) => {
						handleChange(e)
						return error ? this.props.dispatch(signupErrorClear()) : null
					}}
					placeholder="Enter your email"
					label="Email"
					hasError={errors.email && touched.email ? true : false}
					error={errors.email && touched.email && errors.email}
					valid={!errors.email && touched.email}
				/>
				<TextField
					type="password"
					name="password"
					value={values.password}
					onChange={(e) => {
						handleChange(e)
						return error ? this.props.dispatch(signupErrorClear()) : null
					}}
					placeholder="Enter your password"
					label="Password"
					hasError={errors.password && touched.password ? true : false}
					error={errors.password && touched.password && errors.password}
					valid={!errors.password && touched.password}
				/>
				{error && (signedUp === false && user === null) ? (
					<Alert onClick={() => this.props.dispatch(signupErrorClear())} color="danger">
						{error}
					</Alert>
				) : null}
				<AltButton type="submit" disabled={status || error ? true : false}>
					Register
				</AltButton>
				<div className="alt-form-extra text-center">
					<div className="alt-form-p">
						<Link to="/login">Already have Account</Link>
					</div>
				</div>
			</form>
		)
	}
}
const FormikSignup = withFormik({
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Full name is required'),
		email: Yup.string()
			.email('Invalied email')
			.required('Email is required'),
		password: Yup.string().required('Password is required')
	}),
	mapPropsToValues: ({ email, password, name }) => {
		return {
			email: email || '',
			password: password || '',
			name: name || ''
		}
	},
	handleSubmit: async (values, { props, setSubmitting }) => {
		let data
		try {
			data = await props.dispatch(signupAction(values))
			const { payload } = data
			if (payload.status === 201) {
				// const { user } = payload.data
				props.history.push('/login')
			}
		} catch (e) {
			return setSubmitting(false)
		}
	},
	displayName: 'SignupForm'
})(SignupForm)

const Signup = connect(
	(state) => state.signup,
	null
)(FormikSignup)

export default withRouter(Signup)
