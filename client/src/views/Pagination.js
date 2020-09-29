import React from 'react'
import ReactPaginate from "react-paginate";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function Paginations({ totalposts ,paginate,totalusers}) {
    const pageNumbers = []
    if (totalposts) {
        for (let i = 1; i <= Math.ceil(totalposts / 10); i++) {
            pageNumbers.push(i)
        }
    } else {
         for (let i = 1; i <= Math.ceil(totalusers / 10); i++) {
           pageNumbers.push(i);
         }
    }
    
   
    return (
      <nav>
          <ul className="pagination">
              {pageNumbers.map(number => (
                  <li key={number} className="page-item">
                      <a onClick={()=>paginate(number)} className='page-link'>
                      {number}
                      </a>
                  </li>
          ))}

          </ul>

      </nav>
     
    //   <ReactPaginate
    //       previousLabel={"prev"}
    //       nextLabel={"next"}
    //       breakLabel={"..."}
    //       breakClassName={"break-me"}
    //       pageCount={pageCount}
    //       marginPagesDisplayed={2}
    //       pageRangeDisplayed={5}
    //       onPageChange={paginate()}
    //       containerClassName={"pagination"}
    //       subContainerClassName={"pages pagination"}
    //       activeClassName={'active'}
    //       />
    );
}

export default Paginations
