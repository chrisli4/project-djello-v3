import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem, Row, Modal } from 'mdbreact'

class TeamCard extends Component {

	constructor() {
		super()
		this.state = {
			modalOpen: false
		}
	}

	onToggle = (e) => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

		render() {
		return (
		<React.Fragment>
		<ListGroupItem hover className="text-center" onClick={this.onToggle}>
			<span className="small">
					{this.props.card.title}
			</span>
		</ListGroupItem>
		<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
		<CardHeader className="p-3" color="primary-color">
				{this.props.card.title}
		</CardHeader>
		<CardBody>

			<div className="d-flex justify-content-between">
						<label>In List: {this.props.card.title}</label>
					</div>
					<hr/>
					<label>Description</label>
						{this.props.card.description}
					<hr/>
					<label>Tasks</label>
					<hr/>
					<label>Members</label>
						<ListGroup>
						{ this.props.card.members.map(member => 
							<ListGroupItem key={member}>{member}</ListGroupItem>
							)}
						</ListGroup>
					<hr/>
					<div>
					</div>
		</CardBody>
		<CardFooter>
		<Row className='justify-content-center'>
					<button className='btn btn-primary' onClick={this.onUpdateSubmit}>Save Changes</button>
					</Row>
		</CardFooter>
		</Modal>
		</React.Fragment>
			)
	}
}

const mapStateToProps = (state, ownProps) => ({
	card: state.cards.byId[ownProps._id]
})

export default connect(mapStateToProps)(TeamCard)