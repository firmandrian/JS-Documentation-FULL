import Navbar from "./navbar";
import Content from "../mainContent/centent";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const checkToken = async () => {
      //validasi untuk user apakah memiliki token atau tidak
      if (!cookies.token) {
        navigate("/");
      } else {
        try {
          // Kirim permintaan GET ke endpoint home dengan token
          const response = await fetch("http://localhost:4100/home", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          const responseData = await response.json();
          // console.log(responseData);
          if (!responseData.success) {
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          navigate("/");
        }
      }
    };

    checkToken();
  }, [cookies.token, navigate]);

  return (
    <>
      <Navbar />
      <Content />
    </>
  );
}
