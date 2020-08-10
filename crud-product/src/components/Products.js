import React, { useState, useEffect } from 'react';
import { Card, Button, Imgage } from 'react-bootstrap'
import ProductForm from './ProductForm';
import {DB, Storage} from '../firebase';
import Gongcha from '../asses/gongcha.jpg'


const Products = () => {
  var [currentId, setCurrentId] = useState('');
  var [productObjects, setProductObjects] = useState({});
  const [ImageAsUrl, setImageAsUrl] = useState()
 

  useEffect(() => {
    DB.ref().child('products').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setProductObjects({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  const addOrEdit = (obj, image_url) => {
  
     let upload = Storage.ref().child(`product-img/${image_url.name}`).put(image_url)
      upload.on('state_changed', 
    (snapShot) => {
      
      console.log(snapShot)
    }, (err) => {
      
      console.log(err)
    }, () => {
      
      Storage.ref('product-img').child(image_url.name).getDownloadURL()
       .then(fireBaseUrl => {
        
        DB.ref().child('products').push({name: obj.name, image: fireBaseUrl, category: obj.category, price: obj.price}, (err) => {
        
          if (err) console.log(err);
          else setCurrentId('');
        })
   
       })
    })
      
    console.log("log imgage link", ImageAsUrl);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      DB.ref().child(`products/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId('');
      });
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Products Manager</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ProductForm {...{ currentId, productObjects, addOrEdit }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(productObjects).map((key) => (
                <tr key={key}>
                  <td>{productObjects[key].image}</td>
                  <td>{productObjects[key].name}</td>
                  <td>{productObjects[key].category}</td>
                  <td>{productObjects[key].price}</td>
                  <td className="bg-light">
                    <a
                      type="button"
                      className="btn text-primary"
                      onClick={() => {
                        setCurrentId(key);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </a>
                    <a
                      type="button"
                      className="btn text-danger"
                      onClick={() => {
                        onDelete(key);
                      }}
                    >
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
