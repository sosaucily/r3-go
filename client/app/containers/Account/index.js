import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchUserInfo } from './actions'
import { selectIsLoggedIn, selectName } from '../Session/selectors'

class AccountInfo extends Component {
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

const mapDispatchToProps = {
  fetchUserInfo
}

const mapStateToProps = createStructuredSelector({
    name: selectName,
    isLoggedIn: selectIsLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
