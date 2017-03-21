import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { addIndex, findIndex, equals, last, times } from 'ramda'
import { Tab, Tabs } from 'react-toolbox'

import ProductCard from 'shared/ProductCard'

import styles from './HomeView.scss'

const navs = ['women', 'men', 'influencer', 'about']

export default class HomeView extends Component {
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
    browserHistory.push(`/${navs[index]}`)
  }

  render() {
    const timesWithIndex = addIndex(times)
    return (
      <div>
        <Tabs
            className={styles.tabs}
            index={this.state.tabIndex}
            onChange={this.handleTabChange}>
          <Tab label='Shop Women'>
            <div className={styles.cardContainer}>
              {timesWithIndex(iter => { return (<ProductCard key={iter} />) }, 9)}
            </div>
          </Tab>
          <Tab label='Shop Men'>
            <div className={styles.cardContainer}>
              {timesWithIndex(iter => { return (<ProductCard key={iter} />) }, 9)}
            </div>
          </Tab>
          <Tab label='Become an influencer'>
            Some stuff about how to sign up.
          </Tab>
          <Tab label='About us'>
            More about our company
          </Tab>
        </Tabs>
      </div>
    )
  }
}
