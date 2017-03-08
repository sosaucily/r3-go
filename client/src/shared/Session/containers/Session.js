import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggleSessionDropdown } from '../actions'

import {
  selectAuthToken,
  selectIsLoggedIn,
  selectShowSessionDropdown
} from '../selectors'
import { selectName } from 'shared/AccountInfo/selectors'
import Dropdown from './Dropdown'
import UserCard from '../components/UserCard'

import styles from './styles.scss'

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
    <div className={styles.container}>
      <UserCard className={styles.userCard} onClick={toggleSessionDropdown} text={userCardText} />
      {showSessionDropdown && <Dropdown onClickAway={toggleSessionDropdown} />}
    </div>
  )
}

// Connect
const mapDispatchToProps = { toggleSessionDropdown }
const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken,
  isLoggedIn: selectIsLoggedIn,
  name: selectName,
  showSessionDropdown: selectShowSessionDropdown
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)
