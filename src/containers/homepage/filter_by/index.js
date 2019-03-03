import React, { Component } from 'react'
import { Input, Row, Col } from 'reactstrap'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setDepartment, setCategory } from './flux'

class FilterBy extends Component {
	state = {
		loading_one: true,
		departments: [],
		categories: []
	}
	async componentWillMount() {
		const {
			data: { departments }
		} = await axios.get('http://localhost:8080/api/v1/departments')
		const {
			data: { categories }
		} = await axios.get('http://localhost:8080/api/v1/categories')
		await this.setState({
			departments,
			categories,
			loading_one: false
		})
	}
	onDepartmentChange = async (event) => {
		await this.props.setDepartment({ data: event.target.value })
	}
	onCategoryChange = async (event) => {
		await this.props.setCategory({ data: event.target.value })
	}
	render() {
		const { loading_one, departments, categories } = this.state
		const { department, category } = this.props.filter
		if (loading_one) {
			return <div>loading ...</div>
		}
		return (
			<Row>
				<Col md={6}>
					<p>choose department</p>
					<Input type="select" name="department" onChange={this.onDepartmentChange} defaultValue={department}>
						<option />
						{departments.length > 0 &&
							departments.map((department, id) => {
								return <option key={id + 'department'}>{department.name}</option>
							})}
					</Input>
				</Col>
				<Col md={6}>
					{!loading_one && departments.length > 0 && department && (
						<>
							<p>choose category</p>
							<Input type="select" name="category" onChange={this.onCategoryChange} defaultValue={category}>
								<option />
								{categories.length > 0 &&
									categories.map((category, id) => {
										return <option key={id + 'category'}>{category.name}</option>
									})}
							</Input>
						</>
					)}
				</Col>
			</Row>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			setDepartment,
			setCategory
		},
		dispatch
	)
}
const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterBy)
