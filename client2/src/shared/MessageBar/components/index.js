import React from 'react'

import { Snackbar } from 'react-toolbox'

export default function MessageBar({ active, message, clearMessage }) {
  return (
    <Snackbar
        action='Dismiss'
        active={active}
        icon='question_answer'
        label={message}
        timeout={4000}
        onClick={clearMessage}
        onTimeout={clearMessage}
        type='warning' />
  )
}
