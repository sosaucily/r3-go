import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-toolbox/lib/button'
import { createFormAction } from 'redux-form-saga'

import ReduxFormInput from 'shared/ReduxFormInput'

import styles from './styles.scss'

function LoginForm(props) {
  const { error, handleSubmit, submitActionPrefix, pristine, reset, submitting } = props
  const formAction = createFormAction(submitActionPrefix)

  return (
    <form onSubmit={handleSubmit(formAction)} className={styles.form}>
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
  )
}

export default reduxForm({
  form: 'login'
})(LoginForm)
