import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import styled from 'styled-components';
import Button from 'react-toolbox/lib/button/Button';

import CenteredSection from '../CenteredSection';
import GithubIcon from '../GithubIcon';
import H1 from '../H1';
import messages from './messages';

const GithubRepoLink = styled.div`
  position: absolute;
  right: 150px;
  top: 0;
`;

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <CenteredSection>
          <H1>
            <Link to="/">
              <FormattedMessage {...messages.header} />
            </Link>
          </H1>
        </CenteredSection>
        <GithubRepoLink>
          <Button href="http://github.com/sosaucily/r3-go" target="_blank" raised>
            <GithubIcon /> Github
          </Button>
        </GithubRepoLink>
      </div>
    );
  }
}
