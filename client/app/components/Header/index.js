import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import CenteredSection from '../CenteredSection'
import H1 from '../H1'
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <CenteredSection>
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
        </CenteredSection>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/shopping">
            <FormattedMessage {...messages.shopping} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}
