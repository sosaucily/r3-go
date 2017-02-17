import React from 'react'
import Input from 'react-toolbox/lib/input'

export default function renderInput({ input, label, meta: { touched, error }, ...custom }) {
  return (
    <div>
      <Input
        {...input}
        {...custom}
        label={label}
        error={error || ''} />
    </div>
  )
}
