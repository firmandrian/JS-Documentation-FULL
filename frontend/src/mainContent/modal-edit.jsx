import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AiOutlineEdit } from "react-icons/ai";
import { BiMemoryCard } from "react-icons/bi";
import axios from "axios";

export default function EditContact({ item }) {
  // console.log(item);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [karyawan, setKaryawan] = useState("");
  const [insentif, setInsentif] = useState("");
  const [jumlah, setJumlah] = useState("");
   
  const getData = () => {
    // setId(item.id)
    setKaryawan(item.karyawan)
    setInsentif(item.insentif)
    setJumlah(item.jumlah)
  }
  useEffect(() => {
    getData()
  }, [])

const updateData = async () => {
  try {
    if (!karyawan || !insentif || !jumlah) {
      throw new Error("Data tidak boleh kosong");
    }

    const body = {
      karyawan: karyawan || item.karyawan,
      insentif: insentif || item.insentif,
      jumlah: jumlah || item.jumlah,
    };

    const response = await axios.put(
      `http://localhost:4100/editContact/${item.id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log(data);
    window.location.replace("/home");
    handleClose();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message);
    } else {
      alert(error.message);
    }
    console.log(error);
  }
};

  return (
    <>
      <Button variant="success" className="me-3" onClick={handleShow}>
        <AiOutlineEdit style={{ fontSize: "15px" }} />
      </Button>
      <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="text-light" style={{ backgroundColor: "#248AAF" }}>
          <Modal.Title>
            {" "}
            <BiMemoryCard style={{ marginTop: "-7px", fontSize: "18px" }} /> Edit Incentive/Allowance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px", color: "#767676", fontFamily: 'Lato,"Helvetica Neue",Arial,sans-serif' }}>
          <Form.Group className="mb-3 row g-2">
            <div className="col-4">
              <Form.Label htmlFor="disabledSelect">
                Employee Name
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>
            <div className="col-8">
              <Form.Control style={{ fontSize: "14px", color: "#767676" }} type="text" placeholder="Name" required defaultValue={item.karyawan} onChange={(e) => setKaryawan(e.target.value)} />
            </div>
            <div className="col-4">
              <Form.Label htmlFor="disabledSelect">
                Allowance Type
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>

            <div className="col-8">
              <Form.Select style={{ fontSize: "14px", color: "#767676" }} id="disabledSelect" defaultValue={item.insentif} onChange={(e) => setInsentif(e.target.value)}>
                <option value="">--All--</option>
                <option>Beckend Developer</option>
                <option>Front End Developer</option>
                <option>Fullstack Developer</option>
                <option>QA Engginer</option>
              </Form.Select>
            </div>
            <div className="col-4">
              <Form.Label htmlFor="disabledSelect">
                Incentive Amount
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>
            <div className="col-8">
              <Form.Control style={{ fontSize: "14px", color: "#767676" }} type="number" placeholder="00.00" required name="jumlah" defaultValue={item.jumlah} onChange={(e) => setJumlah(e.target.value)} />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
