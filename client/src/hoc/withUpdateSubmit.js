import React, { Component } from 'react'

function withUpdateSubmit(WrappedComponent) {
	return class extends Component {
		
		onUpdateSubmit = (e) => {
			e.preventDefault()
			this.props.update(updated)
		}

		render() {
			const newProps = {
				onUpdateSubmit: this.onUpdateSubmit
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

export default withUpdateSubmit
