import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list'
import { createStructuredSelector } from 'reselect'

import { selectAuthToken, selectIsLoggedIn } from '../selectors'
import { login, logout } from '../actions'
import withClickAway from 'shared/ClickAway'
import LoginForm from '../components/LoginForm'

import styles from './styles.scss'

function Dropdown({ isLoggedIn, login, logout, onClickAway }) {
  const loginForm = () => {
    return <LoginForm onSubmit={login} onClickAway={onClickAway} />
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
        <ListItem
            caption='LogOut'
            leftIcon='exit_to_app'
            onClick={logout}
        />
      </List> )
  }

  return (
    <div className={styles.dropdown_container}>
      { isLoggedIn ? userDropdown() : loginForm() }
    </div>
  )
}

//Connect
const mapDispatchToProps = { login, logout }
const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken,
  isLoggedIn: selectIsLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withClickAway(Dropdown)
)
