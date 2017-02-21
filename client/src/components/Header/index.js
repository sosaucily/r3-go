import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from 'react-toolbox/lib/button'

import Session from 'shared/Session/'

import styles from './styles.scss'

export default class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Link to='/'>
            <Button
                icon='arrow_back'
                floating />
          </Link>
        </div>
        <h1>React Redux Starter Kit</h1>
        <Session />
      </div>
    )
  }
}
