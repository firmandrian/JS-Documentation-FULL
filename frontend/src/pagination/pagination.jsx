import React from "react";

export default function Pagination({ currentPage, onPageChange, totalPages }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handleLastPageClick = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="d-flex flex-row-reverse mt-3" style={{ fontSize: "14px", color: "#767676", fontFamily: 'Lato,"Helvetica Neue",Arial,sans-serif' }} aria-label="...">
      <div className="me-3">
        <ul className="pagination pagination-sm">
          <li className="page-item px-1">
            <a className="page-link text-black rounded-5" onClick={() => handlePageClick(1)}>
              First
            </a>
          </li>
          <li className="page-item">
            <a className="page-link text-black rounded-5" href="#" aria-label="Previous" onClick={() => handlePageClick(1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <li key={pageNumber} className={`page-item${currentPage === pageNumber ? " active" : ""} px-1`}>
                <a className="page-link text-black rounded-5" onClick={() => handlePageClick(pageNumber)}>
                  {pageNumber}
                </a>
              </li>
            );
          })}
          <li className="page-item px-1">
            <a className="page-link text-black rounded-5" href="#" aria-label="Next" onClick={handleLastPageClick}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link text-black rounded-5" href="#" onClick={handleLastPageClick}>
              Last
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
