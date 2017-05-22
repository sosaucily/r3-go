import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { setFacebookAuthData as setFBAuthDataAction } from '../actions';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
`;

function FacebookAuthButton({ setFacebookAuthData }) {
  return (
    <ButtonContainer>
      <FacebookLogin
        appId={FACEBOOK_APP_ID} /* global FACEBOOK_APP_ID */
        autoLoad={false}
        fields="name,first_name,last_name,email,picture"
        scope="public_profile,email"
        callback={setFacebookAuthData}
        icon="fa-facebook"
        size="small"
        textButton="Login with Facebook"
      />
    </ButtonContainer>
  );
}

// Connect
const mapDispatchToProps = { setFacebookAuthData: setFBAuthDataAction };
const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuthButton);
