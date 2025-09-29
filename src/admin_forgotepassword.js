import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getBaseUrl } from "./comman";
import axios from "axios";
import { Showerror } from "./message";
export default function Adminforgotepassword(){
  useEffect(() =>{
    let apiAdress = getBaseUrl() + 'forgot_password.php'
    axios({
      responseType:"json",
      method:'post',
      url:apiAdress
    }).then((response) =>{
      console.log(response.data)

    }).catch((error) =>{
      if (error.code === "ERR_NETWORK")
            //  console.log(error.code)
            Showerror()
    });
  });
    return(<div className="container">
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-password-image">
              <img src="/theme/img/large.png" />
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                </div>
                <form className="user">
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                  </div>
                  <a href="login.html" className="btn btn-primary btn-user btn-block">
                    Reset Password
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <Link className="small" to="/">Already have an account? Login!</Link>
                </div>
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