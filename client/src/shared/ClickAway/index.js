import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const events = ['mousedown', 'touchstart']

export default function withClickAway(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.onClickAway = props.onClickAway
    }

    componentDidMount() {
      this.element = ReactDOM.findDOMNode(this)
      this.handleClickAway = this.createClickAwayHandler(this.onClickAway)

      attach(this.handleClickAway)
    }

    componentDidUpdate() {
      release(this.handleClickAway)

      attach(this.handleClickAway)
    }

    componentWillUnmount() {
      release(this.handleClickAway)
    }

    createClickAwayHandler(callback) {
      return event => (this.isDescendant(event.target))
        ? null
        : callback(event)
    }

    isDescendant(target) {
      if (this.isDoneRecursing(target)) {
        return this.element === target
      }

      return this.isDescendant(target.parentNode)
    }

    isDoneRecursing(target) {
      return this.element === target || target.parentNode === null
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

function attach(callback) {
  events.forEach(event => document.addEventListener(event, callback))
}

function release(callback) {
  events.forEach(event => document.removeEventListener(event, callback))
}
