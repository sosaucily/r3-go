import { connect } from 'react-redux'
import { pick } from 'ramda'

import MessageBar from '../components'
import { clearMessage } from '../modules'

const mapStateToProps = (state) => {
  const keys = ['active', 'message']
  return pick(keys, state.messageBar)
}

export default connect(mapStateToProps, { clearMessage })(MessageBar)
