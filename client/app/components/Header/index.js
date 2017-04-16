import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from './A';
import CenteredSection from '../CenteredSection'
import H1 from '../H1'
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
      </div>
    );
  }
}
