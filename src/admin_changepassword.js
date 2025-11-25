import Cookie from "./cookie";
import Menu from "./menu";
import Navbar from "./nav";
import { useEffect } from "react";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { getBaseUrl } from "./comman";

export default function Adminchangepassword() {




  let UpdatePassword = function (e) {
 
     


    // Admin Change password

    let apiAddres = getBaseUrl() + "admin_change_password.php";
    // console.log(apiAddres);
     axios({
      url: apiAddres,
      method:"post",
      responseType:"json"
    }).then((response) =>{
      console.log(response.data);
    }).catch((error) =>{
        console.log(error);
    })


  }
  useEffect(() => {
    UpdatePassword()

  

  });
  return (<div id="wrapper">
    {/* Sidebar */}
    <Cookie />
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <h5 className="m-0 font-weight-bold text-primary">Change password</h5>
                </div>
                <div className="card-body">
                  <form action encType="multipart/form-data" onChange={UpdatePassword} method="post">
                    <div className="mb-3">
                      <label htmlFor className="form-label">Current password</label>
                      <input type="password" name id className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor className="form-label">New password</label>
                      <input type="password" name id className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor className="form-label">Confirm new password</label>
                      <input type="password" name id className="form-control" required />
                    </div>
                    <div className="d-flex justify-content-end">
                      <input type="submit" defaultValue="save changes" name="submit" className="btn btn-primary" />
                      <input type="reset" defaultValue="clear" name="submit" className="btn btn-light" />
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