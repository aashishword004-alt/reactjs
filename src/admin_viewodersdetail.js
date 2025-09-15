import { Link, useParams } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";
// view oderdetails pandding
export default function Adminviewoderdetails() {
  // useParmas method
  let [odersid] = useParams()
  // state variable create for store values
  let [oders, setOder] = useState([])
  useEffect(() => {
    if (oders.length === 0) {

      let apiaddress = getBaseUrl() + 'orders.php?odersid=' + odersid;
      // let apiaddressdetails = getBaseUrl() + 'order_details.php';
      axios({
        method: 'get',
        responseType: 'json',
        url: apiaddress
        ///axios.get(apiaddressdetails)

      }).then((response) => {
        console.log(response.data);

        let error = response.data['0']['error']
        if (error != 'no') {

          Showmessage(error)
        }
        // api oders
        /* [{"error":"no"},
        {"total":31},
        {"billdate":"05-09-2025","orderstatus":"1","id":"33","fullname":"","address1":"","address2":"","city":"","pincode":"","amount":"52000"}, */
        else {
          let total = response.data[1]['total']
          if (total === 0) {

            console.log('total not found')
            Showmessage(total)
          }
          else {
            response.data.splice(0, 2)
            console.log(response.data);
            setOder(response.data)
            Showmessage('oder hear')
          }


        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
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
                  <h5 className="m-0 font-weight-bold text-primary">Order (Detail)</h5>
                  <span>
                    <Link to="/adminuser" className="btn btn-primary btn-sm">Back
                    </Link>
                    <a href="admin_print_order.html" className="btn btn-secondary btn-sm">Print
                    </a>
                  </span>
                </div>
                <div className="card-body">
                  <table className="table table-sm table-striped table-bordered">
                    <tbody><tr>
                      <td width="25%">Name</td>
                      <td width="25%">Ankit Patel</td>
                      <td width="25%">Date</td>
                      <td width="25%">Fri 09-08-2024</td>
                    </tr>
                      <tr>
                        <td>Address</td>
                        <td>
                          eva surbhi, opp akshwarwadi <br />
                          Waghwadi road, bhavnagar
                        </td>
                        <td>Bill No</td>
                        <td>125</td>
                      </tr>
                      <tr>
                        <td>Pincode</td>
                        <td>364001</td>
                        <td>Delivery Status</td>
                        <td>
                          <form action>
                            <select className="form-control" name="orderstatus" id="orderstatus">
                              <option value>Select</option>
                              <option value>Confirmed</option>
                              <option value>Dispatched</option>
                              <option value>Delivered</option>
                              <option value>Canceled</option>
                            </select>
                            <input type="submit" defaultValue="save" className="btn btn-primary w-100 mt-1" />
                          </form>
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>1234567890</td>
                        <td>Payment Status</td>
                        <td>Online</td>
                      </tr>
                      <tr>
                        <td colSpan={1}>Remarks</td>
                        <td colSpan={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo possimus maxime debitis! Atque doloribus laborum similique officia deleniti delectus velit, et consequatur provident quas, ex sequi necessitatibus a tenetur? Culpa.</td>
                      </tr>
                    </tbody></table>
                  <hr />
                  <table className="table table-sm table-striped table-bordered">
                    <thead>
                      <tr>
                        <td>Sr No</td>
                        <td>Name</td>
                        <td align="right">Price</td>
                        <td align="right">Quantity</td>
                        <td align="right">Total</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td width="5%">1</td>
                        <td width="40%">IPhone - 15 pro</td>
                        <td width="10%" align="right">125000</td>
                        <td width="10%" align="right">2</td>
                        <td width="20%" align="right">250000</td>
                      </tr>
                      <tr>
                        <td width="5%">2</td>
                        <td width="40%">Macbook pro</td>
                        <td width="10%" align="right">225000</td>
                        <td width="10%" align="right">1</td>
                        <td width="20%" align="right">225000</td>
                      </tr>
                      <tr>
                        <td colSpan={4}>Total</td>
                        <td align="right">4,75,000</td>
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
  );
}