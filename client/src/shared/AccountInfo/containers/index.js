import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchUserInfo } from '../modules/'
import { selectName } from '../selectors'
import { selectIsLoggedIn } from 'shared/Session/selectors'

import AccountInfo from '../components/'

const mapDispatchToProps = {
  fetchUserInfo
}

const mapStateToProps = createStructuredSelector({
    name: selectName,
    isLoggedIn: selectIsLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
