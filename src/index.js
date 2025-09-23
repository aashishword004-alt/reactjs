import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// Admin Pages
import Login from './adminLogin';
import Admindashbord from './admin_dashbord';
import Adminaddcategory from './admin_addcategory';
import Admineditecategory from './admin_editcategory';
import Admincategory from './admin_category';
import Adminaddproduct from './admin_addproduct';
import Adminediteproduct from './admin_editeproduct';
import AdminProduct from './admin_product';
import Adminviewproduct from './admin_viewproduct';
import Adminuser from './adminuser';
import Adminchangepassword from './admin_changepassword';
import Adminforgotepassword from './admin_forgotepassword';
import Adminoders from './admin_oder';
import Adminviewoderdetails from './admin_viewodersdetail';
import Adminprint from './admin_print';
import Four from './404';

function Shop() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin_addcategory' element={<Adminaddcategory />} />
        <Route path='/admin_category' element={<Admincategory />} />
        <Route path='/admin_changepassword' element={<Adminchangepassword />} />
        <Route path='/admin_dashbord' element={<Admindashbord />} />

        { /* dyanamic output */}
        
        <Route path='/admin_addproduct' element={<Adminaddproduct />} />
        <Route path='/admin_editcategory/:categoryid' element={<Admineditecategory />} />
        <Route path='/admin_viewproduct/:productid' element={<Adminviewproduct />} />
        <Route path='/admin_viewodersdetail/:orderid' element={<Adminviewoderdetails />} />
        <Route path='/admin_editproduct/:productid' element={<Adminediteproduct />} />

        <Route path='/admin_forgotepassword' element={<Adminforgotepassword />} />
        <Route path='/admin_oder/' element={<Adminoders />} />
        <Route path='/admin_print' element={<Adminprint />} />
        <Route path='/admin_product' element={<AdminProduct />} />
        <Route path='/adminuser' element={<Adminuser />} />
        //<Route path='/*' element={<Four />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Shop />);
