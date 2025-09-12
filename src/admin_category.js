import { Link } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect } from "react";
import axios from 'axios';
import { ToastContainer  ,toast, Bounce} from 'react-toastify';
export default function Admincategory() {
  useEffect(() => {
    let aipAdress = 'https://theeasylearnacademy.com/shop/ws/category.php';
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
        let error = respone.data['0'][error];
        console.log(error);
        if (error !== 'no') {
          alert(error);
        }
        else {
          let total = respone.data[1]['total'];
          console.log(total);
          if (total === '0') {
            alert('category not found');
          }
          else {
            respone.data.splice(0, 2);
            console.log(respone.data);
          }
        }


      }).catch((error) => {
        if (error.code === 'Erroe Network')
        

          toast.error(' you are offline either some issue', 
            {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        

      })
  })
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
        <ToastContainer/>
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
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Photo</th>
                        <th>Detail</th>
                        <th>is live</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Phone</td>
                        <td width="20%">
                          <img src="https://picsum.photos/100" alt className="img-fluid" />
                        </td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ea fugit iste est! Eum beatae fuga ipsam temporibus culpa, id sunt dignissimos. Numquam natus tenetur repellat quidem reiciendis, dicta eligendi.</td>
                        <td>Yes</td>
                        <td width="15%">
                          <Link to="/admin_editcategory" className="btn btn-warning btn-sm">Edit</Link>
                          <a href="#" className="btn btn-danger btn-sm">Delete</a>
                        </td>
                      </tr>
                    </tbody>
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