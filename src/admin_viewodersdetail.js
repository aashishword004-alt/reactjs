import { Link, useParams } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";

// view oderdetails pandding
// https://theeasylearnacademy.com/shop/ws/orders.php?id=20
// order item 
//https://theeasylearnacademy.com/shop/ws/order_details.php?orderid=3

export default function Adminviewoderdetails() {

  let { orderid } = useParams();

  // useParmas method
  // let [odersid] = useParams()
  // state variable create for store values

  let [Orders, setOder] = useState([])

  useEffect(() => {
    if (Orders.length === 0) {

      let apiaddress = getBaseUrl() + 'orders.php?id=' + orderid;

     let apiaddressdetails = getBaseUrl() + 'order_details.php';
     axios({
      method:'get',
      responseType:'json',
      url:apiaddressdetails
     }).then((response) =>
    {
     console.log(response.data)
    }).catch((error) =>{
      if(error.code === 'ERR_NETWORK')
        console.log(error.code)
    })
    

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
       [{"error":"no"},{"total":1},
       {"billdate":"27-11-2024",
       "orderstatus":"5","id":"20",
       "fullname":"jenil gabani",
       "address1":"bhavangar","address2":
       "surat","city":"surat","pincode":"undefi",
       "amount":"800","mobile":"9054228044",
       "remarks":"100","paymentmode":"1","paymentstat */

        else {
          let total = response.data[1]['total']
          if (total === 0) {

            console.log('total not found')
            Showmessage(total)
          }

          else {
            response.data.splice(0, 2)
            console.log(response.data);
            setOder(response.data[0])
            Showmessage('oder hear')
          }
        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
          Showerror()

      })

    }
  }, [orderid]);
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
                      <Link to="/admin_oder" className="btn btn-primary btn-sm">Back
                      </Link>
                      <a href="admin_print_order.html" className="btn btn-secondary btn-sm">Print
                      </a>
                    </span>
                  </div>
                  <div className="card-body">
                    <table className="table table-sm table-striped table-bordered">
                      <tbody>
                        <tr>
                          <td width="25%">Name</td>
                          <td width="25%">{Orders['fullname']}</td>
                          <td width="25%">Date</td>
                          <td width="25%">{Orders['billdate']}</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>
                            {Orders['address1']} <br />
                            {Orders['addredd2']}</td>
                          <td>Bill No</td>
                          <td>{Orders['']}</td>
                        </tr>
                        <tr>
                          <td>Pincode</td>
                          <td>{Orders['pincode']}</td>
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
                          <td>{Orders['mobile']}</td>
                          <td>Payment Status</td>
                          <td>{Orders['paymentstat']}</td>
                        </tr>
                        <tr>
                          <td colSpan={1}>Remarks</td>
                          <td colSpan={3}>{Orders['remarks ']}</td>
                        </tr>
                      </tbody>
                    </table>
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