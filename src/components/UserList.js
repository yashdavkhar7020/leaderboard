import React from 'react';

const UserList = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div>
      <h2>Select User</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">--Select a User--</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserList;
