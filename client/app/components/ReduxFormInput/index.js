import React from 'react';
import Input from 'react-toolbox/lib/input/Input';
import styled from 'styled-components';

const Container = styled.div`
    padding-right: 1rem;
`;

export default function renderInput({ input, label, meta: { error }, ...custom }) {
  return (
    <Container>
      <Input
        {...input}
        {...custom}
        label={label}
        error={error || ''}
      />
    </Container>
  );
}
