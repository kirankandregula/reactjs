import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const AdminComponent = () => {
  const { userName, userRole } = useParams(); // Accessing dynamic parameters from the URL
  const [healthProducts, setHealthProducts] = useState([]);
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [showHealthProducts, setShowHealthProducts] = useState(false); // State variable to track if health card is clicked
  const [showInsuranceProducts, setShowInsuranceProducts] = useState(false); // State variable to track if insurance card is clicked

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

  return (
    <div>
      <div className="container mt-5">
        <h1 className='text-center'>Welcome {userName}</h1>
        <h2 className='text-center'>Role: {userRole}</h2>

        <div className="mb-3 text-center">
          <Link to={`/add-product/${userName}/${userRole}`} className="btn btn-success mx-2">Add Product</Link>
         
        </div>

        <div className="text-center">
          <h2 className="m-3">Products</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow" onClick={handleHealthCardClick}>
              <img src="https://wallpapers.com/images/hd/doctor-with-stethoscope-ns774d1mrzrnhh59.jpg" className="card-img-top" alt="Doctor with Stethoscope" style={{ width: '350px', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">Healthcare Professional</h5>
                <p className="card-text">Qualified healthcare professional.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow" onClick={handleInsuranceCardClick}>
              <img src="https://www.renewbuy.com/sites/default/files/2023-10/Asset%205%40300x%20%281%29.png" className="card-img-top" alt="Insurance Concept" style={{ width: '350px', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">Insurance Concept</h5>
                <p className="card-text">Learn about insurance concepts.</p>
              </div>
            </div>
          </div>
        </div>

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
  );
};

export default AdminComponent;
