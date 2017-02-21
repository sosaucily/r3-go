import { connect } from 'react-redux'
import { pick } from 'ramda'
import { fetchUserInfo } from '../modules/'

import AccountInfo from '../components/'

const mapDispatchToProps = {
  fetchUserInfo
}

const mapStateToProps = (state) => {
  const keys = ['name']
  return pick(keys, state.accountinfo)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
