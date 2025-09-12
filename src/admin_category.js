import { Link } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Showerror, Showmessage } from "./message";
import { getImageUrl } from "./comman";
export default function Admincategory() {
  let display = function (item) {
    return (<tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td width="20%">
        <img src={getImageUrl() + 'category/' + item.photo} alt className="img-fluid" />
      </td>
      <td>{(item.islive === '1') ? "Yes" : "No"}</td>
      <td width="15%">
        <Link to="/admin_editcategory" className="btn btn-warning btn-sm">Edit</Link>
        <a href="#" className="btn btn-danger btn-sm">Delete</a>
      </td>
    </tr>)
  }
  let [iteams, setItams] = useState([]);
  useEffect(() => {

    if(iteams.length === 0)
    {
      
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
          //console.log(error.code);
        Showerror()
        
        
        
        
      });
    }
    }, [])
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
                      {iteams.map((item) => display(item))}
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