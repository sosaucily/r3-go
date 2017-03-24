import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect'
import { toggleSessionDropdown } from './actions'

import {
  selectAuthToken,
  selectIsLoggedIn,
  selectShowSessionDropdown
} from './selectors'
// import { selectName } from 'shared/AccountInfo/selectors'
import Dropdown from './Containers/Dropdown'
import UserCard from './components/UserCard'

const Container = styled.div`
    background-color: $background-bright;
    box-shadow: 0 1px 4px 0 $shadow;
    display: flex;
    height: $header-height;
    overflow: visible;
    right: 0;
    position: absolute;
    top: 0;
`;

function Session(props) {
  const {
    authToken,
    isLoggedIn,
    name,
    showSessionDropdown,
    toggleSessionDropdown
  } = props

  const userCardText = isLoggedIn ? `Welcome ${name}` : 'Login'

  return (
    <Container>
      { <UserCard onClick={toggleSessionDropdown} text={userCardText} />}
      { showSessionDropdown && <Dropdown onClickAway={toggleSessionDropdown} />}
    </Container>
  )
}

// Connect
const mapDispatchToProps = { toggleSessionDropdown }
const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken,
  isLoggedIn: selectIsLoggedIn,
  // name: selectName,
  showSessionDropdown: selectShowSessionDropdown
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)
