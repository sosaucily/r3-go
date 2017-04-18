import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
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
      ? <FormattedMessage
            {...messages.loggedIn}
            values={{ name }} />
      : <FormattedMessage {...messages.loggedOut} />
    return message
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
