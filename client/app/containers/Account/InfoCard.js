import React from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 30px;
`;

export default function ProductCard({ subtitle }) {
  return (
    <Container>
      <Card style={{ width: '300px' }}>
        <CardTitle
          subtitle={subtitle}
        />
      </Card>
    </Container>
  );
}
