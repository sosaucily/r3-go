import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import InfoCard from './InfoCard';
import messages from './messages';
import { fetchAccountInfo } from './actions';
import { selectName, selectUserDataBlob } from '../Session/selectors';

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
    const { text } = this.props;
    return <InfoCard subtitle={this.getMessage()} text={text} />;
  }
}

const mapDispatchToProps = {
  fetchAccountInfo,
};

const mapStateToProps = createStructuredSelector({
  name: selectName,
  text: selectUserDataBlob,
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AccountInfo));
