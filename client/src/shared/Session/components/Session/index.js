import React from 'react'

import Dropdown from '../../containers/Dropdown'
import UserCard from '../UserCard'

import styles from './styles.scss'

export default function Session(props) {
  const {
    isLoggedIn,
    authToken,
    showSessionDropdown,
    toggleSessionDropdown
  } = props

  const userCardText = isLoggedIn && authToken ? `Welcome ${authToken.substr(0,5)}` : 'Login'

  return (
    <div className={styles.container}>
      <UserCard className={styles.userCard} onClick={toggleSessionDropdown} text={userCardText} />
      {showSessionDropdown && <Dropdown onClickAway={toggleSessionDropdown} />}
    </div>
  )
}
