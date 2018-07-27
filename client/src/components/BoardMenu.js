import React from 'react'
import Dropdown from '../elements/dropdown';


const BoardMenu = ({ items, onClick }) => {

	return (
		<Dropdown>
			<DropdownMenu>
				{items.map(item => (
					<DropdownItem key={item._id} onClick={() => onClick(item._id)}>{item.title}</DropdownItem>
					))}
			</DropdownMenu>
		</Dropdown>
		)
}

export default BoardMenu