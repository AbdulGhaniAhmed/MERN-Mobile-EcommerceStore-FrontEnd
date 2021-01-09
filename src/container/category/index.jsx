import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions";
import Input from "../../components/UI/Input";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState("");
  const [categoryImage, setcategoryImage] = useState("");

  //Display categories
  const renderCategories = (categories) => {
    const myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li>
          {category.name}
          {/* its a recursive call to show children of categories */}
          {category.children.length > 0 ? (<ul>{ renderCategories(category.children) }</ul>) : null }
        </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) =>{
    setcategoryImage(e.target.files[0])
  }


  //Modal functions
  const [show, setShow] = useState(false);

  //function to post data in shape of form 
  const handleClose = () => {
    
    const form =new FormData();

    form.append('name',categoryName);
    form.append('parentId',parentCategoryId);
    form.append('categoryImage',categoryImage);
    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage
    // };
    // console.log(cat)
    dispatch(addCategory(form));
    
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <Layout sidebar>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Category</h3>
            <button onClick={handleShow}>Add</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {renderCategories(category.categories)}
            {JSON.stringify(createCategoryList(category.categories))}
          </ul>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={categoryName}
            placeholder={`Category name`}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setparentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map(option => 
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            )}
          </select>
          {/* uploading image */}
          <Input type='file' name='categoryImage' onChange={handleCategoryImage} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Category;
