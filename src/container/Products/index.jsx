import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Col, Row, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.action";
import Modal from "../../components/UI/Modal";
/**
 * @author
 * @function Products
 **/
//Modal functions

const Products = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescrition] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  
  const product = useSelector((state)=> state.product);
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("quantity", quantity);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

  //To show category in options
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
 
  const renderProducts = () => {
    return(
      <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.products.length > 0 ?
                 ( product.products.map(product=>
                  <tr key={product._id} >
                    <td>1</td>
                    <td> {product.name} </td>
                    <td> {product.price} </td>
                    <td> {product.quantity} </td>
                    <td> {product.description} </td>
                    <td> pic </td>
                  </tr>)
                  ): null
                }
                
              </tbody>
            </Table>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            { renderProducts() }
          </Col>
        </Row>
      </Container>

      <Modal show={show} title={"Add Product"} handleClose={handleClose}>
        <Input
          value={name}
          placeholder={`Product name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={quantity}
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescrition(e.target.value)}
        />
        <Input
          value={price}
          placeholder={`Product Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        {/* uploading image */}
        <Input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    </Layout>
  );
};

export default Products;
