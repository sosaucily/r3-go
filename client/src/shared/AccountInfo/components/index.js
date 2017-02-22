import React, { Component } from 'react'

export default class AccountInfo extends Component {
  constructor(props) {
    super(props)
    this.fetchUserInfo = this.props.fetchUserInfo
  }

  componentDidMount() {
    this.fetchUserInfo()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.isLoggedIn === this.props.isLoggedIn) {
      this.fetchUserInfo()
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
