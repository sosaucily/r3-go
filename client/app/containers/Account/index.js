import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchAccountInfo } from './actions'
import { selectIsLoggedIn, selectName } from '../Session/selectors'

class AccountInfo extends Component {
  constructor(props) {
    super(props)
    this.fetchAccountInfo = this.props.fetchAccountInfo
  }

  componentDidMount() {
    this.fetchAccountInfo()
  }

  // componentWillReceiveProps(nextProps) {
  //   if(!nextProps.isLoggedIn === this.props.isLoggedIn) {
  //     this.fetchAccountInfo()
  //   }
  // }

  render() {
    const { name } = this.props
    const message = name
      ? `welcome ${name}, you are authenticated and have a valid token`
      : 'No session, no valid token, please log in'
    return <div>{message}</div>
  }
}

const mapDispatchToProps = {
  fetchAccountInfo
}

const mapStateToProps = createStructuredSelector({
    name: selectName,
    isLoggedIn: selectIsLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
