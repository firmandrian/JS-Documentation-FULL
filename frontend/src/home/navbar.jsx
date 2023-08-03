import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { AiOutlineDashboard, AiFillWarning } from "react-icons/ai";
import { BsCalendar3, BsBlockquoteLeft, BsGear, BsEnvelope, BsBoxArrowRight } from "react-icons/bs";
import axios from "axios";
import { BiWrench } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

export default function Navbars() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [waktu, setWaktu] = useState("");
  const [username, setUsername] = useState("");
  const [cookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookie.token) {
      const decodedToken = jwt_decode(cookie.token);
      /* const { username } = decodedToken;
      pada code diatas merupakan teknik "destructing assignment",
      ini adalah cara singkat untuk mengambil nilai dari objek maupun array ke variable berbeda.
      dan dibawah ini adalah code jika tidak ingin menggunakan destructing assignment
      */ 
      const username = decodedToken.username
      setUsername(username);
    }
  }, [cookie.token]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      setCurrentTime(time);
    }, 1000);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const options = { month: "long" };
    const monthName = new Intl.DateTimeFormat("en-US", options).format(date);
    const formattedDate = `${day} ${monthName} ${year}`;
    setCurrentDate(formattedDate);

    const hour = date.getHours();
    let says = "";

    if (hour >= 0 && hour < 12) {
      says = "Good Morning";
    } else if (hour >= 12 && hour <= 20) {
      says = "Good Evening";
    } else {
      says = "Good Night";
    }
    setWaktu(says);
    return () => clearInterval(clockInterval);
  }, []);

  const logout = async () => {
    try {
      const confirm = window.confirm("Apakah anda yakin ingin keluar?");
      if (confirm) {
        await axios.post("http://localhost:4100/logout", null, {
          withCredentials: true,
        });
        document.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-start">
        <div>
          <img src="pic.gif" style={{ width: "170px", marginTop: "-50px", marginBottom: "-50px" }} alt="" />
        </div>
        <span className="border-start"></span>
        <Link to="/home/chat" style={{ color: "black" }}>
          <BsEnvelope style={{ fontSize: "20px", marginLeft: "15px", marginTop: "25px", cursor: "pointer" }} />
        </Link>
        <span className="border-start ms-3"></span>
        <div className="me-auto"></div>
        <div className="lg d-flex align-items-end flex-column">
          <div className="mt-2" style={{ fontSize: "14px" }}>
            Time: {currentTime}
          </div>
          <div className="mt-2" style={{ fontSize: "14px" }}>
            Date: {currentDate}
          </div>
        </div>

        <span className="border-start ms-3"></span>
        <div className="lg d-flex align-items-end flex-column">
          <div className="mt-2 mx-3" style={{ fontSize: "14px", fontWeight: "bold" }}>
            {waktu} {username}!
          </div>
          <div className="mt-2 me-3" style={{ fontSize: "14px", cursor: "pointer" }} onClick={logout}>
            <BsBoxArrowRight style={{ textDecoration: "none", color: "black", marginTop: "-1px" }} /> Log Out
          </div>
        </div>
      </div>

      <Navbar style={{ background: "#eaeaea", borderBottom: "1px solid black" }} expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <div className="text-center">
                <AiOutlineDashboard />
                <Nav.Link href="#action1">Dashboard</Nav.Link>
              </div>

              <div className="text-center">
                <BsCalendar3 />
                <NavDropdown title="Attendence" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action 2</NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="text-center">
                <BsBlockquoteLeft />
                <NavDropdown title="Leave" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action 3</NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="text-center ms-3">
                <AiFillWarning />
                <NavDropdown title="Infraction" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action 4</NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="text-center ms-3">
                <BsGear />
                <NavDropdown title=" Configuration" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action 5</NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="text-center ms-3">
                <BiWrench />
                <NavDropdown title="Settings" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action 6</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
