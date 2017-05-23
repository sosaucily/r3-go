import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { findIndex, equals, last } from 'ramda';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import InfoCard from './InfoCard';
import messages from './messages';
import { fetchAccountInfo } from './actions';
import { selectName, selectUserDataBlob } from '../Session/selectors';

const navs = ['personal', 'orders'];

const Container = styled.div`
  div > section {
    outline: none;
  }
`;

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    const index = this.getIndexFromProps(props);
    this.state = { tabIndex: index };
  }

  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  // Turn this into a higher order component for route-tab stuff
  componentWillReceiveProps(nextProps) {
    const index = this.getIndexFromProps(nextProps);
    this.setState({ tabIndex: index });
  }

  getIndexFromProps({ routes }) {
    const path = last(routes).path;
    const index = findIndex(equals(path))(navs);
    return (index === -1) ? 0 : index;
  }

  getMessage() {
    const { name } = this.props;
    const { formatMessage } = this.props.intl;

    const message = name
      ? formatMessage(messages.loggedIn, { name })
      : formatMessage(messages.loggedOut);
    return message;
  }

  handleTabChange = (index) => {
    this.setState({ tabIndex: index });
    browserHistory.push(`/account/${navs[index]}`);
  }

  render() {
    const { text } = this.props;
    const { formatMessage } = this.props.intl;

    return (<Container>
      <Tabs
        index={this.state.tabIndex}
        onChange={this.handleTabChange}
      >
        <Tab label={formatMessage(messages.tabs.personal)}>
          <div>
            <InfoCard subtitle={this.getMessage()} text={text} />
          </div>
        </Tab>
        <Tab label={formatMessage(messages.tabs.orders)}>
          <div>
            Some user input form would likely go here
          </div>
        </Tab>
      </Tabs>
    </Container>);
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
