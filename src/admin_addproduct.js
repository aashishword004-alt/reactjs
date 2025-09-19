import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";

export default function Adminadproduct() {
  // state variabls 
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLive, setIsLive] = useState("1");
  const navigate = useNavigate() //hook


  let facthcategory = function () {
    if (items.length === 0) {

      let apiAdress = getBaseUrl() + 'category.php'
      axios({
        method: 'get',
        responseType: 'json',
        url: apiAdress
      }).then((response) => {
        console.log(response.data);
        let error = response.data[0]['error']

        if (error !== 'no') {
          Showerror(error)
        }
        else {
          let total = response.data[1]['total']
          if (total === 0) {
            Showerror('Category not found')
          }
          else {
            response.data.splice(0, 2)
            console.log(response.data)
            setItems(response.data)
            // Showmessage('Product add Hear')
          }
        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK')
          Showerror()

      });
    }
  }

  let addProduct = function (e) {
    console.log(photo, isLive, weight, stock, title, category, details, size)
    // e.preventdefualt();
    e.preventDefault();

    let apiadrress = getBaseUrl() + 'insert_product.php';
    let form = new FormData();
    form.append('title', title);
    form.append('categoryid', category);
    form.append('price', price);
    form.append('stock', stock);
    form.append('weight', weight);
    form.append('size', size);
    form.append('details', details);
    form.append('islive', isLive);
    form.append('photo', photo);
    axios({
      method: 'post',
      url: apiadrress,
      responseType: 'json',
      data: form
    }).then((response) => {
      console.log(response.data)
      let error = response.data[0]['error']
      if (error !== 'no') {
        Showerror(error);
        console.log(error);
      }
      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];

        if (success === 'no') {
          Showerror(message);
          console.log(message);
        }
        else {
          Showmessage(message);
          // puse for 2 mini
          setTimeout(() => {
            navigate('/AdminProduct')
          }, 2000);
        }

        // continue tomorow

      }

    }).catch((error) => {
      if (error.code === 'ERR_NETWORK') {

        Showerror()
      }

    });
  }
  useEffect(() => { facthcategory() }, [])
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
                  <h5 className="m-0 font-weight-bold text-primary">Products (add)</h5>
                  <Link to="/admin_product" className="btn btn-primary btn-sm">back
                  </Link>
                </div>
                <div className="card-body">
                  <form method="post" onSubmit={addProduct}>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="category" className="form-label">Category</label> <br />
                        <select
                          id="category"
                          value={category}
                          className="form-select"
                          onChange={(e) => setCategory(e.target.value)}
                          required>
                          <option value=''>Choose...</option>
                          {items.map((row) => (<option key={row['id']} value={row['id']}>
                            {row['title']}
                          </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text"
                          className="form-control"
                          value={title}
                          id="title"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter title" required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number"
                          className="form-control"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter price" required />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="details" className="form-label">Details</label>
                        <textarea
                          className="form-control"
                          id="details"
                          rows={3}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Enter details" required />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          placeholder="Enter stock quantity" required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="weight" className="form-label">Weight</label>
                        <input type="number"
                          className="form-control"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          id="weight"
                          placeholder="Enter weight" required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input type="text"
                          className="form-control"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          id="size"
                          placeholder="Enter size" required />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="photo" className="form-label">Photo</label>
                        <input type="file"
                          className="form-control"
                          id="photo"
                          required
                          onChange={(e) => setPhoto(e.target.files[0])}
                          accept="image/*" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Is Live</label>
                        <div className="form-check">
                          <input className="form-check-input"
                            type="radio" name="islive"
                            id="isLiveYes"
                            value="1"
                            onChange={(e) => setIsLive(e.target.value)}
                            required />
                          <label className="form-check-label" htmlFor="isLiveYes">Yes</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input"
                            type="radio"
                            name="islive"
                            id="isLiveNo"
                            value="0"
                            onChange={(e) => setIsLive(e.target.value)}
                            required />
                          <label className="form-check-label" htmlFor="isLiveNo">No</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <button type="submit" className="btn btn-primary w-100 mb-2">Save</button>
                        <button
                          type="reset"
                          className="btn btn-light w-100"
                          onClick={() => {
                            setCategory('');
                            setTitle('');
                            setPrice('');
                            setDetails('');
                            setStock('');
                            setWeight('');
                            setSize('');
                            setPhoto(null);
                          }
                          }
                        > Clear all</button>
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
    </div >
    {/* End of Content Wrapper */}
  </div >
  )
}