// src/components/MainContent.js

import React from 'react';
import { Grid, Container } from '@mui/material';
import Leaderboard from './Leaderboard';
import UserForm from './UserForm';
import ClaimHistory from './ClaimHistory';

const MainContent = ({ users, onUserAdded, historyUserId, setHistoryUserId }) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Leaderboard Section */}
        <Grid item xs={12} md={8}>
          <Leaderboard users={users} setHistoryUserId={setHistoryUserId} />
        </Grid>
        
        {/* User Management Section */}
        <Grid item xs={12} md={4}>
          <UserForm onUserAdded={onUserAdded} />
        </Grid>
        
        {/* Claim History Section */}
        {historyUserId && (
          <Grid item xs={12}>
            <ClaimHistory userId={historyUserId} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MainContent;
