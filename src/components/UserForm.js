// src/components/UserForm.js

import React, { useEffect, useState } from 'react';
import { addUser, getUsers, awardPoints } from '../services/api'; // Corrected path
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Alert,
  Avatar,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UserForm = ({ onUserAdded }) => {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsToAward, setPointsToAward] = useState('');
  const [awardedPoints, setAwardedPoints] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch users from the API when the component mounts or when onUserAdded changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response); // getUsers already returns response.data (array of users)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [onUserAdded]);

  const handleAddUser = async () => {
    if (!userName.trim()) {
      setError('User name is required.');
      setSuccessMsg('');
      return;
    }
    try {
      await addUser({ name: userName, avatar: userAvatar });
      setUserName('');
      setUserAvatar('');
      setError('');
      setSuccessMsg('User added successfully!');
      onUserAdded();
      // Optionally, remove success message after a delay
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setError('Error adding user');
      setSuccessMsg('');
      console.error('Error:', error);
    }
  };

  const handleAwardPoints = async () => {
    if (!selectedUser) {
      setError('Please select a user to award points.');
      setSuccessMsg('');
      return;
    }
    if (!pointsToAward || isNaN(pointsToAward) || pointsToAward <= 0) {
      setError('Please enter a valid number of points.');
      setSuccessMsg('');
      return;
    }
    try {
      await awardPoints(selectedUser, parseInt(pointsToAward));
      setPointsToAward('');
      setError('');
      setSuccessMsg('Points awarded successfully!');
      onUserAdded(); // Refresh users list
      // Optionally, remove success message after a delay
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setError('Error awarding points');
      setSuccessMsg('');
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>

      {/* Add New User Section */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Avatar URL"
              variant="outlined"
              fullWidth
              value={userAvatar}
              onChange={(e) => setUserAvatar(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<PersonAddIcon />}
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </Grid>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}
          </Grid>
        </Grid>
      </Box>

      {/* Award Points Section */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Award Points
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-user-label">Select User</InputLabel>
              <Select
                labelId="select-user-label"
                value={selectedUser}
                label="Select User"
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <MenuItem value="">
                  <em>--Select a User--</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    <Avatar
                      alt={user.name}
                      src={user.avatar || ''}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Points to Award"
              variant="outlined"
              fullWidth
              type="number"
              value={pointsToAward}
              onChange={(e) => setPointsToAward(e.target.value)}
              placeholder="Enter points"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAwardPoints}
              disabled={!selectedUser || !pointsToAward}
            >
              Award Points
            </Button>
          </Grid>
          <Grid item xs={12}>
            {awardedPoints !== null && (
              <Alert severity="success">
                Awarded {awardedPoints} points to{' '}
                {users.find((user) => user._id === selectedUser)?.name || 'User'}.
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserForm;
