import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

const EditOrderDialog = ({ open, onClose, order, onSave }) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (order) {
      setPaymentStatus(order.paymentStatus || "");
      setPaymentMethod(order.paymentMethod || "");
    }
  }, [order]);

  const handleSave = () => {
    onSave(order.id, { paymentStatus, paymentMethod });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent dividers>
        <TextField
          select
          label="Payment Status"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="PAID">PAID</MenuItem>
          <MenuItem value="FAILED">FAILED</MenuItem>
        </TextField>

        <TextField
          select
          label="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="ESEWA">ESEWA</MenuItem>
          <MenuItem value="CASH">CASH</MenuItem>
          <MenuItem value="KHALTI">KHALTI</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderDialog;
