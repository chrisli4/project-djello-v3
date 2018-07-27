import React, { Component } from 'react'

function withDelete(WrappedComponent) {
	return class extends Component {

		onDelete = (e) => {
			e.preventDefault()
			this.props.delete(this.props.user, this.props.item, this.props.params)
		}

		render() {
			const newProps = {
				onDelete: this.onDelete
			}

			return (
				<WrappedComponent 
					{...newProps}
					{...this.props}
				/>
				)
		}
	}
}

export default withDelete
