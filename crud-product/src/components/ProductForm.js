import React, { useState, useEffect } from 'react';
import Gongcha from '../asses/gongcha.jpg'

const ProductForm = (props) => {
  const initialFieldValues = {
    image: '',
    name: '',
    category: '',
    price: ''
  };

  var [values, setValues] = useState(initialFieldValues);
  var [imageFile, setImageAsFile] = useState();

  useEffect(() => {
    if (props.currentId == '') setValues({ ...initialFieldValues });
    else
      setValues({
        ...props.productObjects[props.currentId],
      });
  }, [props.currentId, props.productObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values, imageFile);
  };
  const handleImageAsFile = (e) => { // lấy event theo kiểu file vì file có kiểu event khác với text
    console.log("file image",e);
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-image"></i>
          </div>
        </div>
        <input
          className="form-control"
          type="file"
          name="image"
          placeholder="Image"
          value={values.image}
          onChange={handleImageAsFile}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mug-hot"></i>
            </div>
          </div>

          <input
            className="form-control"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-list-alt"></i>
            </div>
          </div>
          <input
            className="form-control"
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-money-check-alt"></i>
          </div>
        </div>
        <input
          className="form-control"
          name="price"
          placeholder="Price"
          value={values.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={props.currentId == '' ? 'Save' : 'Update'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ProductForm;
