import { connect } from 'react-redux'
import { pick } from 'ramda'
import { loginAsync, toggleSessionDropdown } from '../../modules/session'

import Session from '../../components/Session'

const mapDispatchToProps = {
  loginAsync,
  toggleSessionDropdown
}

const mapStateToProps = (state) => {
  const keys = ['isLoggedIn', 'authToken', 'showSessionDropdown']
  return pick(keys, state.session)
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
