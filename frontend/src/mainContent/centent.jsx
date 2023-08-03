import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { BsGrid3X3GapFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Pagination from "../pagination/pagination";
import Modal from "./modal-add";
import DeleteContact from "./modal-delete";
import EditContact from "./modal-edit";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Tabel() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cookies] = useCookies(['token'])
  
  //fungsi untuk mengambil data dari server
  useEffect(() => {
    const getData = async () => {
      // Periksa apakah pengguna memiliki token yang valid
        try {
          // Kirim permintaan GET ke endpoint /home dengan token
           await axios.get("http://localhost:4100", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          // console.log(responseData)
        } catch (error) {
          console.log(error);
          // Jika terjadi kesalahan saat memverifikasi token, arahkan pengguna ke halaman login
      }
    };

    getData();
  }, [cookies.token]);

  //fungsi untuk menghapus data dari server
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4100/deleteData/${id}`);
      console.log(response.data.message);
      setData((prevData) => prevData.filter((users) => users.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
    //fungsi untuk pagination dari server
    useEffect(() => {
      const pagination = async () => {
        try {
          const response = await axios.get(`http://localhost:4100/data?halaman=${currentPage}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          setTotalPages(response.data.total_halaman);
          setData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      pagination();
    }, [currentPage, cookies.token]);
       
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  //fungsi untuk search data dari server
  useEffect(() => {
    const fetchData = async () => {
        try {
          // Kirim permintaan GET ke endpoint /home dengan token
          await axios.get(`http://localhost:4100/search?karyawan=${search}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
        } catch (error) {
          console.log(error);
      }
    };

    fetchData();
  }, [cookies.token, search]);

  //hitung data yang akan ditampilkan
  const dataHalaman = 10
  const index = (currentPage - 1) * dataHalaman + 1
  const endIndex = Math.min(currentPage * dataHalaman)
  
  return (
    <>
      <Container fluid style={{ backgroundColor: "#eaeaea" }}>
        <div className=" py-3" style={{ background: "#eaeaea" }}></div>
        <div className="border border-primary bg-light">
          <div className="text-light" style={{ background: "#248AAF" }}>
            <p className="p-3">
              <BsGrid3X3GapFill className="me-2" />
              INCENTIVE AND OTHER ALLOWANCE
            </p>
          </div>
          <Modal />

          <div className="row py-3" style={{ fontSize: "14px", color: "#767676", fontFamily: 'Lato,"Helvetica Neue",Arial,sans-serif' }}>
            <div className="col-md-4 col-sm-6 ms-2">
              <Form.Control style={{ fontSize: "14px", color: "#767676", fontFamily: 'Lato,"Helvetica Neue",Arial,sans-serif' }} type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="col-md-2 col-sm-6 text-end pt-1" id="show-entries">
              showing {index} - {endIndex} entries
            </div>
          </div>
          <Table striped bordered hover size="sm" style={{ fontSize: "14px", color: "#767676", fontFamily: 'Lato,"Helvetica Neue",Arial,sans-serif', textAlign: "center" }}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const searching = item.karyawan?.toLowerCase().includes(search.toLowerCase());
                if (!searching) {
                  return null;
                }
                return (
                  <tr key={item.id}>
                    <td>{item.karyawan}</td>
                    <td>{item.insentif}</td>
                    <td>{item.jumlah}</td>
                    <td className="d-flex justify-content-center">
                      <div className="me-2">
                        <EditContact item={item} />
                      </div>
                      <div>
                        <DeleteContact id={item.id} onDelete={deleteData} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </div>
      </Container>
    </>
  );
}
