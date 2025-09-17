import { Link, Navigate, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { ToastContainer } from "react-toastify";

export default function Adminadproduct() {
  let [cates, setCate] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLive, setIsLive] = useState("");
  const navigate = useNavigate();


  let insertdata = function (e) {
    console.log(photo, category, price, details, stock, isLive, size, title, weight)

    let aipAdress = getBaseUrl() + 'insert_product.php';
    e.preventDefault();
    let form = new FormData();
    form.append('photo', photo);
    form.append('category', category);
    form.append('price', price);
    form.append('details', details);
    form.append('stock', stock);
    form.append('islive', isLive);
    form.append('size', size);
    form.append('title', title);
    form.append('weight', weight);
    axios({
      method: 'post',
      responseType: 'json',
      url: aipAdress,
      data: form
    }).then((response) => {
      console.log(response.data)
      let error = response.data[0]['error']
      if (error !== 'no') {
        Showerror(error);
      }

      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];
        if (success === 'no') {
          Showmessage(success);
          setTimeout(() => {
            navigate('/admin_product')
          }, 1000)
        }
        else {
          Showmessage(message);

        }
      }
    }).catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        console.log(error.code)
        Showerror();
      }
    });
  }

  let factcategory = function () {
    if (cates.length === 0) {
      let aipAdress = getBaseUrl() + 'category.php';
      axios({
        method: 'get',
        responseType: 'json',
        url: aipAdress
      }).then((response) => {
        console.log(response.data);
        let error = response.data[0]['error']
        if (error !== 'no') {
          console.log(error);
          Showmessage(error);
        }
        else {
          let total = response.data[1]['total']
          if (total === 0) {
            //console.log(total);
            Showmessage('Category not found')
          }
          else {
            response.data.splice(0, 2)
            //     console.log(response.data);
            setCate(response.data)
            Showmessage('Add Product')
          }
        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          Showerror();
        }
      })
    }
  }
  useEffect(() => { factcategory() }, []);

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
                  <form method="post" onSubmit={insertdata}>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          id="category"
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value="">Choose...</option>
                          {cates.map((cat) => (
                            <option key={cat["id"]} value={cat["id"]}>
                              {cat["title"]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter title"
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter price"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="details" className="form-label">Details</label>
                        <textarea
                          className="form-control"
                          id="details"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          rows={3}
                          placeholder="Enter details"
                          required
                        />
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
                          placeholder="Enter stock quantity"
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="weight" className="form-label">Weight</label>
                        <input
                          type="number"
                          className="form-control"
                          id="weight"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="Enter weight"
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input
                          type="text"
                          className="form-control"
                          id="size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          placeholder="Enter size"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="photo" className="form-label">Photo</label>
                        <input
                          type="file"
                          className="form-control"
                          id="photo"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          required
                          accept="image/*"
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Is Live</label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="islive"
                            id="isLiveYes"
                            value="1"
                            checked={isLive === "1"}
                            onChange={(e) => setIsLive(e.target.value)}
                            required
                          />
                          <label className="form-check-label" htmlFor="isLiveYes">Yes</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="islive"
                            id="isLiveNo"
                            value="0"
                            checked={isLive === "0"}
                            onChange={(e) => setIsLive(e.target.value)}
                            required
                          />
                          <label className="form-check-label" htmlFor="isLiveNo">No</label>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-light w-100"
                          onClick={() => {
                            setCategory("");
                            setTitle("");
                            setPrice("");
                            setDetails("");
                            setStock("");
                            setWeight("");
                            setSize("");
                            setPhoto(null);
                            setIsLive("1"); // ✅ default radio so it won’t disappear
                            //document.getElementById("photo").value = ""; // ✅ clears file input
                          }}
                        >
                          Clear all
                        </button>
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
  )
}