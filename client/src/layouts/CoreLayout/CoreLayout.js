import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import Footer from '../../components/Footer/containers/FooterContainer'
import MessageBar from 'shared/MessageBar/containers'

import { readSessionCookie } from 'shared/Session/actions'

import classes from './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.readSessionCookie()
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

export default connect(null, { readSessionCookie })(CoreLayout)
