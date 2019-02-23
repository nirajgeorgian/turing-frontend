import React, { PureComponent } from 'react'
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
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					profile
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>Update Profile</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>logout</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		)
		const unauthComp = (
			<NavItem>
				<NavLink href="https://github.com/reactstrap/reactstrap">Account</NavLink>
			</NavItem>
		)
		return (
			<header>
				<Navbar color="dark" dark expand="md">
					<NavbarBrand href="/">Ecommerce</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/components/">Products</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
							</NavItem>
							{isAuthenticated ? authComp : unauthComp}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		)
	}
}

export default AppNavbar
