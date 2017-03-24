import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

const Container = styled.div`
    height: 60px;
`;

export default function Header () { // eslint-disable-line react/prefer-stateless-function
  return (
    <Container>
      <h1>React Redux Starter Kit</h1>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/shopping">
          <FormattedMessage {...messages.shopping} />
        </HeaderLink>
      </NavBar>
    </Container>
  );
}
