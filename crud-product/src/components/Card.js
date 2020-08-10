import React, { useState, useEffect } from 'react';
import { Card, Button, Imgage } from 'react-bootstrap'
import ProductForm from './ProductForm';
import firebaseDb from '../firebase';

const CardItem = () => {
  var [currentId, setCurrentId] = useState('');
  var [productObjects, setProductObjects] = useState({});

  useEffect(() => {
    firebaseDb.child('products').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setProductObjects({
          ...snapshot.val(),
        });
      }
    });
  }, []);
  return (
    <>
      <div className="row">
        {Object.keys(productObjects).map((key) => (
          <Card style={{ width: '18rem' }} key={key}>
            <Card.Img variant="top" src={productObjects[key].image} />
            <Card.Body >
              <Card.Title>{productObjects[key].name}</Card.Title>
              <Card.Text>{productObjects[key].price}</Card.Text>
              <Button variant="primary">Add to cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CardItem;
