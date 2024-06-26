import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage ';
import RegistrationForm from './components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import AddProductComponent from './components/productComponents/AddProductComponent ';
import UpdateProductComponent from './components/productComponents/UpdateProductComponent ';
import DeleteProductComponent from './components/productComponents/DeleteProductComponent ';
import AdminComponent from './components/rolecomponents/AdminComponent ';
import ManagerComponent from './components/rolecomponents/ManagerComponent ';
import AddUserComponent from './components/usercomponents/AddUserComponent';
import UpdateUserComponent from './components/usercomponents/UpdateUserComponent ';
import RenderProducts from './components/productComponents/RenderProducts';
import AboutPage from './components/AboutPage';
import ContactUsPage from './components/ContactUsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div style={{ paddingBottom: '10px' }}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#7700a6" }}>

<div className="container-fluid ">
  <Link className="navbar-brand text-white" to="/">My App</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ms-auto"> {/* Remove ms-auto class to align items to the left */}
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">Home</Link>
      </li>

      <li className="nav-item ">
        <Link className="nav-link text-white" to="/products">Products</Link>
      </li>
     
    
      <li className="nav-item ">
        <Link className="nav-link text-white" to="/about">About</Link>
      </li>
      <li className="nav-item" >
        <Link className="nav-link text-white" to="/contact">Contact Us</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link text-white" to="/register">Register</Link>
      </li>

      <li className="nav-item text-white">
        <Link className="nav-link text-white" to="/login">Login</Link>
      </li>
      
    </ul>
  </div>
</div>
</nav>
      </div>
    
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products" element ={<RenderProducts/>}/>
          <Route path="/add-product/:userName/:userRole" element={<AddProductComponent/>} />
          <Route path="/update/:id/:userName/:userRole" element={<UpdateProductComponent/>} />
          <Route path="/delete-product" element={<DeleteProductComponent/>} />
          <Route path="/admin/:userName/:userRole" element={<AdminComponent />} />
          <Route path="/manager/:userName/:userRole" element={<ManagerComponent />} />
          <Route path="/customer/:userName/:userRole" element={<RenderProducts/>} />
          <Route path="/add-user/:userName/:userRole" element={<AddUserComponent />} />
          <Route path="/update-user/:id/:userName/:userRole" element={<UpdateUserComponent />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactUsPage/>}/>
        </Routes >
        
      </BrowserRouter>
      <div style={{ backgroundColor: "#7700a6", color: "white", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
        All rights reserved to @ Solventek Private Ltd
      </div>
    </div>
  );
}

export default App;
