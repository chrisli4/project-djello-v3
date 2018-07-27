import React from 'react'
import Dropdown from '../elements/dropdown';

const ListMenu = ({ onClickA, onClickB, onClickC }) => {

	return (
		<Dropdown>
			<DropdownMenu>
				<DropdownItem onClick={onClickA}>Create Card</DropdownItem>
				<DropdownItem onClick={onClickB}>Save List</DropdownItem>
				<DropdownItem onClick={onClickC}>Delete List</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		)
}

export default ListMenu