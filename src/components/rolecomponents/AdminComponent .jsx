import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { useCookies } from 'react-cookie';

const AdminComponent = () => {
  const { userName, userRole } = useParams(); // Accessing dynamic parameters from the URL
  const [healthProducts, setHealthProducts] = useState([]);
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [showHealthProducts, setShowHealthProducts] = useState(true); // State variable to track if health card is clicked
  const [showInsuranceProducts, setShowInsuranceProducts] = useState(false); // State variable to track if insurance card is clicked
  const [, , removeCookie] = useCookies(['userName', 'userRole']); 
  const navigate = useNavigate(); // Use useNavigate to navigate to a different page

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const healthResponse = await ProductService.getAllHealthProducts();
      const insuranceResponse = await ProductService.getAllInsuranceProducts();
      console.log(insuranceResponse.data);
      setHealthProducts(healthResponse.data);
      setInsuranceProducts(insuranceResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products. Please try again.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteHealthProduct(productId);
      await ProductService.deleteInsuranceProduct(productId); // Delete from insurance products as well
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  // Function to handle clicking on health card
  const handleHealthCardClick = () => {
    setShowHealthProducts(true); // Set state to show health products
    setShowInsuranceProducts(false); // Hide insurance products
  };

  // Function to handle clicking on insurance card
  const handleInsuranceCardClick = () => {
    setShowInsuranceProducts(true); // Set state to show insurance products
    setShowHealthProducts(false); // Hide health products
  };

  const handleLogout = () => {
    // Implement logout logic
    removeCookie('userName', { path: '/' });
    removeCookie('userRole', { path: '/' });
    navigate('/');
  };

  return (
    <div>
      <div className="container">
        <div className='d-flex justify-content-end mt-5  mb-2 text-end text-white'>
          <div style={{ backgroundColor: '#c62fde', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
            <h5 className='mt-2'>Welcome {userName.toUpperCase()}</h5>
            <h6>Role: {userRole}</h6>
          </div>
        </div>

        <div className="mb-3 text-end">
          <Link to={`/add-product/${userName}/${userRole}`} className="btn btn-success mx-2">Add Product</Link>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>

        <div className="text-center">
          <h2 className="card-title mb-1">Products</h2>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-2">
              {/* Cards on the left side */}
              <div className="mb-2">
                <div className="card shadow" onClick={handleHealthCardClick}>
                  <img src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?size=626&ext=jpg" className="card-img-top" alt="Doctor with Stethoscope" style={{ width: '160px', height: '180px' }} />
                  <div className="card-body">
                    <h6 className="card-title">View Health Services</h6>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="card shadow" onClick={handleInsuranceCardClick}>
                  <img src="https://www.renewbuy.com/sites/default/files/2023-10/Asset%205%40300x%20%281%29.png" className="card-img-top" alt="Insurance Concept" style={{ width: '180px', height: '180px' }} />
                  <div className="card-body">
                    <h6 className="card-title">View Insurance Products</h6>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-8">
              {/* Products on the right side */}
              {/* Conditionally render health products if showHealthProducts is true */}
              {showHealthProducts && (
                <div>
                  <div className="row justify-content-center">
                    {healthProducts.map(product => (
                      <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{product.name.toUpperCase()}</h5>
                            <p className="card-text">${product.price}</p>
                            <div className="text-center">
                              <Link to={{ pathname: `/update/${product.id}/${userName}/${userRole}`}} className="btn btn-outline-success mx-2">Update</Link>
                              <button className="btn btn-outline-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditionally render insurance products if showInsuranceProducts is true */}
              {showInsuranceProducts && (
                <div>
                  <div className="row justify-content-center">
                    {insuranceProducts.map(product => (
                      <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{product.name.toUpperCase()}</h5>
                            <p className="card-text">${product.price}</p>
                            <div className="text-center">
                              <Link to={{ pathname: `/update/${product.id}/${userName}/${userRole}`}} className="btn btn-outline-success mx-2">Update</Link>
                              <button className="btn btn-outline-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
