// src/components/ClaimHistory.js

import React, { useEffect, useState } from 'react';
import { getClaimHistory } from '../services/api'; // Corrected path
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Box,
  Alert,
} from '@mui/material';
import PointIcon from '@mui/icons-material/PointOfSale';

const ClaimHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClaimHistory = async () => {
      try {
        const data = await getClaimHistory(userId);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching claim history:', error);
        setError('Failed to load claim history.');
      }
    };

    if (userId) {
      fetchClaimHistory();
    }
  }, [userId]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Claim History
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {history.length === 0 ? (
        <Typography>No claims yet.</Typography>
      ) : (
        <List>
          {history.map((claim) => (
            <React.Fragment key={claim._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PointIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${claim.points} points`}
                  secondary={`On ${new Date(claim.date).toLocaleString()}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ClaimHistory;
