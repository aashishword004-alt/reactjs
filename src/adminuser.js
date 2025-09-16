//import { Link } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";


export default function Adminuser() {

  let display = function (user) {
    return (<tr>
      <td>{user['id']}</td>
      <td>{user['email']}</td>
      <td>{user['mobile']}</td>
      <td>Fri 09-08-2024</td>
      <td>
      {
      //  <Link className="btn btn-primary" to="/admin_viewodersdetail">View</Link>
        
      } 
      </td>
    </tr>)
  }

  let [users, setUser] = useState([])
  useEffect(() => {
    if (users.length === 0) {
      let apiAdress = getBaseUrl() + 'users.php';
      axios({
        method: 'get',
        responseType: 'json',
        url: apiAdress
      }).then((response) => {
        console.log(response.data)
        /* 
        [{"error":"no"},
        {"total":94},
        {"email":"ankit3385@gmail.com","mobile":"1234567890","id":"3"} */
        let error = response.data['0']['error'];
        console.log(error);

        if (error !== 'no') {

          console.log(error)
        }
        else {
          let total = response.data[1]['total'];
          if (total === 0) {
            Showmessage('User not found')
          }
          else {
            response.data.splice(0, 2)
            console.log(response.data);
            setUser(response.data)
            Showmessage('You are online')

          }
        }



      }).catch((error) => {
        console.log(error)
        if (error.code == 'ERR_NETWORK') {
          console.log(error.code)
          Showerror()
        }
      })
    }
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
        <ToastContainer />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">Users - Customers</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Created at</th>
                        <th>History</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => display(user))}
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