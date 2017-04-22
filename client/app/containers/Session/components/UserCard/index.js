import React from 'react';
import styled from 'styled-components';

import Avatar from 'components/Avatar';
import UserDataField from './UserDataField';

const Container = styled.div`
    align-items: center;
    color: #666662
    cursor: pointer;
    display: flex;
    font-family: Lato Light,sans-serif;
    height: 100%;
    padding: 0 20px;
`;

export default function UserCard({ avatar, onClick, text }) {
  return (
    <Container onClick={onClick}>
      <Avatar image={avatar} />
      <div style={{ marginLeft: '15px' }}>
        <UserDataField>{text}</UserDataField>
      </div>
    </Container>
  );
}
