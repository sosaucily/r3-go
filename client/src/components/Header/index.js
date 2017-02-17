import React, { Component } from 'react'

import Session from 'shared/Session/'

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>React Redux Starter Kit</h1>
        <Session />
      </div>
    )
  }
}
