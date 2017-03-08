import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSha } from '../actions'

import './styles.scss'

class Footer extends Component {
  componentDidMount() {
    const { getSha } = this.props
    getSha()
  }

  render () {
    const { sha } = this.props
    return (
      <div>
        deployed sha: {sha}
      </div>
    )
  }
}


const mapDispatchToProps = {
  getSha
}

const mapStateToProps = (state) => {
  return {
    sha : state.footer.sha
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
