import React, { Component } from 'react'

function withDisable(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				disable: false
			}
		}

		onDisable = (e) => {
			this.setState({
				disable: !this.state.disable
			})
		}

		render() {
			const newProps = {
				disable: !this.state.disable,
				onDisable: this.onDisable
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

export default withDisable
