import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillFacebook } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"
import Swal from "sweetalert2"

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptcha, setRecapcha] = useState(null);
  const [expired, setExpired] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!recaptcha) {
      Swal.fire(
        'Login Failed!',
        'Please complete recaptcha!',
        'warning'
      )
      return;
    }
    // Api Login User
    const data = { usernameOrEmail, password };
    console.log(data);
    try {
      const response = await axios.post("http://localhost:4100/login", data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        navigate("/home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Username or Password invalid");
    }
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Api OAuth Facebook
  const handleFacebookLogin = () => {
    try {
      (window.location.href = "http://localhost:4100/auth/facebook"),
        {
          withCredentials: true,
        };
    } catch (error) {
      console.log(error);
    }
  };

  //Api OAuth Google
  const googleLogin = () => {
    try {
      (window.location.href = "http://localhost:4100/auth/google"),
        {
          withCredentials: true,
        };
    } catch (error) {
      console.log(error);
    }
  };

  //fungsi untuk mengecek jika RECAPTCHA expired
  const handleRecaptchaExpired = () => {
    console.log("Captcha Expired");
    setExpired(true);
    setRecapcha(null);
  }
  useEffect(() => {
    let timeout;
    if (expired) {
      timeout = setTimeout(() => setExpired(false), 6000);
    }
    return () => clearTimeout(timeout)
  }, [expired])

  return (
    <Container style={{ fontSize: "15px" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center" style={{ marginBottom: "-70px" }}>
            <img src="pic.gif" style={{ fontSize: "50px", marginBottom: "-160px" }} alt="" />
          </div>
          <Form className="mx-auto" style={{ maxWidth: "400px", marginTop: "200px" }} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Email Or Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your email or username" onChange={(e) => setUsernameOrEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontSize: "13px" }}>Password</Form.Label>
              {showPassword ? <AiOutlineEye style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} /> : <AiOutlineEyeInvisible style={{ marginLeft: "4px", cursor: "pointer" }} onClick={passwordVisibility} />}
              <Form.Control className="form-control-sm" type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <div style={{fontSize: "13px", marginTop: "4px", textAlign: "right"}}>
               <Link to="/login/forgot-password" style={{textDecoration: "none"}}>Forgot your password?</Link>
            </div>
            <div style={{marginTop: "-4px"}}>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Sign In
              </Button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
                <ReCAPTCHA
                  sitekey="6LcCfHQnAAAAADGS5ItdL4_KztpEppJ-dj3K6Wg9"
                  onChange={(response) => {
                    console.log('Captcha value:', response);
                    setRecapcha(response)
                  }}
                  onExpired={handleRecaptchaExpired}
                />
            </div>
            <p style={{ fontSize: "13px", marginTop: "20px" }}>
              By signing in you accept the{" "}
              <Link href="#" style={{textDecoration: "none"}}>
                <span style={{ fontSize: "13px" }}>Terms of Use and acknowledge the Privacy and Cookie Policy</span>
              </Link>
            </p>
            <p style={{ fontSize: "13px", textAlign: "center" }}>
              Don't have and account yet?{" "}
              <Link to="/register" style={{textDecoration: "none"}}>
                <span style={{ fontSize: "13px" }}>Register now</span>
              </Link>
            </p>
            <div className="border-top" style={{ marginTop: "18px" }}>
              <div style={{ textAlign: "center", fontSize: "13px" }}></div>
            </div>
            <Button variant="light" size="sm" className="w-100 mt-3" onClick={googleLogin}>
              <FcGoogle style={{ marginTop: "-2" }}></FcGoogle> Google
            </Button>
            <Button variant="light" size="sm" className="w-100 mt-3" onClick={handleFacebookLogin}>
              <AiFillFacebook style={{ marginTop: "-2" }}></AiFillFacebook> Facebook
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
