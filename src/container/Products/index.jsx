import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Col, Row, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import Modal from "../../components/UI/Modal";
import { generatePublicURL } from '../../urlConfig'
import "./style.css";
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
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    //To append data in db in form of 'Form'
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

  //To show category in options in modal
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

  //Display product details in table
  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => showProductDetailModal(product)}
                  key={product._id}
                >
                  <td>1</td>
                  <td> {product.name} </td>
                  <td> {product.price} </td>
                  <td> {product.quantity} </td>
                  <td> {product.category.name} </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  //Add new product and open modal on click on add button
  const AddNewProductModal = () => {
    return (
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
    );
  };

  const showProductDetailModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  //Show product details modal on click on a product name
  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        title={"Product Details"}
        handleClose={handleCloseProductDetailModal}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value"> {productDetails.name} </p>
          </Col>
          <Col md="6">
            <label className="key">price</label>
            <p className="value"> {productDetails.price} </p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value"> {productDetails.quantity} </p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value"> {productDetails.category.name} </p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value"> {productDetails.description} </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* in multer I declared pic as "productPicture" while in model "productPic"  */}
            {/* so to upload I am using productPicture while just to display productPic */}
            <label className="key">Product Images</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPic.map((picture) => (
                <div className="productImageContainer">
                  <img
                          //URL of upload folder define in backend multer
                    src={ generatePublicURL(picture.img) }
                    alt="none"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  //.................................Main...............................
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
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {AddNewProductModal()}
      {renderProductDetailModal()}
    </Layout>
  );
};

export default Products;
