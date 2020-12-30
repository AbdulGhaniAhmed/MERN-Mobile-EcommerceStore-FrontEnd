import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../../actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const logout = (e) =>{
    e.preventDefault();
    dispatch(signout())
  }

  const renderNoNLoggedInLinks = () =>{
    return(
      <Nav>
            <li className='nav-item'>
            <NavLink to="/signin" className='nav-link'>SignIn</NavLink>
            </li>
            <li className='nav-item'>
            <NavLink to="/signup" className='nav-link'>SignUp</NavLink>
            </li>
      </Nav>
    )
  }

  const renderLoggedInLinks = () =>{
    return(
      <Nav>
            <li className='nav-item'>
            <NavLink to='/signin' className='nav-link' onClick={logout}>SignOut</NavLink>
            </li>
      </Nav>
    )
  }

  return(
    <Container fluid style ={{padding:'0rem'}}>
                                                             {/*zIndex in nabar usage */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex:'1'}}>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to='/' className='navbar-brand'>Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNoNLoggedInLinks()}
        </Navbar.Collapse>
      </Navbar>
    </Container>
    
   )

 }

export default Header