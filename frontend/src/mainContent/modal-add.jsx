import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiMemoryCard } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    karyawan: "",
    insentif: "",
    jumlah: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4100/addData", formData);
      console.log(response.data);
      handleClose();
      window.location.replace("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message)
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="ps-2 mb-2">
        <Button className="me-2" variant="success" onClick={handleShow}>
          Add
        </Button>
      </div>

      <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="text-light" style={{ backgroundColor: "#248AAF" }}>
          <Modal.Title>
            {" "}
            <BiMemoryCard style={{ marginTop: "-7px", fontSize: "18px" }} /> Add Incentive/Allowance
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
              <Form.Control style={{ fontSize: "14px", color: "#767676" }} type="text" placeholder="Name" required name="karyawan" value={formData.karyawan} onChange={handleChange} />
            </div>
            <div className="col-4">
              <Form.Label htmlFor="disabledSelect">
                Allowance Type
                <span className="text-danger"> *</span>
              </Form.Label>
            </div>

            <div className="col-8">
              <Form.Select style={{ fontSize: "14px", color: "#767676" }} id="disabledSelect" name="insentif" value={formData.insentif} onChange={handleChange}>
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
              <Form.Control style={{ fontSize: "14px", color: "#767676" }} type="number" placeholder="00.00" required name="jumlah" value={formData.jumlah} onChange={handleChange} />
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
