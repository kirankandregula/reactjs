import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { useCookies } from 'react-cookie';


const RenderProducts = () => {
   
    const [products, setProducts] = useState([]);
    const [showHealthProducts, setShowHealthProducts] = useState(false); // State variable to track if health card is clicked
    const [cookies] = useCookies(['userName', 'userRole']);
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['userName', 'userRole']); 

    useEffect(() => {
      fetchProducts();
    }, [showHealthProducts]); // Include showHealthProducts in the dependency array

    useEffect(() => {
        if (!cookies.userName || !cookies.userRole) {
            navigate('/login');
        }
    }, [cookies, navigate]);
  
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

    const handleLogout = () => {
        removeCookie('userName', { path: '/' });
        removeCookie('userRole', { path: '/' });
        navigate('/');
      };
  
    const handleBuyProduct = (productId) => {
      // Implement logic to open pop-up/modal and display order confirmation message
      alert('Order successfully placed!');
    };
  
    return (
      <div>
         <div className='d-flex  justify-content-end mt-5 mx-2 mb-1 text-end text-white'>
      <div style={{ backgroundColor: '#c62fde', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
        <h5 className='mt-2'>Welcome {cookies.userName}</h5>
        <h6>Role: {cookies.userRole}</h6>
       
      </div>
      
    </div>
    <div className="d-flex  justify-content-end  mx-2  text-end">
        <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
      </div>
  
    <div className="container">
  <div className="row">
    <div className="col-md-2">
      {/* Cards on the left side */}
      <div className="mb-2">
        <div className="card shadow" onClick={handleHealthCardClick}>
          <img src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?size=626&ext=jpg" className="card-img-top" alt="Doctor with Stethoscope" style={{ width: '164px', height: '180px' }} />
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
      <div>
        <h2 className="text-center m-3 card-title">Products</h2>
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
                <td>₹{product.price}</td>
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
    </div>
  </div>
</div>


      </div>
    );
   
};


export default RenderProducts