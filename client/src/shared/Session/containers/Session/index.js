import { connect } from 'react-redux'
import { pick } from 'ramda'
import { login, toggleSessionDropdown } from '../../modules/Session'

import Session from '../../components/Session'

const mapDispatchToProps = {
  login,
  toggleSessionDropdown
}

const mapStateToProps = (state) => {
  const keys = ['isLoggedIn', 'authToken', 'showSessionDropdown']
  return pick(keys, state.session)
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
