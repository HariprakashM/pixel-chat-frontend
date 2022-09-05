import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  Button } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png'
function Navigation() {
  const user=useSelector((state)=>state.user);
  const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <LinkContainer to="/">
            {/* <Navbar.Brand><img src={logo} style={{width:30, height:30}}/></Navbar.Brand> */}
            <Navbar.Brand className='d-flex justify-content-center align-items-center'>
              <i className="fas fa-comments" style={{width:"30px", height:"30px"}}></i>
              <h4>Pixel Chat</h4>
              </Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            
            <LinkContainer to="/chat">
            <Nav.Link><h5>Chat</h5></Nav.Link>
            </LinkContainer>
            {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}

                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {!user && (<LinkContainer to="/login">
            <Nav.Link><h5>Login</h5></Nav.Link>
            </LinkContainer>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;