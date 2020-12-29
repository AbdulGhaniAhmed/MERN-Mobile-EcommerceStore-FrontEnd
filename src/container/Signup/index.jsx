import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signup
 **/

 
const Signup = (props) => {

  //work as mapStatetoProps, useSelector Allows you to extract data from the Redux store state
  const auth = useSelector(state=>state.auth)

  //stop user from going back to signin page after login  
  if(auth.authenticate){
    return <Redirect to='/' />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: "6", offset: "3" }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    value=""
                    onChange={() => {}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    value=""
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Input
                label="Email Address"
                placeholder="Enter Email"
                type="email"
                value=""
                onChange={() => {}}
              />
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                value=""
                onChange={() => {}}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
