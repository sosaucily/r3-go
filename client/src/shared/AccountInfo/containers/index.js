import { connect } from 'react-redux'
import { pick } from 'ramda'
import { fetchUserInfo } from '../modules/'

import AccountInfo from '../components/'

const mapDispatchToProps = {
  fetchUserInfo
}

const mapStateToProps = (state) => {
  return {
    name: state.accountInfo.name,
    isLoggedIn: state.session.isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
