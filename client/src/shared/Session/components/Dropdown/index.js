import React from 'react'
import { browserHistory } from 'react-router'
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list'

import withClickAway from 'shared/ClickAway'
import LoginForm from '../LoginForm'

import styles from './styles.scss'

function Dropdown({ isLoggedIn, loginAsync, onClickAway }) {
  const loginForm = () => {
    return <LoginForm onSubmit={loginAsync} onClickAway={onClickAway} />
  }

  const userDropdown = () => {
    return (
      <List className={styles.list} selectable ripple>
        <ListItem
            caption='My Account'
            leftIcon='account_circle'
            onClick={() => { browserHistory.push('/account'); onClickAway() }} />
        <ListItem caption='Coming Soon' leftIcon='announcement' disabled />
        <ListDivider />
        <ListItem caption='Log Out' leftIcon='exit_to_app' />
      </List> )
  }

  return (
    <div className={styles.container}>
      { isLoggedIn ? userDropdown() : loginForm() }
    </div>
  )
}

export default withClickAway(Dropdown)
