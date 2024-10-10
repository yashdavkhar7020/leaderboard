// src/components/Leaderboard.js
import { Button } from '@mui/material';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Badge for ranks
const StyledBadge = styled(Badge)(({ theme, rank }) => ({
  '& .MuiBadge-badge': {
    backgroundColor:
      rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32', // Gold, Silver, Bronze
    color: 'white',
    right: -30,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Leaderboard = ({ users, setHistoryUserId }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <Typography>No users available.</Typography>;
  }

  // Sort users based on points, descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={user._id} hover>
                <TableCell align="center">
                  {index + 1 <= 3 ? (
                    <StyledBadge
                      badgeContent={index + 1}
                      rank={index + 1}
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <Avatar alt={user.name} src={user.avatar || ''} />
                    </StyledBadge>
                  ) : (
                    <Typography variant="body1">{index + 1}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={user.name}
                      src={user.avatar || ''}
                      sx={{ mr: 2 }}
                    />
                    <Typography variant="body1">{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">{user.points}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => setHistoryUserId(user._id)}
                  >
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
