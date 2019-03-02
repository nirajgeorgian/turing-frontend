import React from 'react'
import { Form, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import { searchAction } from './flux'

const SearchForm = ({ values, handleChange, handleSubmit }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="text"
				value={values.term}
				name="term"
				id="term"
				placeholder="enter product name ..."
				autoComplete="false"
				onChange={(e) => {
					handleChange(e)
				}}
			/>
		</Form>
	)
}

const FormikForm = withFormik({
	validationSchema: Yup.object().shape({
		term: Yup.string()
	}),
	mapPropsToValues: ({ term }) => {
		return {
			term: term || ''
		}
	},
	handleSubmit: async (values, { props, setSubmitting }) => {
		try {
			await props.dispatch(searchAction(values.term))
			props.history.push('/search')
		} catch (e) {
			return setSubmitting(false)
		}
	},
	displayName: 'SearchForm'
})(SearchForm)

const Search = connect(
	null,
	null
)(FormikForm)

export default withRouter(Search)
