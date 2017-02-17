// We only need to import the modules necessary for initial render
import Home from './Home'
import HomeView from './Home/components/HomeView'
import MenRoute from './Men'
import WomenRoute from './Women'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : require('../layouts/CoreLayout').default, //http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react
  indexRoute  : Home,
  childRoutes : [
    WomenRoute(store),
    MenRoute(store),
    { path: 'influencer', component: HomeView },
    { path: 'about', component: HomeView },
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
