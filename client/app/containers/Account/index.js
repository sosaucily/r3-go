import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import InfoCard from './InfoCard';
import messages from './messages';
import { fetchAccountInfo } from './actions';
import { selectIsLoggedIn, selectName } from '../Session/selectors';

class AccountInfo extends Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  getMessage() {
    const { name } = this.props;
    const { formatMessage } = this.props.intl;

    const message = name
      ? formatMessage(messages.loggedIn, { name })
      : formatMessage(messages.loggedOut);
    return message;
  }

  render() {
    return <InfoCard subtitle={`sup ${this.getMessage()}`} />;
  }
}

const mapDispatchToProps = {
  fetchAccountInfo,
};

const mapStateToProps = createStructuredSelector({
  name: selectName,
  isLoggedIn: selectIsLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AccountInfo));
