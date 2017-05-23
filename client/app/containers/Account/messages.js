import { defineMessages } from 'react-intl';

export default defineMessages({
  loggedIn: {
    id: 'boilerplate.containers.Account.loggedIn',
    defaultMessage: 'welcome {name}, you are authenticated and have a valid token',
  },
  loggedOut: {
    id: 'boilerplate.containers.Account.loggedOut',
    defaultMessage: 'No session, no valid token, please log in',
  },
  tabs: {
    personal: {
      id: 'boilerplate.containers.Account.tabs.personal',
      defaultMessage: 'Personal Info',
    },
    orders: {
      id: 'boilerplate.containers.Account.tabs.orders',
      defaultMessage: 'Order History',
    },
  },
});
