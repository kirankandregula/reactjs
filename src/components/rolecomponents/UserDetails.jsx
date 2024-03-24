const UserDetails = ({ userName, userRole }) => {
    return (
      <div>
        <h1 className='text-center mt-5'>Welcome {userName}</h1>
        <h2 className='text-center'>Role: {userRole}</h2>
      </div>
    );
  };

export default UserDetails;