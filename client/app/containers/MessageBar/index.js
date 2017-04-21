import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';
import { createStructuredSelector } from 'reselect';

import { clearMessage } from './actions';
import { selectActive, selectMessage } from './selectors';

function MessageBar({ active, message, clearMessage }) {
  return (
    <Snackbar
      action="Dismiss"
      active={active}
      icon="question_answer"
      label={message}
      timeout={4000}
      onClick={clearMessage}
      onTimeout={clearMessage}
      type="warning"
    />
  );
}

const mapStateToProps = createStructuredSelector({
  active: selectActive,
  message: selectMessage,
});

export default connect(mapStateToProps, { clearMessage })(MessageBar);
