import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showmessage } from "./message";
import { ToastContainer } from "react-toastify";
import Cookie from "./cookie";

export default function Adminaddcategory() {
  let [title, setTitle] = useState('')
  let [photo, setPhoto] = useState()
  let [islive, setIsLive] = useState('')
  let navigate = useNavigate();
  // insert product 
  let insterdata = function (e) {
    console.log(title, photo, islive);
    let aipAdress = getBaseUrl() + "insert_category.php";
    let form = new FormData();
    form.append('title', title);
    form.append('photo', photo);
    form.append('islive', islive);

    axios({
      url: aipAdress,
      method: 'post',
      responseType: 'json',
      data: form
    }).then((response) => {
      console.log(response.data)
      let error = response.data['0']['error']
      if (error != 'no') {
        Showmessage(error)
      }
      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];
        if (success === 'yes') {
          Showmessage(message)
          // display timer
          setTimeout(() => {
            navigate('/admin_category');
          }, 1000)
        }
        else {
          Showmessage(message)
        }


      }

    }).
      catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          console.log(error.code);
        }
      });
    e.preventDefault();

  }
  return (<div>
    <div id="wrapper">
      <Cookie/>
      <Menu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">

          <Navbar />
          <ToastContainer />
          <div className="container-fluid mt-3">
            {/* Page Heading */}
            <h4 className="text-dark font-weight-bold">Add - Category Management</h4>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between">
                <h5 className="m-0 text-dark">New category</h5>
                <Link to="/admin_category" className="btn btn-primary">Back</Link>
              </div>
              <div className="card-body">
                <form action method="post" onSubmit={insterdata}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Select Photo</label>
                    <input type="file"
                      className="form-control"
                      id="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])} required />
                  </div>
                  <span className="my-5 fw-bold">is this category Live?</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="form-check-inline mb-5">
                    <input
                      id="yes"
                      name="islive"
                      type="radio"
                      className="form-check-input"
                      value={1}
                      onChange={(e) => setIsLive(e.target.value)} required />
                    <label htmlFor="yes" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check-inline mb-5">
                    <input id="no" name="islive" type="radio" className="form-check-input"
                      value={0} onChange={(e) => setIsLive(e.target.value)} required />
                    <label htmlFor='no' className="form-check-label">No</label>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input type="submit" className="btn btn-primary" defaultValue="Save" />&nbsp;
                    <input type="submit" className="btn btn-dark" defaultValue="clear" />
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
    </a></div>
  );

}