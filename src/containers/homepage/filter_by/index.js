import React, { Component } from 'react'
import { Input, Row, Col } from 'reactstrap'
import axios from 'axios'

class FilterBy extends Component {
	state = {
		loading_one: true,
		departments: [],
		department: '',
		categories: [],
		category: ''
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
	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	render() {
		const { loading_one, departments, department, categories } = this.state
		if (loading_one) {
			return <div>loading ...</div>
		}
		return (
			<Row>
				<Col md={6}>
					<p>choose department</p>
					<Input type="select" name="department" onChange={this.onInputChange}>
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
							<Input type="select" name="category" onChange={this.onInputChange}>
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

export default FilterBy
