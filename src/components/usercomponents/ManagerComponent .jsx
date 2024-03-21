// ManagerComponent.js
import React from 'react';
import {Link, useParams} from 'react-router-dom';

const ManagerComponent = () => {
  // Functionality specific to manager role
  const{userName,userRole} = useParams();
  return (
    <div>
      <h1>Welcome {userName}</h1>
      <h2>Role: {userRole}</h2>
      {/* Add functionality specific to admin */}
      <Link to={`/`} className="btn btn-success mx-2">Home</Link>
    </div>
  );
};

export default ManagerComponent;
