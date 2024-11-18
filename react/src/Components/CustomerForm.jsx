import React from 'react';
import { TextField, Button, Box } from '@mui/material';


/**
 * CustomerForm component that collects customer details (full name, address, email)
 * for the checkout process.
 */
const CustomerForm = ({ onSubmit }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, width: '100%' }}>
      <TextField id="fullName" label="Full Name" variant="outlined" fullWidth />
      <TextField id="address" label="Address" variant="outlined" fullWidth />
      <TextField id="email" label="Email" variant="outlined" fullWidth />
      <Button  variant="contained" color="primary" onClick={onSubmit} sx={{textTransform: 'none', marginTop: 2 }}>
        Finish Order
      </Button>
    </Box>
  );
};

export default CustomerForm;
