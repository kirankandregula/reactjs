import React from 'react';

const ContactUsPage = () => {
  return (
    <div style={{color: '#7700a6', minHeight: '100vh', padding: '20px',marginTop:"40px" }}>
      <h1 className="text-center ">Contact Us</h1>
      <p className="text-center ">
        For any inquiries or assistance, please contact us at:
      </p>
      <div className="text-center ">
        <p>Email: contact@example.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
    </div>
  );
};

export default ContactUsPage;
