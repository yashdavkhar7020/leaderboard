// src/components/AddUser.js

import React, { useState } from 'react';
import { addUser } from '../services/api'; // Adjust the path as necessary

const AddUser = ({ onUserAdded }) => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName) {
            setError('User name is required.');
            return;
        }
        try {
            await addUser({ name: userName });
            setUserName('');
            setError('');
            onUserAdded(); // Call the prop function to refresh user list
        } catch (err) {
            setError('Error adding user');
            console.error(err); // Log the actual error for debugging
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter user name"
                />
                <button type="submit">Add User</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddUser;
