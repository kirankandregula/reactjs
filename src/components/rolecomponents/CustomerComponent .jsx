import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const CustomerComponent = () => {
  const { userName, userRole } = useParams(); // Accessing dynamic parameters from the URL
  const [products, setProducts] = useState([]);
  const [showHealthProducts, setShowHealthProducts] = useState(false); // State variable to track if health card is clicked

  useEffect(() => {
    fetchProducts();
  }, [showHealthProducts]); // Include showHealthProducts in the dependency array

  const fetchProducts = async () => {
    try {
      if (showHealthProducts) {
        const response = await ProductService.getAllHealthProducts();
        setProducts(response.data);
      } else {
        const response = await ProductService.getAllInsuranceProducts();
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products. Please try again.');
    }
  };

  const handleHealthCardClick = () => {
    setShowHealthProducts(true);
  };

  const handleInsuranceCardClick = () => {
    setShowHealthProducts(false);
  };

  const handleViewProduct = (productId) => {
    // Implement logic to open pop-up/modal and display product details
    const product = products.find(prod => prod.id === productId);
    if (product) {
      alert(`Product Name: ${product.name}\nPrice: $${product.price}`);
    }
  };

  const handleBuyProduct = (productId) => {
    // Implement logic to open pop-up/modal and display order confirmation message
    alert('Order successfully placed!');
  };

  return (
    <div>
      <h1 className='text-center'>Welcome {userName}</h1>
      <h2 className='text-center'>Role: {userRole}</h2>

      <div className="text-center">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow" onClick={handleHealthCardClick}>
              <img src="https://wallpapers.com/images/hd/doctor-with-stethoscope-ns774d1mrzrnhh59.jpg" className="card-img-top" alt="Doctor with Stethoscope" style={{ width: '350px', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">View Health Products</h5>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow" onClick={handleInsuranceCardClick}>
              <img src="https://www.renewbuy.com/sites/default/files/2023-10/Asset%205%40300x%20%281%29.png" className="card-img-top" alt="Insurance Concept" style={{ width: '350px', height: '300px' }} />
              <div className="card-body">
                <h5 className="card-title">View Insurance Products</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center m-3">Products</h2>
        <table className="table table-info">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name.toUpperCase()}</td>
                <td>${product.price}</td>
                <td>
                  {/* Only View and Buy buttons for customers */}
                  <button className="btn btn-primary mx-2" onClick={() => handleViewProduct(product.id)}>View</button>
                  <button className="btn btn-success" onClick={() => handleBuyProduct(product.id)}>Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
    </div>
  );
};

export default CustomerComponent;
