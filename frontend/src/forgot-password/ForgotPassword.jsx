import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"

export default function ForgotPassword() { 
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Buat objek data dengan email dan password
        const data = { usernameOrEmail };
        console.log(data);
        try {
          const response = await axios.post("http://localhost:4100/forgot-password", data, {
            withCredentials: true,
          });
          console.log(response);
          if (response.data.message === "Email Has send success!") {
            // alert(response.data.message)
            Swal.fire(
              'Success!',
              response.data.message,
              'success'
            )
            navigate("/")
          }
        } catch (error) {
          console.log(error);
          alert("Username atau Password Salah");
        }
      };
  return (
    <>
     <Container style={{ fontSize: "15px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center" style={{ marginBottom: "-70px" }}>
            <img src="/pic.gif" style={{ fontSize: "50px", marginBottom: "-160px" }} alt="" />
          </div>
          <Form className="mx-auto" style={{ maxWidth: "400px", marginTop: "200px" }} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="text"
              placeholder="Enter your email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </Form.Group>
            
            <div style={{fontSize: "15px", marginTop: "1px", textAlign: "left"}}>
            <span style={{color: "red"}}>* </span>Requires a verified email address.
            </div>
            <div style={{marginTop: "-4px"}}>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Reset Password
              </Button>
            </div>
            <div className="mt-1">
                <p style={{ fontSize: "13px", textAlign: "center" }}>
                    Already have an account? 
                <Link to="/" style={{textDecoration: "none"}}>
                    <span style={{ fontSize: "13px" }}> Sign In</span>
                </Link>
            </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  )
}
