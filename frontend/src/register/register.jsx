import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";
import validator from "validator"
import ReCAPTCHA from "react-google-recaptcha"
import Swal from "sweetalert2"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptcha, setRecapcha] = useState(null)

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!recaptcha) {
      Swal.fire(
        'Login Failed!',
        'Please complete recaptcha!',
        'warning'
      )
      return;
    }

    const validasi = validator.isEmail(email)
    if (!validasi) {
      alert("Invalid Email Format")
      return
    }
  
    const data = {
      nama: fullName,
      username: username,
      email: email,
      password: password,
    };
  
    fetch("http://localhost:4100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Registrasi berhasil
          console.log("User registered successfully");
          // history.push("/login"); // Redirect ke halaman login
          window.location.replace("/");
        } else if (response.status === 400) {
          // Duplikat nama atau email
          response.text().then((errorMessage) => {
            alert(errorMessage);
          });
        } else {
          // Registrasi gagal
          console.log("Error registering user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleFacebookLogin = () => {
    try {
      window.location.href = "http://localhost:4100/auth/facebook";
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = () => {
    try {
      window.location.href = "http://localhost:4100/auth/google";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ fontSize: "15px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center" style={{ marginBottom: "-70px" }}>
            <img src="pic.gif" style={{ fontSize: "50px", marginBottom: "-160px" }} alt="" />
          </div>
          <Form className="mx-auto" style={{ maxWidth: "400px", marginTop: "200px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control type="text" placeholder="Enter your UserName" value={username} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div id="emailHelp" className="form-text" style={{ fontSize: "13px" }}>
                We recommend a work email address.
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontSize: "13px" }}>Password</Form.Label>
              {showPassword ? <AiOutlineEye style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} /> : <AiOutlineEyeInvisible style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} />}
              <Form.Control className="form-control-sm" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div id="emailHelp" className="form-text">
                Minimum length is 8 characters.
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3" onClick={handleSubmit}>
              Register
            </Button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
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
            <p style={{ fontSize: "13px", marginTop: "10px" }}>
              By clicking Register or registering through a third party you accept{" "}
              <Link to="#" style={{textDecoration: "none"}}>
                <span style={{ fontSize: "13px" }}>Terms of Use and acknowledge the Privacy and Cookie Policy</span>
              </Link>
            </p>
            <p style={{ fontSize: "13px", textAlign: "center" }}> Register with:</p>
            <div className="border-top" style={{ marginTop: "18px" }}>
              <div style={{ textAlign: "center", fontSize: "13px" }}></div>
            </div>
            <Button variant="light" size="sm" className="w-100 mt-3" onClick={googleLogin}>
              <FcGoogle style={{ marginTop: "-2" }}></FcGoogle> Google
            </Button>
            <Button variant="light" size="sm" className="w-100 mt-3" onClick={handleFacebookLogin}>
              <AiFillFacebook style={{ marginTop: "-2" }}></AiFillFacebook> Facebook
            </Button>
            <p style={{ textAlign: "center", marginTop: "12px" }}>
              Already have an account?{" "}
              <Link to="/" style={{textDecoration: "none"}}>
                <span>Sign in</span>
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
