import React, { Component } from 'react'

function withUpdate(WrappedComponent) {
	return class extends Component {
		
		onUpdate = (e) => {
			e.preventDefault()
			let updated = {
				...this.props.item,
				[e.target.name]: e.target.value
			}
			this.props.update(updated)
		}

		render() {
			const newProps = {
				name: this.props.name,
				value: this.props.value,
				onUpdate: this.onUpdate
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

export default withUpdate
