import React, { Component } from 'react'
import './Footer.scss'

export default class Footer extends Component {
  componentDidMount() {
    const { getSha } = this.props
    getSha()
  }

  render () {
    const { sha } = this.props
    return (
      <div>
        {sha}
      </div>
    )
  }
}
