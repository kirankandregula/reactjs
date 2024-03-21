import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage ';
import RegistrationForm from './components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import HealthProductComponent from './components/HealthProductComponent';
import InsuranceProductComponent from './components/InsuranceProductComponent';
import LoginForm from './components/LoginForm';
import AddProductComponent from './components/productComponents/AddProductComponent ';
import UpdateProductComponent from './components/productComponents/UpdateProductComponent ';
import DeleteProductComponent from './components/productComponents/DeleteProductComponent ';

import AdminComponent from './components/usercomponents/AdminComponent ';
import ManagerComponent from './components/usercomponents/ManagerComponent ';
import CustomerComponent from './components/usercomponents/CustomerComponent ';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products/health" element={<HealthProductComponent />} />
          <Route path="/products/insurance" element={<InsuranceProductComponent />} />
          <Route path="/add-product/:userName/:userRole" element={<AddProductComponent/>} />
        <Route path="/update/:id/:userName/:userRole" element={<UpdateProductComponent/>} />
        <Route path="/delete-product" element={<DeleteProductComponent/>} />
        <Route path="/admin/:userName/:userRole" element={<AdminComponent />} />
        <Route path="/manager/:userName/:userRole" element={<ManagerComponent />} />
        <Route path="/customer/:userName/:userRole" element={<CustomerComponent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
