import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <Container style={{ margin: "20px", padding: "20px" }}>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Lead Manager</Card.Title>
                <Card.Text>Create and Manage your leads here!</Card.Text>
                <Link to="/leads">
                  <Button variant="primary">Start</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>QR Code Generator</Card.Title>
                <Card.Text>
                  Generate quick QR codes and download them with your data!
                </Card.Text>
                <Link to="/qr-codes">
                  <Button variant="primary">Start</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Dashboard;
