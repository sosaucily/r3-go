import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { addIndex, findIndex, equals, last, times } from 'ramda'
import { Tab, Tabs } from 'react-toolbox'

import AccountInfo from 'shared/AccountInfo'
import ProductCard from 'shared/ProductCard'

import styles from './MyAccountView.scss'

const navs = ['account', 'orders', 'contact']

export default class MyAccountView extends Component {
  constructor(props) {
    super(props)
    const index = this.getIndexFromProps(props)
    this.state = { tabIndex: index }
  }

  // Turn this into a higher order component for route-tab stuff
  componentWillReceiveProps(nextProps) {
    const index = this.getIndexFromProps(nextProps)
    this.setState({ tabIndex: index })
  }

  getIndexFromProps({ routes }) {
    const path = last(routes).path
    const index = findIndex(equals(path))(navs)
    return (index === -1) ? 0 : index
  }

  handleTabChange = (index) => {
    this.setState({tabIndex: index})
    const path = index ? `/${navs[index]}` : '' //prevents /account/account
    browserHistory.push(`/account${path}`)
  }

  render() {
    const timesWithIndex = addIndex(times)
    return (
      <div>
        <Tabs
            className={styles.tabs}
            index={this.state.tabIndex}
            onChange={this.handleTabChange}>
          <Tab label='My Account'>
            <AccountInfo />
          </Tab>
          <Tab label='My Orders'>
            <div className={styles.cardContainer}>
              {timesWithIndex(iter => { return (<ProductCard key={iter} />) }, 3)}
            </div>
          </Tab>
          <Tab label='Contact Info'>
            <div className={styles.cardContainer}>
              {timesWithIndex(iter => { return (<ProductCard key={iter} />) }, 3)}
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
