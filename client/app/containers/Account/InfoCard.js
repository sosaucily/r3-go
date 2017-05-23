import React from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 30px;
`;

export default function ProductCard({ subtitle, text }) {
  return (
    <Container>
      <Card style={{ width: '100%' }}>
        <CardTitle
          subtitle={subtitle}
        />
        <CardText><pre>{text}</pre></CardText>
      </Card>
    </Container>
  );
}
