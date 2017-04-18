import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import InfoCard from './InfoCard'
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

  getMessage() {
    const { name } = this.props
    const {formatMessage} = this.props.intl;

    const message = name
      ? formatMessage(messages.loggedIn, { name })
      : formatMessage(messages.loggedOut)
    return message
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <InfoCard subtitle={this.getMessage()} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchAccountInfo
}

const mapStateToProps = createStructuredSelector({
    name: selectName,
    isLoggedIn: selectIsLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AccountInfo))
