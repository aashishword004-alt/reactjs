import { Link } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Showerror, Showmessage } from "./message";
import { getBaseUrl, getImageUrl } from "./comman";
export default function Admincategory() {
  let [iteams, setItams] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5; // how many rows per page

  // serach bar
  let [searchTerm, setSearchTerm] = useState("");

  let filteredItems = iteams.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm)
  );


  // ⬇ Pagination slice logic (put here)
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


  // delete category
  let deleteCategory = function (categoryId) {
    let apiaddres = getBaseUrl() + "delete_category.php?id=" + categoryId;
    console.log(apiaddres);
    axios({
      method: 'get',
      responseType: 'json',
      url: apiaddres
    }).then((response) => {
      console.log(response.data)
      let error = response.data[0]['error']
      if (error !== 'no') {
        Showerror(error)
      }
      else {
        let message = response.data[1]['message']
        // remove data from state array
        // fliter the state array
        let filetCategory = iteams.filter((current) => {
          if (current.id !== categoryId) {

            return current;
          }

        });
        console.log(filetCategory);
        setItams(filetCategory);
        Showmessage(message);

      }
    }).catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        console.log(error.code)

      }
    })
  }

  // display items 
  let display = function (item) {
    return (<tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td width="20%">
        <img src={getImageUrl() + 'category/' + item.photo} alt className="img-fluid" />
      </td>
      <td>{(item.islive === '1') ? "Yes" : "No"}</td>
      <td width="15%">
        <Link to={"/admin_editcategory/" + item.id} className="btn btn-warning btn-sm">Edit</Link>
        <Link onClick={(event) => deleteCategory(item.id)} className="btn btn-danger btn-sm">Delete</Link>
      </td>
    </tr>)
  }

  // api calling
  useEffect(() => {

    if (iteams.length === 0) {

      let aipAdress = getBaseUrl() + 'category.php';
      axios(
        {
          method: 'get',
          url: aipAdress,
          responseType: 'json'

        }).then((respone) => {
          console.log(respone.data);
          /*  [{"error":"no"},
          {"total":6},
          {"id":"1","title":"laptop","photo":"laptop.jpg","islive":"1","isdeleted":"0"} */
          let error = respone.data['0']['error'];
          console.log(error);
          if (error !== 'no') {
            alert(error);
          }
          // no error than run else block 
          // and delete 2 object of api and show data after delet
          else {
            let total = respone.data[1]['total'];
            console.log(total);
            if (total === 0) {
              Showmessage('Category not Found')
            }
            else {
              // the condition is true delete two object 

              respone.data.splice(0, 2);
              console.log(respone.data);
              setItams(respone.data);
              Showmessage('You Are Online')

            }
          }
        }).catch((error) => {
          if (error.code === 'ERR_NETWORK')
            console.log(error.code);
          Showerror()




        });
    }
  }, []);

  return (<div id="wrapper">
    {/* Sidebar */}
    <Menu />
    {/* End of Sidebar */}
    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
        <Navbar />
        {/* End of Topbar */}
        {/* Begin Page Content */}
        <ToastContainer />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">Category</h5>
                  <Link to="/admin_addcategory" className="btn btn-primary btn-sm">Add
                    <i className="fa fa-plus" />
                  </Link>
                </div>
                <div className="card-body">
                   {/* search button */}
                  <div className="d-flex justify-content-end mb-3" style={{ position: "relative" }}>
                    <input
                      type="text"
                      style={{
                        padding: "6px 30px 6px 12px", // space for icon on right
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        width: "200px",
                        outline: "none",
                        transition: "0.3s",
                      }}
                      placeholder="Search by title or id"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset page when searching
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                    {/* Magnifying glass icon */}
                    <i
                      className="fa fa-search"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#aaa",
                        pointerEvents: "none",
                      }}
                    ></i>
                  </div>
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Photo</th>

                        <th>is live</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => display(item))}
                    </tbody><br></br>
                    <nav>
                      <ul className="pagination">
                        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
                          <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
    </div>
    {/* End of Content Wrapper */}
  </div>
  )
}