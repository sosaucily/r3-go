import { connect } from 'react-redux'
import { getSha } from '../modules/footer'

import Footer from '../components/Footer'

const mapDispatchToProps = {
  getSha
}

const mapStateToProps = (state) => {
  return {
    sha : state.footer.sha
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
