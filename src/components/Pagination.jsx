import React from "react";

function Pagination({ recipesPerPage, totalRecipes, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button
                            id={number}
                            style={
                                number === currentPage
                                    ? {
                                          backgroundColor: "#0e352d",
                                          color: "white",
                                      }
                                    : {}
                            }
                            onClick={() => paginate(number)}
                            className="page-link"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
