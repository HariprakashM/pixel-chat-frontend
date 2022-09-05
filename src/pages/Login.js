import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import './login.css'
function Login() {
  const navigate = useNavigate();
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    function handleLogin(e){
        e.preventDefault();
        loginUser({ email, password }).then(({ data }) => {
          if (data) {
              // socket work
              socket.emit("new-user");
              // navigate to the chat
              navigate("/chat");
          }
      });
    }
  return (
    <Container>
        <Row>
            <Col md={6} className="login_bg"></Col>
            <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
        <Form style={{width:'80%',maxWidth:500}} onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {error && (<p className='alert alert-danger'>{error.data}</p>)}
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>(setemail(e.target.value))} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>(setpassword(e.target.value))} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        {isLoading ? (<Spinner animation="grow"/>) : "Login"}
      </Button>
      <div className='py-4'>
        <p className='text-center'>
            Dont't have an account ? <Link to="/signup">Signup</Link>
        </p>
        <div className="text-center credentials">
                <span>{`User : user@gmail.com`}</span><br/>
                <span>{`Admin : admin@gmail.com`}</span><br/>
                <span>{`Password : 123`}</span>
                </div>
      </div>
    </Form>
    </Col>
    </Row>
    </Container>
  );
    
}

export default Login;