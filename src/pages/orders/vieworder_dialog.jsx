import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
  Divider,
  Chip,
} from "@mui/material";

const ViewOrderDialog = ({ open, onClose, order }) => {
  if (!order) return null;
  const { deliveryDetails = {}, items = [] } = order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Typography fontWeight="bold">Order ID:</Typography>
        <Typography mb={2}>{order.id}</Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography fontWeight="bold">Customer:</Typography>
        <Typography>{deliveryDetails.fullName}</Typography>
        <Typography>{deliveryDetails.phone}</Typography>
        <Typography>{deliveryDetails.address}, {deliveryDetails.city}</Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography fontWeight="bold">Payment</Typography>
            <Chip label={order.paymentMethod} />
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">Status</Typography>
            <Chip
              label={order.paymentStatus}
              color={
                order.paymentStatus === "PAID"
                  ? "success"
                  : order.paymentStatus === "PENDING"
                  ? "warning"
                  : "error"
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">Total</Typography>
            <Typography>Rs {order.totalAmount}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">Items</Typography>
            {items.length > 0 ? (
              items.map((id, idx) => (
                <Typography key={idx} variant="body2">{id}</Typography>
              ))
            ) : (
              <Typography>No items</Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrderDialog;
