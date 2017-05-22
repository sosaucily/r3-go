import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from 'react-toolbox/lib/button/Button';
import { createFormAction } from 'redux-form-saga';
import styled from 'styled-components';

import ReduxFormInput from 'components/ReduxFormInput';
import ErrorField from './ErrorField';
import FieldContainer from './FieldContainer';
import ButtonContainer from './ButtonContainer';

const FormContainer = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
`;

function LoginForm(props) {
  const { error, handleSubmit, submitActionPrefix, submitting } = props;
  const formAction = createFormAction(submitActionPrefix);

  return (
    <FormContainer onSubmit={handleSubmit(formAction)}>
      <FieldContainer>
        <Field
          name="email"
          type="text"
          hint="email"
          component={ReduxFormInput}
        />
        <Field
          name="password"
          type="text"
          hint="password"
          component={ReduxFormInput}
        />
      </FieldContainer>
      {error && !submitting && <ErrorField>{error}</ErrorField>}
      <ButtonContainer>
        <Button label="Login with Password" disabled={submitting} accent raisedg type="submit" />
      </ButtonContainer>
    </FormContainer>
  );
}

export default reduxForm({
  form: 'login',
})(LoginForm);
