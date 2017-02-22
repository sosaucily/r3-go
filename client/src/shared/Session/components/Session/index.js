import React, { Component }  from 'react'
import debounce from 'debounce'

import Dropdown from '../../containers/Dropdown'
import UserCard from '../UserCard'

import styles from './styles.scss'

export default class Session extends Component {
  constructor(props) {
    super(props)
    this.debouncedToggle = debounce(props.toggleSessionDropdown, 200)
  }

  render() {
    const {
      isLoggedIn,
      authToken,
      showSessionDropdown
    } = this.props

    const userCardText = isLoggedIn && authToken ? `Welcome ${authToken.substr(0,5)}` : 'Login'

    return (
      <div className={styles.container}>
        <UserCard className={styles.userCard} onClick={this.debouncedToggle} text={userCardText} />
        {showSessionDropdown && <Dropdown onClickAway={this.debouncedToggle} />}
      </div>
    )
  }
}
