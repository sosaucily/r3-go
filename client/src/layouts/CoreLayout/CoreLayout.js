import React, { Component, PropTypes } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer/containers/FooterContainer'
import MessageBar from 'shared/MessageBar/containers'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export default class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='container text-center'>
        <Header />
        <div className={classes.mainContainer}>
          {this.props.children}
        </div>
        <MessageBar />
        <Footer />
      </div>)
  }
}
