import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'contact',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Contact = require('../components/MyAccountView').default
      // const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'counter', reducer })

      /*  Return getComponent   */
      cb(null, Contact)

    /* Webpack named bundle   */
    }, 'contact')
  }
})
