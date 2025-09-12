import Menu from "./menu";
import Navbar from "./nav";

export default function Adminoders(){
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
                <h5 className="m-0 font-weight-bold text-primary">Orders</h5>
              </div>
              <div className="card-body">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Delivery</th>
                      <th>Order Status</th>
                      <th>View Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Fri 09-08-2024</td>
                      <td>95214</td>
                      <td>Bhavnagar <br /> 364001</td>
                      <td>Confirmed</td>
                      <td>
                        <a className="btn btn-primary" href="admin-view-order-detail.html">View</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
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