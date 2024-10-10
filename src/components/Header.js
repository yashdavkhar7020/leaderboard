// src/components/Header.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <EmojiEventsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ultimate Leaderboard
          </Typography>
          {/* Add navigation or user profile here if needed */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
