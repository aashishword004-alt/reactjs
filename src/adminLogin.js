import { COOKIENAME, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBaseUrl } from "./comman";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Showerror, Showmessage } from "./message";
import { useCookies } from "react-cookie"

export default function Login() {

  let navigate = useNavigate('');
  // create a state variable to stor input
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  // create cookie variable 
  const [cookies, setCookie, removeCookie] = useCookies([COOKIENAME]);

  // create a function
  let adminLogin = function (e) {
    console.log(email, password);

    let apiaddres = getBaseUrl() + 'admin_login.php';
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);
    axios({
      responseType: 'json',
      method: 'post',
      url: apiaddres,
      data: form
    }).then((response) => {
      console.log(response.data)
      let error = response.data[0]['error'];
      if (error !== 'no') {
        Showerror(error)
      }
      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];

        if (success === 'no') {
          Showerror(message);
        }
        else {
         // Showmessage(message);
          // cookie
          setCookie('userid', response.data[3]['id']);
          console.log('userid', cookies['userid']);
           setTimeout(() => {
            navigate('/admin_dashbord')
          }, 2000);
        }
      }

    }).catch((error) => {
      if (error.code === 'ERR_NETWORK')
        Showerror()
    })
    e.preventDefault();
  }

  return (<div className="container">
    {/* Outer Row */}
    <ToastContainer />
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block">
                <img src="/theme/img/large.png" />
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Admin Login</h1>
                  </div>
                  <form className="user" onSubmit={adminLogin}>
                    <div className="form-group">
                      <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                    </div>
                    <div className="form-group">
                      <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Sign in
                    </button>
                    <hr />
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/admin_forgotepassword">Forgot Password?</Link>
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