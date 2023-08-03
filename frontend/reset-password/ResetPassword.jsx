import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2"
import ReCAPTCHA from "react-google-recaptcha";

export default function ResetPassword() { 
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {id, token} = useParams();
    const [recaptcha, setRecapcha] = useState(null);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!recaptcha) {
          Swal.fire(
            'Reset Password Failed!',
            'Please complete recaptcha!',
            'warning'
          )
          return;
        }
        // Buat objek data dengan email dan password
        const data = { newPassword };
        console.log(data);
        try {
          const response = await axios.post(`http://localhost:4100/reset-password/${id}/${token}`, data, {
            withCredentials: true,
          });
          console.log(response);
          if (response.data.message === "Password reset success!") {
            // alert(response.data.message);
            Swal.fire(
              'Success!',
              response.data.message,
              'success'
            )
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          alert("Username atau Password Salah");
        }
      };

      const passwordVisibility = () => {
        setShowPassword(!showPassword)
      }
  return (
    <>
     <Container style={{ fontSize: "15px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center" style={{ marginBottom: "-70px" }}>
            <img src="/pic.gif" style={{ fontSize: "50px", marginBottom: "-160px" }} alt="" />
          </div>
          <Form className="mx-auto" style={{ maxWidth: "400px", marginTop: "200px" }} onSubmit={handleLogin}>
          <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontSize: "13px" }}>New Password</Form.Label>
              {showPassword ? <AiOutlineEye style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} /> : <AiOutlineEyeInvisible style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} />}
              <Form.Control 
              className="form-control-sm" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              required />
            </Form.Group>
            
            <div style={{marginTop: "-4px"}}>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Update Password
              </Button>
            </div>
            <div  style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
              <ReCAPTCHA
                sitekey="6LcCfHQnAAAAADGS5ItdL4_KztpEppJ-dj3K6Wg9"
                onChange={(response) => {
                  console.log('Captcha value:', response);
                  setRecapcha(response)
                }}
                onExpired={() => {
                  console.log('Captcha expired');
                  setRecapcha(null)
                }}
            />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  )
}
