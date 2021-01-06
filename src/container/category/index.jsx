import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';

/**
* @author
* @function Category
**/

const Category = (props) => {

  const category = useSelector(state=>state.category);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCategory());
  },[]);

  const renderCategories = (categories) => {
    const myCategories = [];
    for(let category of categories)
    {
      myCategories.push(
        <li>{category.name}</li>
      )
    }
    return myCategories;
  }
//Modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Layout sidebar>
      <Row>
        <Col md={12}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>Category</h3>
                <button onClick={handleShow}>Add</button>
            </div>
        </Col>
        </Row>
        <Row>
          <Col>
          <ul>
            {renderCategories(category.categories)}
          </ul>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
   )
  }


export default Category