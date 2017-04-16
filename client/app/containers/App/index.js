/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Session from 'containers/Session';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MessageBar from 'containers/MessageBar'
import withProgressBar from 'components/ProgressBar';

const AppWrapper = styled.div`
  @media (min-width: 768px) {
      width: 750px;
  }
  @media (min-width: 992px) {
      width: 970px;
  }
  @media (min-width: 1200px) {
      width: 1170px;
  }
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header />
      <Session />
      {React.Children.toArray(props.children)}
      <MessageBar />
      <Footer />
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
