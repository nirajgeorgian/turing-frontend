import React, { Component } from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as Yup from 'yup'
import { Checkbox } from '@blueprintjs/core'
import { Intent } from '@blueprintjs/core'

import AltAuthPageContent from '../../../components/auth_page_content'
import TextField from '../../../components/UIs/input_elements/text_field'
import AltButton from '../../../components/UIs/button'
import AltToast from '../../../components/toast_message'
import { signupAction, signupErrorClear } from './flux'

class SignupForm extends Component {
	state = {
		showPassword: false,
		showPasswordAgain: true,
		aggreeTermsAndCondition: false
	}
	setShowPassword = () => {
		this.setState({
			showPassword: !this.state.showPassword
		})
	}
	showPasswordAgain = () => {
		this.setState({
			showPassword: !this.state.showPassword
		})
	}
	handleEnabledChange = () => {
		this.setState({
			aggreeTermsAndCondition: !this.state.aggreeTermsAndCondition
		})
	}
	showToast = (message) => {
		// create toasts in response to interactions.
		// in most cases, it's enough to simply create and forget (thanks to timeout).
		AltToast.show({
			message,
			onDismiss: () => this.props.dispatch(signupErrorClear()),
			intent: Intent.DANGER,
			icon: 'warning-sign',
			timeout: 2000
		})
	}
	render() {
		const {
			values,
			handleChange,
			handleSubmit,
			handleBlur,
			errors,
			touched,
			signedUp,
			error,
			user,
			status
		} = this.props
		return (
			<form className="alt-form" onSubmit={handleSubmit}>
				<AltAuthPageContent />
				<TextField
					type="text"
					name="fullname"
					value={values.name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your full name"
					label="Full Name"
					hasError={errors.fullname && touched.fullname ? true : false}
					error={errors.fullname && touched.fullname && errors.fullname}
				/>
				<TextField
					type="email"
					name="email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your email"
					label="Email"
					hasError={errors.email && touched.email ? true : false}
					error={errors.email && touched.email && errors.email}
				/>
				<TextField
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your password"
					label="Password"
					showPassword={this.state.showPassword}
					handleLockClick={this.setShowPassword}
					hasError={errors.password && touched.password ? true : false}
					error={errors.password && touched.password && errors.password}
				/>
				<TextField
					type="password"
					name="confirm_password"
					value={values.confirm_password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter the password again"
					label="Confirm Password"
					showPassword={this.state.showPasswordAgain}
					handleLockClick={this.setShowPasswordAgain}
					hasError={errors.confirm_password && touched.confirm_password ? true : false}
					error={errors.confirm_password && touched.confirm_password && errors.confirm_password}
				/>
				<TextField
					type="text"
					name="mob_no"
					value={values.mob_no}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your mobile number"
					label="Mobile Number"
					hasError={errors.mob_no && touched.mob_no ? true : false}
					error={errors.mob_no && touched.mob_no && errors.mob_no}
				/>
				<TextField
					type="text"
					name="college"
					value={values.college}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your college name"
					label="College"
					hasError={errors.college && touched.college ? true : false}
					error={errors.college && touched.college && errors.college}
				/>
				<TextField
					type="text"
					name="course"
					value={values.course}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Enter your college course"
					label="College Course"
					hasError={errors.course && touched.course ? true : false}
					error={errors.course && touched.course && errors.course}
				/>
				<div className="alt-form-div">
					<Checkbox
						className="agree-terms-and-condition"
						checked={this.state.aggreeTermsAndCondition}
						label="Agree to "
						onChange={this.handleEnabledChange}>
						<a href="/tac" target="_blank">
							Terms and conditions
						</a>
					</Checkbox>
				</div>
				<AltButton type="submit" disabled={status || error ? true : false}>
					Register
				</AltButton>
				<div className="alt-form-div">
					<div className="alt-form-p">
						<Link to="/login">Already have Account</Link>
					</div>
				</div>
				{error && (signedUp === false && user === null) ? this.showToast(error) : null}
			</form>
		)
	}
}
const FormikSignup = withFormik({
	validationSchema: Yup.object().shape({
		fullname: Yup.string().required('Full name is required'),
		email: Yup.string()
			.email('Invalied email')
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('password'), null])
			.required('Password confirm is required'),
		college: Yup.string().required('College is required'),
		course: Yup.string().required('Course is required'),
		mob_no: Yup.string().required('Mobile no. is required')
	}),
	mapPropsToValues: ({ email, password, confirm_password, fullname, mob_no, college, course }) => {
		return {
			email: email || '',
			password: password || '',
			confirm_password: confirm_password || '',
			fullname: fullname || '',
			mob_no: mob_no || '',
			course: course || '',
			college: college || ''
		}
	},
	handleSubmit: async (values, { props, setSubmitting }) => {
		let data
		try {
			data = await props.dispatch(signupAction(values))
			const { payload } = data
			if (payload.status === 201) {
				const { user } = payload.data
				props.history.push(`/verify/phone/${encodeURI(user)}`)
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
