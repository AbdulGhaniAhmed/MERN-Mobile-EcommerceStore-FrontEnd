import React from "react";
import { Jumbotron, Row, Col, Container} from "react-bootstrap";
import Layout from "../../components/Layout";
import './style.css'

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
      <Row>
        <Col md={2} className='sidebar'>Sidebar</Col>
        <Col md={10} style={{marginLeft:'auto'}}>Conatiner</Col>
      </Row>
      </Container>
      {/* <Jumbotron className="text-center" style={{ margin: "5rem",background:"white"}}>
        <h1>Welcome to admin dashboard</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
      </Jumbotron> */}
    </Layout>
  );
};

export default Home;
