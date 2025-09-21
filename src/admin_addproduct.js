import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";

export default function Adminadproduct() {
  let navigate = useNavigate()
  let [items, setItem] = useState([]);
  let [category, setCategory] = useState("");
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState("");
  let [details, setDetails] = useState("");
  let [stock, setStock] = useState("");
  let [weight, setWeight] = useState("");
  let [size, setSize] = useState("");
  let [photo, setPhoto] = useState(null);
  let [isLive, setIsLive] = useState("1")


  useEffect(() => {
    if (items.length === 0) {

      let apiaddress = getBaseUrl() + "category.php";
      axios({
        method: 'get',
        responseType: 'json',
        url: apiaddress
      }).then((response) => {
        console.log(response.data);
        let error = response.data[0]['error'];
        if (error !== 'no') {
          Showerror(error);
        }
        else {
          let total = response.data[1]['total'];

          if (total === 0) {
            Showerror('category Not Found');
          }
          else {
            response.data.splice(0, 2);
            setItem(response.data);
            console.log(response.data);
            Showmessage('Category Facth Succesfully');
          }
        }
      }).catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          // Showerror();
        }
      })
    }
  }, [items]);
  
  let insertData = function (e) {
    // make sour whene aipcall keyvalue are same no mistack 
    // ex  form.append('categoryid', category);
    // categoryid is keyvalue both in same in api and api calling no small mistack allow 

    e.preventDefault();
    let apiaddress = getBaseUrl() + "insert_product.php";
    let form = new FormData(e.target);
    form.append('categoryid', category);
    form.append('name', title);
    form.append('price', price);
    form.append('detail', details);
    form.append('stock', stock);
    form.append('weight', weight);
    form.append('size', size);
    form.append('photo', photo);
    form.append('islive', isLive);
    

      axios({
      method: 'post',
      responseType: 'json',
      url: apiaddress,
      data: form
    }).then((response) => {
      console.log(response.data);
      let error = response.data[0]['error'];
      if (error !== 'no') {
        Showerror(error);
      }
      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];

        if (success === 'no') {
          //Showerror(success);
        }
        else {
          Showmessage(message);
          setTimeout(() => {
            navigate("/admin_product");
          }, 2000)

        }
      }

    }).catch((error) => {
      if (error.code === 'ERR_NETWORK')
        Showerror(error);
      console.log(error)
    })
  }

  return (
    <div id="wrapper">
      <Menu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <ToastContainer />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex justify-content-between">
                    <h5 className="m-0 font-weight-bold text-primary">Products (add)</h5>
                    <Link to="/admin_product" className="btn btn-primary btn-sm">back</Link>
                  </div>
                  <div className="card-body">
                    <form method="post" onSubmit={insertData}>

                      {/* Category */}
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="categoryid" className="form-label">Category</label>
                          <select
                            id="categoryid"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="categoryid" className="form-select" required>

                            <option value="">Choose...</option>
                            {items.map((cat) => (
                              <option key={cat['id']} value={cat['id']}>
                                {cat['title']}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title" required />
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="price" className="form-label">Price</label>
                          <input type="number" className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price" name="price" placeholder="Enter price" required />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="details" className="form-label">Details</label>
                          <textarea className="form-control" id="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            name="details" rows={3} placeholder="Enter details" required />
                        </div>
                      </div>

                      {/* Stock, Weight, Size */}
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="stock" className="form-label">Stock</label>
                          <input type="number" className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            id="stock" name="stock" placeholder="Enter stock quantity" required />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="weight" className="form-label">Weight</label>
                          <input type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="form-control" id="weight" name="weight" placeholder="Enter weight" required />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="size" className="form-label">Size</label>
                          <input type="text" className="form-control"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            id="size" name="size" placeholder="Enter size" required />
                        </div>
                      </div>

                      {/* Photo + IsLive */}
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label htmlFor="photo" className="form-label">Photo</label>
                          <input type="file"
                            className="form-control"
                            accept='image/*'
                            onChange={(e) => setPhoto(e.target.files[0])}
                            id="photo" name="photo" required />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Is Live</label>
                          <div className="form-check">
                            <input type="radio"
                              value='1'
                              name="isLive"
                              onChange={(e) => setIsLive(e.target.value)}
                              className="form-check-input" id="isLiveYes"
                              checked={isLive === "1"}
                              required />
                            <label className="form-check-label" htmlFor="isLiveYes">Yes</label>
                          </div>
                          <div className="form-check">
                            <input type="radio" className="form-check-input"
                              value='0'
                              name="isLive"
                              onChange={(e) => setIsLive(e.target.value)}
                              id="isLiveNo"
                              checked={isLive === "0"}
                              required />
                            <label className="form-check-label" htmlFor="isLiveNo">No</label>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <button type="submit" className="btn btn-primary w-100 mb-2">Save</button>
                          <button type="reset" className="btn btn-light w-100">Clear all</button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}