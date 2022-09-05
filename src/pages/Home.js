import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Row, Col, Button} from 'react-bootstrap'
import "./Home.css"
function Home() {
  return (
    <Row>
        <Col md={6} className="d-flex flex-direction align-items-center justify-content-center">
            <div>
                <h1>Share the world with your friends</h1>
                <p>Chat App lets you connect with the world</p>
                <LinkContainer to="/chat">
                    <Button variants="success">Get Started<i className="fas fa-play home-message-icon"></i></Button> 
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className="home_bg">
        </Col>
    </Row>
  )
}

export default Home