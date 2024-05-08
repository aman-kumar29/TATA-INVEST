import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

function WithdrawalForm({ open, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  // const [UPI_ID, setUPI_ID] = useState('');

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    // if (!UPI_ID) {
    //   alert('Please enter a valid UPI_ID');
    //   return;
    // }

    onSubmit(amount);
    setAmount('');
    // setUPI_ID('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Withdrawal Form</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          {/* <TextField
            label="UPI_ID"
            type="text"
            value={UPI_ID}
            onChange={(e) =>setUPI_ID(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          /> */}
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawalForm;
