import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CustomDropdown extends Component {
	constructor() {
		super();
		this.state = {
			dropdownOpen: false
		}
	}

	onToggle = (e) => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		})
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.onToggle}>
				<DropdownToggle caret color="primary">
					<span>{this.props.text}</span>
				</DropdownToggle>
				{this.props.children}
			</Dropdown>
			)
		)
	}
}

export default CustomDropdown