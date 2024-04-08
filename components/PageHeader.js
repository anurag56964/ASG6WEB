import React from 'react';
import { CardBody } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export const PageHeader = (props) => {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>{props.title}</Card.Body>
      </Card>
      <br/>
    </>
  );
};
