import { connect } from 'react-redux'
import { pick } from 'ramda'
import { loginAsync, toggleSessionForm } from '../modules/session'

import Session from '../components/Session'

const mapDispatchToProps = {
  loginAsync,
  toggleSessionForm
}

const mapStateToProps = (state) => {
  const keys = ['isLoggedIn', 'authToken', 'showSessionForm']
  return pick(keys, state.session)
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
