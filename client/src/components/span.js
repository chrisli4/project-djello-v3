import React, { Component } from 'react'
import classNames from 'classnames'

class CustomSpan extends Component {
	constructor() {
		super()
		this.state = {
			hover: false
		}
	}

	onHover = (e) => {
		this.setState({
			hover: true
		})
	}

	onLeave = (e) => {
		this.setState({
			hover: false
		})
	}

	render() {
		let names = classNames(this.props.className, {
			'grey lighten-4': this.state.hover,
			'grey lighten-5': !this.state.hover,
		})
		return (
			<span onMouseEnter={this.onHover} onMouseLeave={this.onLeave} className={names} onClick={this.props.onClick}>{this.props.text}</span>
			)
	}
}

export default CustomSpan