// src/components/Footer.js

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 4 }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Ultimate Leaderboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
