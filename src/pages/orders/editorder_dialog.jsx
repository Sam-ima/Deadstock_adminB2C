import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../store/slices/order_slice";

const EditOrderDialog = ({ open, onClose, order }) => {
  const dispatch = useDispatch();

  // Delivery details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [zip, setZip] = useState("");

  // Payment
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Total
  const [totalAmount, setTotalAmount] = useState(0);

  // Initialize state from order when dialog opens
  useEffect(() => {
    if (order) {
      const delivery = order.deliveryDetails || {};
      setFullName(delivery.fullName || "");
      setPhone(delivery.phone || "");
      setAddress(delivery.address || "");
      setCity(delivery.city || "");
      setStateField(delivery.state || "");
      setZip(delivery.zip || "");

      setPaymentStatus(order.paymentStatus || "");
      setPaymentMethod(order.paymentMethod || "");
      setTotalAmount(order.totalAmount || 0);
    }
  }, [order]);

  const handleSave = () => {
    const updatedData = {
      paymentStatus,
      paymentMethod,
      totalAmount,
      deliveryDetails: {
        fullName,
        phone,
        address,
        city,
        state: stateField,
        zip,
      },
    };

    // Dispatch Redux thunk to update Firestore
    dispatch(updateOrder({ id: order.id, data: updatedData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Delivery Details */}
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              value={stateField}
              onChange={(e) => setStateField(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              fullWidth
            />
          </Grid>

          {/* Payment */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Payment Status"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="PAID">PAID</MenuItem>
              <MenuItem value="FAILED">FAILED</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
            >
              <MenuItem value="ESEWA">ESEWA</MenuItem>
              <MenuItem value="CASH">CASH</MenuItem>
              <MenuItem value="KHALTI">KHALTI</MenuItem>
            </TextField>
          </Grid>

          {/* Total Amount */}
          <Grid item xs={12}>
            <TextField
              label="Total Amount"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              fullWidth
            />
          </Grid>
        </Grid>
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
