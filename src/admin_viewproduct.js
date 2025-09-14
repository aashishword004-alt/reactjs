import { useEffect, useState } from "react";
import Menu from "./menu";
import Navbar from "./nav";
import { Link, useParams } from "react-router-dom";
import { getBaseUrl, getImageUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";

export default function Adminviewproduct() {
  let {productid} = useParams();
  let [products, setProduct] = useState([])
  useEffect(() => {
    if (products.length === 0) {
      let apiAddres = getBaseUrl() + "product.php?productid=" + productid;
      axios({
        method: 'get',
        responseType: 'json',
        url: apiAddres
      }).then((response) => {
        console.log(response.data)
        /* 
        [{"error":"no"},
        {"total":12},
        {"id":"1","categoryid":"1","title":"Acer Laptop","price":"100","stock":"69","weight":"1000","size":"15 inch","photo":"acer.jpg","detail":"WINDOWS 10 4 GB DDR3 RAM 128 gb ssd hard disk","islive":"1","isdeleted":"0","categorytitle":"laptop"} */

        let error = response.data[0]['error']
        if (error != 'no')
          // console.log(error)
          Showerror(error)
        else {
          let total = response.data[1]['total']
          if (total === 0) {

            Showmessage('Product not found')
            console.log(total);
          }
          else {
            response.data.splice(0, 2)
            // set dta into remain 0
            setProduct(response.data[0])
            console.log(response.data)
            Showmessage('category fatch succefully')
          }
        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          Showerror();
        }
      });
    }
  });
  if (products !== undefined) {
    // create the object destrucring 
    
    let { id, categoryid, title, price, stock, weight, size, photo, detail, islive, isdeleted, categorytitle } = products;
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
                    <h5 className="m-0 font-weight-bold text-primary">
                      Products (view detail)</h5>
                    <Link to="/admin_product" className="btn btn-primary btn-sm">Back
                    </Link>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <tbody><tr>
                        <td width="25%">
                          <img src={getImageUrl() + 'product/' + photo } className="img-fluid" />
                        </td>
                        <td>
                          <table className="table table-striped table-sm">
                            <tbody><tr>
                              <td>Name</td>
                              <td>{title}</td>
                            </tr>
                              <tr>
                                <td>Category</td>
                                <td>{categorytitle}</td>
                              </tr>
                              <tr>
                                <td>Price</td>
                                <td>{price}</td>
                              </tr>
                              <tr>
                                <td>Stock</td>
                                <td>{stock}</td>
                              </tr>
                              <tr>
                                <td>Weight</td>
                                <td>{weight}</td>
                              </tr>
                              <tr>
                                <td>Size</td>
                                <td>{size}</td>
                              </tr>
                              <tr>
                                <td>Detail</td>
                                <td>{detail}</td>
                              </tr>
                              <tr>
                                <td>Is Live</td>
                                <td>{(islive === 1 ? "Yes" : 'NO')}</td>
                              </tr>
                              <tr>
                                <td />
                                <td />
                              </tr>
                              <tr>
                                <td />
                                <td />
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      </tbody></table>
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
  else {
    return(<></>)
  }
}