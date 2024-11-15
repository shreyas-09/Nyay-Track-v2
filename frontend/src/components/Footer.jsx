import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box className="footer-container">
      <Divider />
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
        <Box display="flex" alignItems="center">
          <PhoneIcon style={{ color: '#0071e3', marginRight: '8px' }} />
          <Typography variant="body1" className="footer-contact">
            Advocate Mobile: +91 9876543210
          </Typography>
        </Box>
        <Button variant="contained" color="primary" className="footer-send-aor-button">
          Send to AOR
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
