import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import TextField from '../../../components/UIs/input_elements/text_field'
import AltButton from '../../../components/UIs/button'
import { loginAction, loginErrorClear } from './flux'

class LoginForm extends PureComponent {
	render() {
		const { values, handleChange, handleSubmit, errors, touched, error, token, status } = this.props
		return (
			<form className="alt-form" onSubmit={handleSubmit}>
				<TextField
					type="email"
					name="email"
					value={values.email}
					onChange={(e) => {
						handleChange(e)
						const dispatch = error ? this.props.dispatch(loginErrorClear()) : null
					}}
					placeholder="Enter your email"
					label="Email"
					hasError={errors.email && touched.email ? true : false}
					error={errors.email && touched.email && errors.email}
				/>
				<TextField
					type="password"
					name="password"
					value={values.password}
					onChange={(e) => {
						handleChange(e)
						const dispatch = error ? this.props.dispatch(loginErrorClear()) : null
					}}
					placeholder="Enter your password"
					label="Password"
					hasError={errors.password && touched.password ? true : false}
					error={errors.password && touched.password && errors.password}
				/>
				<AltButton type="submit" disabled={status || error ? true : false}>
					Login
				</AltButton>
				<div className="alt-form-div">
					<div className="alt-form-p">
						<Link to="/forgot/email">Forgot Password</Link>
					</div>
					<div className="alt-form-p">
						<p>
							New to Alterhop? <Link to="/register">Join Now</Link>
						</p>
					</div>
				</div>
				{error && token === null ? <div>error</div> : null}
			</form>
		)
	}
}

const FormikLogin = withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Invalied email')
			.required('Email is required'),
		password: Yup.string().required('Password is required')
	}),
	mapPropsToValues: ({ email, password }) => {
		return {
			email: email || '',
			password: password || ''
		}
	},
	handleSubmit: async (values, { props, setSubmitting }) => {
		let data
		try {
			data = await props.dispatch(loginAction(values))
			if (data.type === 'LOGIN_SUCCESS') {
				return props.history.push('/welcome')
			}
		} catch (e) {
			return setSubmitting(false)
		}
	},
	displayName: 'LoginForm'
})(LoginForm)

const Login = connect(
	(state) => state.login,
	null
)(FormikLogin)

export default withRouter(Login)
