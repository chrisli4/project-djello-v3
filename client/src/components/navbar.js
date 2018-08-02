import React, { Component } from 'react';
import { connect } from 'react-redux'
import classNames from 'classnames';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userUnset} from '../user/actions'

class CustomNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
			isWideEnough: false,
		};
	}

	onClick = (e) => {
		this.setState({
			collapse: !this.state.collapse,
		});
	}
	
	render() {

		let navItem = classNames({
			'mr-2': !this.state.collapse
		})

		return (
				<Navbar color="indigo" expand="md" dark >
					<NavbarBrand href="#">
					Djello Project Management
					</NavbarBrand>
					{ !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
					<Collapse isOpen = { this.state.collapse } navbar>
						<NavbarNav right>
							<NavItem className={navItem}>
								<NavLink to="/home/"><FontAwesomeIcon icon="home" className='mr-2'/>Home</NavLink>
							</NavItem>
							<NavItem className={navItem}>
								<NavLink to="/home/profile"><FontAwesomeIcon icon="user" className='mr-2'/>Profile</NavLink>
							</NavItem>
							<NavItem className={navItem}>
								<NavLink to="/home/team"><FontAwesomeIcon icon="users" className='mr-2'/>Team</NavLink>
							</NavItem>
							<NavItem className={navItem}>
								<NavLink to="#"><FontAwesomeIcon icon="chalkboard" className='mr-2'/>Cards</NavLink>
							</NavItem>
							<NavItem onClick={this.props.userUnset}>
								<div className='nav-link'><FontAwesomeIcon icon="sign-out-alt" className='mr-2'/>Sign out</div>
							</NavItem>
						</NavbarNav>
					</Collapse>
				</Navbar>
		);
	}
}

export default connect(null, { userUnset })(CustomNavbar);