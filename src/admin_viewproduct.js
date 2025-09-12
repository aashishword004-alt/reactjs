import Menu from "./menu";
import Navbar from "./nav";
import { Link } from "react-router-dom";

export default function Adminviewproduct()
{
    return(<div id="wrapper">
  {/* Sidebar */}
 <Menu/>
  {/* End of Sidebar */}
  {/* Content Wrapper */}
  <div id="content-wrapper" className="d-flex flex-column">
    {/* Main Content */}
    <div id="content">
      {/* Topbar */}
     <Navbar/>
      {/* End of Topbar */}
      {/* Begin Page Content */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between">
                <h5 className="m-0 font-weight-bold text-primary">
                  Products (view detail)</h5>
                <Link to="/admin_product" className="btn btn-primary btn-sm">Back
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <tbody><tr>
                      <td width="25%">
                        <img src="http://picsum.photos/400" className="img-fluid" />
                      </td>
                      <td>
                        <table className="table table-striped table-sm">
                          <tbody><tr>
                              <td>Name</td>
                              <td>IPhone - 15</td>
                            </tr>
                            <tr>
                              <td>Category</td>
                              <td>PHone</td>
                            </tr>
                            <tr>
                              <td>Price</td>
                              <td>125000</td>
                            </tr>
                            <tr>
                              <td>Stock</td>
                              <td>10</td>
                            </tr>
                            <tr>
                              <td>Weight</td>
                              <td>500</td>
                            </tr>
                            <tr>
                              <td>Size</td>
                              <td>Medium</td>
                            </tr>
                            <tr>
                              <td>Detail</td>
                              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea numquam voluptas tempora eaque repudiandae cumque tenetur rerum culpa est minima, perferendis dolorum nobis labore repellat ad officia fugit sequi earum.</td>
                            </tr>
                            <tr>
                              <td>Is Live</td>
                              <td>Yes</td>
                            </tr>
                            <tr>
                              <td />
                              <td />
                            </tr>
                            <tr>
                              <td />
                              <td />
                            </tr>
                          </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
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