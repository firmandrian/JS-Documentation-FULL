import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function Delete({ id, onDelete }) {
  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Your data will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          onDelete(id);
          swalWithBootstrapButtons.fire("Deleted!", "Your data has been deleted.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Cancelled", "Your data is safe!", "error");
        }
      });
  };
  return (
    <>
      <div className="ps-2 mb-2">
        <Button variant="danger" onClick={handleDelete}>
          <BsFillTrashFill style={{ fontSize: "15px" }} />
        </Button>
      </div>
    </>
  );
}
