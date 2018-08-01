import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { boardCurrent } from './actions'

function toArray(obj){

	const arr = [];

	for(let key in obj) {
		arr.push(obj[key]);
	}

	return arr;
}

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

	onClick = (id) => {
		this.props.boardCurrent(id)
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.onToggle}>
			<DropdownToggle caret color="primary">
			<span>Boards</span>
			</DropdownToggle>
			<DropdownMenu>
			{this.props.boards.map(board => (
				<DropdownItem key={board._id} onClick={() => this.onClick(board._id)}>{board.title}</DropdownItem>
				))}
			</DropdownMenu>
			</Dropdown>
			)
	}
}

const mapStateToProps = (state) => ({
	boards: toArray(state.boards.byId)
})

export default connect(mapStateToProps, { boardCurrent })(CustomDropdown);