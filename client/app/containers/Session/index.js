import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { readSessionCookie, toggleSessionDropdown } from './actions';
import {
  selectAuthToken,
  selectIsLoggedIn,
  selectName,
  selectShowSessionDropdown,
} from './selectors';
import Dropdown from './containers/Dropdown';
import UserCard from './components/UserCard';

const Container = styled.div`
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.13);
    display: flex;
    height: 72px;
    overflow: visible;
    right: 0;
    position: absolute;
    top: 0;
`;

class Session extends React.Component {
  componentDidMount() {
    this.props.readSessionCookie();
  }

  render() {
    const {
      isLoggedIn,
      name,
      showSessionDropdown,
    } = this.props;

    const userCardText = isLoggedIn ? `Welcome ${name}` : 'Login';

    return (
      <Container>
        { <UserCard onClick={toggleSessionDropdown} text={userCardText} />}
        { showSessionDropdown && <Dropdown onClickAway={toggleSessionDropdown} />}
      </Container>
    );
  }
}

// Connect
const mapDispatchToProps = { toggleSessionDropdown, readSessionCookie };
const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken,
  isLoggedIn: selectIsLoggedIn,
  name: selectName,
  showSessionDropdown: selectShowSessionDropdown,
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
