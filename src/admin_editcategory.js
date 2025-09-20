import { useEffect, useState } from "react";
import Menu from "./menu";
import Navbar from "./nav";
import { Link, useParams } from "react-router-dom";
import { getBaseUrl, getImageUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";

export default function Admineditecategory() {
  // declear id
  var { categoryid } = useParams()
  // create variable evry input
  let [photo, setPhoto] = useState('');
  let [isLive, setIslive] = useState('');
  let [title, setTitle] = useState('');
  let [newphoto, setNewPhoto] = useState('');
  let [isDataFached, setIsdatafache] = useState(false)
  let updateData = function (e)
  {
    let apiaddres = getBaseUrl() + ' "update_category.php";';
    let form = new FormData();
    form.append();
    form.append();
    form.append();
    form.append();
    axios({
       method:'post',
       responseType:'json',
       url:apiaddres
       }).then((response) => {
        console.log(response.data);

       }).catch((error) =>{
        if(error.code === 'ERR_NETWORK')
        {
          Showerror(error);
        }
       })
       e.prevenDefualt()
  }
  useEffect(() => {
    if (isDataFached === false) {
      let apiaddress = getBaseUrl() + `category.php?id=${categoryid}`;
     // console.log(apiaddress);
      axios(
        {
          method: 'get',
          url: apiaddress,
          responseType: 'json'

        }).then((respone) => {
          console.log(respone.data);
          /*  [{"error":"no"},
          {"total":6},
          {"id":"1","title":"laptop","photo":"laptop.jpg","islive":"1","isdeleted":"0"} */
          let error = respone.data[0]['error'];
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
              Showmessage('Category not Found');
            }
            else {
              // the condition is true delete two object 

              respone.data.splice(0, 2);
              console.log(respone.data);
              setIslive(respone.data[0]['islive']);
              setPhoto(respone.data[0]['photo']);
              setTitle(respone.data[0]['title']);
              setIsdatafache(true)

              Showmessage('You Are Online');

            }
          }
        }).catch((error) => {
          if (error.code === 'ERR_NETWORK')
            console.log(error.code);
          Showerror()
        });
    }
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
                <form action method="post" onSubmit={updateData}>
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">EditTitle</label>
                        <input type="text" value={title} className="form-control" id="title" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Change Photo</label>
                        <input type="file" className="form-control" id="photo" required />
                      </div>
                      <span className="my-5 fw-bold">is this category Live?</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="form-check-inline mb-5">
                        <input id="yes" name="islive" type="radio"
                          value={1}
                          checked={(isLive == '1')}
                          className="form-check-input" required />
                        <label htmlFor="yes" className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check-inline mb-5">
                        <input id="no" name="islive" type="radio" className="form-check-input"
                          value={0}
                          checked={(isLive == '0')}
                          required />
                        <label htmlFor='no' className="form-check-label">No</label>
                      </div>
                      <div className="d-flex justify-content-end">
                        <input type="submit" className="btn btn-primary" defaultValue="Save changes" />&nbsp;
                        <input type="submit" className="btn btn-dark" defaultValue="clear" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <b>Existing Photo</b>
                      <img src={getImageUrl() + 'category/' + photo} className="img-fluid" />
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