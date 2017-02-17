import React, { Component }  from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-toolbox/lib/button'
import debounce from 'debounce'

import ReduxFormInput from 'shared/ReduxFormInput'
import UserCard from 'shared/UserCard'
import withClickAway from 'shared/ClickAway'

import styles from './styles.scss'

function SessionForm(props) {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <div className={styles.dropDown}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldContainer}>
          <Field
            name="email"
            type="text"
            hint="email"
            className={styles.inputFields}
            component={ReduxFormInput} />
          <Field
            name="password"
            type="text"
            hint="password"
            className={styles.inputFields}
            component={ReduxFormInput} />
        </div>
        {error && !submitting && <div className={styles.error}>{error}</div>}
        <div className={styles.buttonContainer}>
          <Button label='Login' disabled={submitting} accent type="submit" />
        </div>
      </form>
    </div>
  )
}

SessionForm = withClickAway(reduxForm({
  form: 'session'
})(SessionForm))

export default class Session extends Component {
  constructor(props) {
    super(props)
    this.debouncedToggle = debounce(props.toggleSessionForm, 200)
  }

  render() {
    const {
      isLoggedIn,
      loginAsync,
      authToken,
      showSessionForm
    } = this.props

    const userCardText = isLoggedIn ? `Welcome ${authToken.substr(0,5)}` : 'Login'

    return (
      <div className={styles.container}>
        <UserCard className={styles.userCard} onClick={this.debouncedToggle} text={userCardText} />
        {showSessionForm && <SessionForm onSubmit={loginAsync} onClickAway={this.debouncedToggle} />}
      </div>
    )
  }
}
