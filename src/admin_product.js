import { Link } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";
import { getImageUrl } from "./comman";

export default function AdminProduct() {

  let display = function (item) {
    return (<tr>
      <td>{item.id}</td>
      <td>
        <Link to="/admin_viewproduct" target="_blank">
          {item.category} <br />
          {item.title}
        </Link>
      </td>
      <td>{item.price}</td>
      <td width='20%'>
        <img src={getImageUrl() + 'product/' + item.photo} className="img-fluid" />
      </td>
      <td>{item.stock}</td>
      <td>{(item.islive === '1' ? 'Yes' : 'No')}</td>
      <td>
        <a href="admin_edit_product.html" className="btn btn-warning btn-sm btn-block mb-1">Edit</a>
        <a href="#" className="btn btn-danger btn-sm btn-block">Delete</a>
      </td>
    </tr>);
  }
  let [itams, setItams] = useState([])

  // use useeffact to calling api 
  useEffect(() => {
    if(itams.length === 0)
    {

    
    let aipAdress = 'https://theeasylearnacademy.com/shop/ws/product.php'; // api addres
    axios({
      method: 'get',               // method and typ
      responseType: 'json',
      url: aipAdress

    }).then((response) =>    // promisse 
    {
      console.log(response.data);
      /*
      0[{"error":"no"},
      1{"total":12},
      2{"id":"1","categoryid":"1","title":"Acer Laptop","price":"100","stock":"69","weight":"1000","size":"15 inch","photo":"acer.jpg","detail":"WINDOWS 10 4 GB DDR3 RAM 128 gb ssd hard disk","islive":"1","isdeleted":"0","categorytitle":"laptop"}, */
      // checke the error
      let error = response.data['0']['error'];
      console.log(error);
      if (error !== 'no') {
        alert(error);
      }
      //  no error found displat the total item
      else {
        let total = response.data[1]['total']
        console.log(total);
        if (total === 0) {
          Showmessage("Category not found")
        }
        else {
          // condition is true delete to object of array
          response.data.splice(0, 2)
          console.log(response.data);
          setItams(response.data)
          Showmessage('You are Online')

        }
      }

    }).catch((error) => {
      if (error.code === 'ERR_NETWORK')
        // console.log(error.code);
        Showerror()
    })
}})
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
                  <h5 className="m-0 font-weight-bold text-primary">Product</h5>
                  <Link to="/admin_addproduct " className="btn btn-primary btn-sm">add
                    <i className="fa fa-plus" />
                  </Link>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Stock</th>
                        <th>is Live?</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itams.map((item) => display(item))}
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