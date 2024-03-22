import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';

const UpdateUserComponent = () => {
  const { id, userName, userRole } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    userName: '',
    passWord: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUserById(id);
        setUser(response);
        setUpdatedUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(updatedUser);
      await UserService.updateUser(id, updatedUser);
      alert('User updated successfully!');
      navigate(`/manager/${userName}/${userRole}`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark p-4">
      <h2 className="text-white text-center">Update User</h2>
      <h3 className="text-white text-center">Admin Name: {userName}</h3> 
      <h3 className="text-white text-center">Admin Role: {userRole}</h3> 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Username:</label>
          <input type="text" className="form-control" name="userName" value={updatedUser.userName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Password:</label>
          <input type="password" className="form-control" name="passWord" value={updatedUser.passWord} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Role:</label>
          <select className="form-control" name="role" value={updatedUser.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
        </div>
        <button type="submit" className="btn btn-info">Update User</button>
      </form>

      <div className="mt-3">
        <Link to={`/manager/${userName}/${userRole}`} className="btn btn-danger">Back</Link>
      </div>
    </div>
  );
};

export default UpdateUserComponent;
