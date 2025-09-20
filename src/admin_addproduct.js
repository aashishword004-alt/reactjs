import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import Navbar from "./nav";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror, Showmessage } from "./message";

export default function Adminadproduct() {
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
                  <form method="post">
                    
                    {/* Category */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="categoryid" className="form-label">Category</label>
                        <select id="categoryid" name="categoryid" className="form-select" required>
                          <option value="">Choose...</option>
                          <option value="1">Category 1</option>
                          <option value="2">Category 2</option>
                          <option value="3">Category 3</option>
                        </select>
                      </div>
                      
                      <div className="col-md-4">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" required />
                      </div>
                      
                      <div className="col-md-4">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" name="price" placeholder="Enter price" required />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="details" className="form-label">Details</label>
                        <textarea className="form-control" id="details" name="details" rows={3} placeholder="Enter details" required />
                      </div>
                    </div>

                    {/* Stock, Weight, Size */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input type="number" className="form-control" id="stock" name="stock" placeholder="Enter stock quantity" required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="weight" className="form-label">Weight</label>
                        <input type="number" className="form-control" id="weight" name="weight" placeholder="Enter weight" required />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input type="text" className="form-control" id="size" name="size" placeholder="Enter size" required />
                      </div>
                    </div>

                    {/* Photo + IsLive */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="photo" className="form-label">Photo</label>
                        <input type="file" className="form-control" id="photo" name="photo" accept="image/*" required />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Is Live</label>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="isLive" id="Yes" value="1" required />
                          <label className="form-check-label" htmlFor="Yes">Yes</label>
                        </div>
                        <div className="form-check">
                          <input type="radio" className="form-check-input" name="isLive" id="No" value="0" required />
                          <label className="form-check-label" htmlFor="No">No</label>
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