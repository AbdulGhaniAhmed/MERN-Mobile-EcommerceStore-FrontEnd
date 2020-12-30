import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../actions/user.action";

/**
 * @author
 * @function Signup
 **/

 
const Signup = (props) => {

  const [firstName,setFirstname] = useState('');
  const [lastName,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();

  const userSignUp = (e) =>{
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password
    }
    dispatch(signup(user));
  }
  //work as mapStatetoProps, useSelector Allows you to extract data from the Redux store state
  const auth = useSelector(state=>state.auth)
  const user = useSelector(state=>state.user)

  //stop user from going back to signin page after login  
  if(auth.authenticate){
    return <Redirect to='/' />
  }

  if(user.loading){
    return <p>loading...</p>
  }
  

  return (
    <Layout>
      {user.message}
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: "6", offset: "3" }}>
            <Form onSubmit={userSignUp}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                label="Email Address"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
