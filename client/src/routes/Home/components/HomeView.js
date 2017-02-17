import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { addIndex, findIndex, equals, times } from 'ramda'
import { Tab, Tabs } from 'react-toolbox'

import ProductCard from 'shared/ProductCard'

import styles from './HomeView.scss'

const navs = ['women', 'men', 'influencer', 'about']

class HomeView extends Component {
  constructor(props) {
    super(props)

    const path = props.route.path

    const index = path ? findIndex(equals(path))(navs) : 0
    this.state = {
      tabIndex: index
    }
    console.log(`path ${path} index ${index}`)
  }

  handleTabChange = (index) => {
    console.log(`path /${navs[index]} index ${index}`)
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

export default HomeView
