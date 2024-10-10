// src/App.js

import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { getUsers } from './services/api';
import { io } from 'socket.io-client';
import './App.css';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const App = () => {
  const [users, setUsers] = useState([]);
  const [historyUserId, setHistoryUserId] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchUsers();

    // Initialize Socket.io
    socketRef.current = io(SOCKET_URL);

    // Listen for 'update' events
    socketRef.current.on('update', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  return (
    <div className="App">
      <Header />
      <MainContent
        users={users}
        onUserAdded={handleUserAdded}
        historyUserId={historyUserId}
        setHistoryUserId={setHistoryUserId}
      />
      <Footer />
    </div>
  );
};

export default App;
