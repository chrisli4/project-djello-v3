import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listCreate } from './actions'
import CustomForm from '../elements/form'

class ListForm extends React.Component {
  submit = values => {
  	this.props.listCreate(this.props.user, { boardId: this.props.board._id, ...values })
  }
  render() {
    return <CustomForm onSubmit={this.submit} form='list' />
  }
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	board: state.boards.byId[state.boards.current],
})

export default connect(mapStateToProps, { listCreate })(ListForm)