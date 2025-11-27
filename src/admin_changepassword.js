import Cookie from "./cookie";
import Menu from "./menu";
import Navbar from "./nav";
import { useState } from "react";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { getBaseUrl } from "./comman";
import { ToastContainer } from "react-toastify";


export default function Adminchangepassword() {
  let [Current, setCurrent] = useState("");
  let [NewPassword, setNewpassword] = useState("");
  let [Conform, SetConform] = useState("");

  let UpdatePassword = function (e) {
    e.preventDefault();

    let apiAddres = getBaseUrl() + "admin_change_password.php";

    let form = new FormData();
    form.append("current", Current);
    form.append("newpassword", NewPassword);
    form.append("conform", Conform);

    axios({
      url: apiAddres,
      method: "post",
      data: form,
      responseType: "json"
    })
      .then((response) => {
        console.log(response.data);

        let error = response.data[0]["error"];
        if (error !== "no") {
          Showerror(error);
        } else {
          let success = response.data[1]["success"];
          let message = response.data[2]["message"];

          if (success === "no") {
            Showerror(message);
          } else {
            Showmessage(message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          Showerror("You are offline");
        }
      });
  };

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Cookie />
      <Menu />
      <ToastContainer />
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <Navbar />

          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex justify-content-between">
                    <h5 className="m-0 font-weight-bold text-primary">
                      Change Password
                    </h5>
                  </div>

                  <div className="card-body">
                    <form
                      action="#"
                      encType="multipart/form-data"
                      onSubmit={UpdatePassword}
                      method="post"
                    >
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input
                          type="password"
                          id="Currentpassword"
                          value={Current}
                          onChange={(e) => setCurrent(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          id="NewPassword"
                          value={NewPassword}
                          onChange={(e) => setNewpassword(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="Conformpassword"
                          value={Conform}
                          onChange={(e) => SetConform(e.target.value)}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        <input
                          type="submit"
                          value="Save changes"
                          className="btn btn-primary"
                        />
                        &nbsp;
                        <input
                          type="reset"
                          value="Clear"
                          className="btn btn-light"
                        />
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
