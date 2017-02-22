import { connect } from 'react-redux'
import { pick } from 'ramda'

import { login, logout } from '../../modules/Session'

import Dropdown from '../../components/Dropdown'

const mapDispatchToProps = { login, logout }

const mapStateToProps = state => {
  const keys = ['authToken', 'isLoggedIn']
  return pick(keys, state.session)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)
