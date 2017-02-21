import React, { Component } from 'react'

export default class AccountInfo extends Component {
  componentDidMount() {
    if(!this.props.name) {
      this.props.fetchUserInfo()
    }
  }

  render() {
    const { name } = this.props
    const message = name
      ? `welcome ${name}, you are authenticated`
      : 'loading...'
    return <div>{message}</div>
  }
}
