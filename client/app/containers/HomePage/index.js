import React from 'react';
import { browserHistory } from 'react-router';
import { addIndex, findIndex, equals, last, times } from 'ramda';
import { injectIntl } from 'react-intl';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import ContentBody from './ContentBody';
import ProductCard from './ProductCard';
import messages from './messages';

const navs = ['women', 'men', 'influencer', 'about'];

const Container = styled.div`
  div > section {
    outline: none;
  }
`;

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const index = this.getIndexFromProps(props);
    this.state = { tabIndex: index };
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

  handleTabChange = (index) => {
    this.setState({ tabIndex: index });
    browserHistory.push(`/${navs[index]}`);
  }

  render() {
    const { formatMessage } = this.props.intl;

    const timesWithIndex = addIndex(times);
    return (
      <Container>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React/Redux/Rails Boilerplate application homepage' },
          ]}
        />
        <Tabs
          index={this.state.tabIndex}
          onChange={this.handleTabChange}
        >
          <Tab label={formatMessage(messages.tabs.shopWomen)}>
            <ContentBody>
              {timesWithIndex((iter) => (<ProductCard key={iter} />), 9)}
            </ContentBody>
          </Tab>
          <Tab label={formatMessage(messages.tabs.shopMen)}>
            <ContentBody>
              {timesWithIndex((iter) => (<ProductCard key={iter} />), 9)}
            </ContentBody>
          </Tab>
          <Tab label={formatMessage(messages.tabs.influencer)}>
            Some stuff about how to sign up.
          </Tab>
          <Tab label={formatMessage(messages.tabs.about)}>
            More about our company
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default injectIntl(HomePage);
