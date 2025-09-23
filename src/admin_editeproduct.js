import { use, useEffect, useState } from "react";
import Menu from "./menu";
import Navbar from "./nav";
import { Link, useParams } from "react-router-dom";
import { getBaseUrl, getImageUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";

export default function Adminediteproduct() {

  let { productid } = useParams();
  // state variable 
  let [fached,setFached] = useState(false);
  let [products, setProduct] = useState([]);
  let [category, setCategory] = useState("");
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState("");
  let [details, setDetails] = useState("");
  let [stock, setStock] = useState("");
  let [weight, setWeight] = useState("");
  let [size, setSize] = useState("");
  let [photo, setPhoto] = useState(null);
  let [isLive, setIsLive] = useState("1")

  // facthcategory 
  let facthCategory = function () {
    if (products.length === 0) {
      let apiAddress = getBaseUrl() + 'category.php';
      axios({
        responseType: 'json',
        url: apiAddress,
        method: 'get'
      }).then((response) => {
        console.log(response.data);
        let error = response.data[0]['error'];
        if (error !== 'no') {
          Showerror()
        }
        else {
          let total = response.data[1]['total'];
          if (total === 0) {
            Showerror('Ctaegory not found ');

          }
          else {
            response.data.splice(0, 2);
            console.log(response.data);
            setProduct(response.data);
          }
        }

      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
          console.log(error.code);

        Showerror()
      });
    }
  }

  let facthProduct = function () {
    if (setFached === false) {
      let apiAddress = getBaseUrl() + 'product.php?productid=' + productid;
      axios({
        responseType: 'json',
        method: 'get',
        url: apiAddress
      }).then((response) => {
        console.log(response.data)
        let error = response.data[0]['error'];
        if (error !== 'no') {
          Showerror()
        }
        else {
          let total = response.data[1]['total'];
          if (total === 0) {
            Showerror('Product not found');
          }
          else {
            response.data.splice(0, 2);
            console.log(response.data);
            setFached(true);
            setCategory(response.data[0]['categoryid']);
            setDetails(response.data[0]['detail']);
            setIsLive(response.data[0]['islive']);
            setPhoto(response.data[0]['photo']);
            setPrice(response.data[0]['price']);
            setSize(response.data[0]['size']);
            setStock(response.data[0]['stock']);
            setTitle(response.data[0]['title']);
            setWeight(response.data[0]['weight']);
          }
        }

      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
          // console.log(error.code);
          Showerror()
      });
    }
  }

  useEffect(() => {
    facthCategory();
    facthProduct();
  }, []);


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
                  <h5 className="m-0 font-weight-bold text-primary">Products (edit)</h5>
                  <Link to="/admin_product" className="btn btn-primary btn-sm">back
                  </Link>
                </div>
                <div className="card-body">
                  <form method="post">
                    <div className="row">
                      <div className="col-sm-2">
                        <b>Existing Photo</b> <br />
                        <img src={getImageUrl() + 'product/' + photo} className="img-fluid" />
                      </div>
                      <div className="col-sm-10">
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label htmlFor="category" className="form-label">Change Category</label> <br />
                            <select id="category" className="form-select" required>
                              <option value=''>Choose...</option>
                              {products.map((cat) => (
                                <option key={cat['id']} value={cat['id']}>{cat['title']}</option>
                              ))}

                            </select>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="title" className="form-label">Edit Title</label>
                            <input type="text"
                            value={title}
                            onChange={(e) => (e.target.value)}
                              className="form-control"
                              id="title" placeholder="Enter title" required />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="price" className="form-label">Edit Price</label>
                            <input type="number"
                              className="form-control"
                              value={price}
                               id="price" placeholder="Enter price" required />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12">
                            <label htmlFor="details" className="form-label">Edit Details</label>
                            <textarea className="form-control"
                            value={details}
                            id="details" rows={3} placeholder="Enter details" required defaultValue={""} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label htmlFor="stock" className="form-label">Edit Stock</label>
                            <input type="number"
                            value={stock}
                            className="form-control" id="stock" placeholder="Enter stock quantity" required />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="weight" className="form-label">Edit Weight</label>
                            <input type="number" className="form-control"
                            value={weight}
                            id="weight" placeholder="Enter weight" required />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="size" className="form-label">Edit Size</label>
                            <input type="text"
                            value={size}
                            className="form-control" id="size" placeholder="Enter size" required />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label htmlFor="photo" className="form-label">Change Photo</label>
                            <input type="file" className="form-control" id="photo" required accept="image/*" />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Is Live</label>
                            <div className="form-check">
                              <input className="form-check-input"
                              checked={(isLive === '1')}
                              value={1}
                              type="radio" name="islive" id="isLiveYes" defaultValue={1} required />
                              <label className="form-check-label" 
                              htmlFor="isLiveYes">Yes</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" 
                              checked={(isLive === '0')}
                              value={0}
                              type="radio" name="islive" id="isLiveNo" defaultValue={0} required />
                              <label className="form-check-label" htmlFor="isLiveNo">No</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100 mb-2">Save changes</button>
                            <button type="reset" className="btn btn-light w-100">Clear all</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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