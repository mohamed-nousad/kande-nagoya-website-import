import React from "react";

export default function Pagination2({ itemLength = 0, itemPerPage = 8, currentPage, setCurrentPage , onPageChange }) {
  const totalPages = Math.ceil(itemLength / itemPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange && onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <>
      <li onClick={() => handlePageClick(currentPage - 1)}>
        <a className="page-numbers style"><i className="far fa-angle-left" /></a>
      </li>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <li key={page}>
            <a
              className={`page-numbers ${currentPage === page ? "current" : ""}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li onClick={() => handlePageClick(currentPage + 1)}>
        <a className="page-numbers style"><i className="far fa-angle-right" /></a>
      </li>
    </>
  );
}