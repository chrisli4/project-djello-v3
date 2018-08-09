import React from 'react'
import { ListGroup, ListGroupItem } from 'mdbreact'

const CustomListGroup = ({ array, onClick }) => (
	<ListGroup>
		{ array.map(item => (
			<ListGroupItem key={item}>{ item }
				<button type="button" className="close" aria-label="Close" onClick={() => onClick(item)}>
					<span aria-hidden="true">&times;</span>
				</button>
			</ListGroupItem>
		))}
	</ListGroup>
	)

export default CustomListGroup