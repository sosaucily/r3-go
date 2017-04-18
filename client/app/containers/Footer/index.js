import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';
import { selectSha } from './selectors'
import { getSha } from './actions'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3em 0;
    border-top: 1px solid #666;
`;

class Footer extends React.Component {
  componentDidMount() {
    this.props.getSha()
  }

  render () {
    const { sha } = this.props
    return (
      <Container>
        <section>
          <LocaleToggle />
        </section>
        <section>
          <FormattedMessage
            {...messages.shaMessage}
            values={{ sha }}
          />
        </section>
      </Container>
    )
  }
}


const mapDispatchToProps = {
  getSha
}

const mapStateToProps = createStructuredSelector({
  sha: selectSha
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
