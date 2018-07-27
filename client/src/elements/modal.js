import React from 'react'
import { Modal } from 'mdbreact'

class CustomModal extends Component {
	constructor(props) {
		super(props);
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
			<Modal isOpen={this.state.modalOpen} toggle={this.onToggle} size="lg">
				{this.props.children}
			</Modal>
			)
	}
}

export default CustomModal
