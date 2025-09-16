import { useEffect, useState } from "react";
import Menu from "./menu";
import Navbar from "./nav";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function Adminoders() {
  let display = function (user) {
    return (<tr>
      <td>{user.id}</td>
      <td>{user.billdate}</td>
      <td>{user.amount}</td>
      <td>
        {user.address1} {user.address2} <br />
        {user.city} {user.pincode}
      </td>
      <td>{user.orderstatus}</td>
      <td>
       <Link className="btn btn-primary" to={'/admin_viewodersdetail/:' + user['id']}>View</Link>

      </td>
    </tr>)
  }

  let [oders, setoders] = useState([])
  useEffect(() => {
    if (oders.length === 0) {

      let apiAdress = getBaseUrl() + 'orders.php';
      axios({
        method: 'get',
        responseType: 'json',
        url: apiAdress
      }).then((respone) => {
        console.log(respone.data)
        /*
        0 [{"error":"no"},
        1 {"total":31},
        2  {"billdate":"05-09-2025","orderstatus":"1","id":"33","fullname":"","address1":"","address2":"","city":"","pincode":"","amount":"52000"}, */

        let error = respone.data['0']['error']
        if (error !== 'no')
          alert(error)
        else {
          let total = respone.data[1]['total']
          if (total === 0) {
            Showmessage('oders not found')
          }
          else {
            respone.data.splice(0, 2)
            console.log(respone.data)
            setoders(respone.data)
            Showmessage('You are Online')
          }
        }

      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
          console.log(error.code);
        Showerror()
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
                  <h5 className="m-0 font-weight-bold text-primary">Orders</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Delivery</th>
                        <th>Order Status</th>
                        <th>View Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oders.map((user) => display(user))}
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