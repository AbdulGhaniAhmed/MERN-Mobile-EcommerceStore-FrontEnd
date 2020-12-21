import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Input from '../../components/UI/Input'
/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  return (
    <Layout>
      <Container>
        <Row style={{marginTop:'50px'}}>
          <Col md={{span:'6', offset:'3'}}>
            <Form>
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

export default Signin;
