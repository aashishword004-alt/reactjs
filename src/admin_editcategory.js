import { useEffect } from "react";
import Menu from "./menu";
import Navbar from "./nav";
import { Link, useParams } from "react-router-dom";
import { getBaseUrl } from "./comman";
import axios from "axios";

export default function Admineditecategory() {
  // declear id
  var categoryid = useParams()
  useEffect(() =>
  {
    let apiaddress = getBaseUrl() + `category.php?id=${categoryid}`;
    axios({
      responseType:'json',
      url:apiaddress,
      method:'get'

    }).then((response) =>{
       console.log(response.data);
       
    }).catch((error) =>{

    });
  });
  return (<div>
    <div id="wrapper">
      {/* Sidebar */}
      <Menu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          {/* End of Topbar */}
          {/* Begin Page Content */}
          <div className="container-fluid mt-3">
            {/* Page Heading */}
            <h4 className="text-dark font-weight-bold">Edit - Category Management</h4>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between">
                <h5 className="m-0 text-dark">Edit category</h5>
                <Link to="/admin_category" className="btn btn-primary">Back</Link>
              </div>
              <div className="card-body">
                <form action method="post">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">EditTitle</label>
                        <input type="text" className="form-control" id="title" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Change Photo</label>
                        <input type="file" className="form-control" id="photo" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Edit Description</label>
                        <textarea className="form-control" id="description" required defaultValue={"                                    "} />
                      </div>
                      <div className="d-flex justify-content-end">
                        <input type="submit" className="btn btn-primary" defaultValue="Save changes" />&nbsp;
                        <input type="submit" className="btn btn-dark" defaultValue="clear" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <b>Existing Photo</b>
                      <img src="http://picsum.photos/200" className="img-fluid" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2025</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </div>
    {/* End of Page Wrapper */}
    {/* Scroll to Top Button*/}
    <a className="scroll-to-top rounded" href="#page-top">
      <i className="fas fa-angle-up" />
    </a>
  </div>
  );
}