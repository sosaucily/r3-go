import React, { Component } from 'react';

const events = ['mousedown', 'touchstart'];

export default function withClickAway(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.onClickAway = props.onClickAway;
    }

    componentDidMount() {
      this.handleClickAway = this.createClickAwayHandler(this.onClickAway);

      attach(this.handleClickAway);
    }

    componentDidUpdate() {
      release(this.handleClickAway);

      attach(this.handleClickAway);
    }

    componentWillUnmount() {
      release(this.handleClickAway);
    }

    createClickAwayHandler(callback) {
      return (event) => (this.isDescendant(event.target))
        ? null
        : callback(event);
    }

    isDescendant(target) {
      if (this.isDoneRecursing(target)) {
        return this.node === target;
      }

      return this.isDescendant(target.parentNode);
    }

    isDoneRecursing(target) {
      return this.node === target || target.parentNode === null;
    }

    render() {
      return (
        <div ref={(node) => { this.node = node; }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

function attach(callback) {
  events.forEach((event) => document.addEventListener(event, callback));
}

function release(callback) {
  events.forEach((event) => document.removeEventListener(event, callback));
}
