import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'

class AppNavbar extends PureComponent {
	state = {
		isOpen: false
	}
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	render() {
		const { isAuthenticated } = this.props
		const authComp = (
			<>
				<NavItem>
					<Link to="/cart" className="nav-link">
						cart
					</Link>
				</NavItem>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						profile
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Update Profile</DropdownItem>
						<DropdownItem divider />
						<DropdownItem onClick={this.props.logout} color="link">
							logout
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</>
		)
		const unauthComp = (
			<NavItem>
				<Link to="/login" className="nav-link">
					login
				</Link>
			</NavItem>
		)
		return (
			<header>
				<Navbar color="dark" dark expand="md" className="fixed-top">
					<div className="container">
						<Link to="/" className="navbar-brand">
							Ecommerce
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{isAuthenticated ? authComp : unauthComp}
							</Nav>
						</Collapse>
					</div>
				</Navbar>
			</header>
		)
	}
}

export default withRouter(AppNavbar)
