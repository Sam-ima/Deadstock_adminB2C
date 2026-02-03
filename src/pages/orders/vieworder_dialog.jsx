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
  Box,
  Paper,
} from "@mui/material";

const ViewOrderDialog = ({ open, onClose, order }) => {
  if (!order) return null;

  const { deliveryDetails = {}, items = [] } = order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ background: "#1976d2", color: "#fff" }}>
        Order Details
      </DialogTitle>

      <DialogContent dividers>
        {/* ORDER INFO */}
        <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography fontWeight={600}>Order ID:</Typography>
          <Typography mb={1}>{order.id}</Typography>

          <Typography fontWeight={600}>Created At:</Typography>
          <Typography mb={1}>
            {order.createdAt?.toString() || "N/A"}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography fontWeight={600}>Customer Info:</Typography>
          <Typography>{deliveryDetails.fullName || "-"}</Typography>
          <Typography>{deliveryDetails.phone || "-"}</Typography>
          <Typography>
            {deliveryDetails.address || "-"}, {deliveryDetails.city || "-"}
          </Typography>
          <Typography>{deliveryDetails.state || "-"}</Typography>
          <Typography>{deliveryDetails.zip || "-"}</Typography>
        </Paper>

        {/* ITEMS */}
        <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography fontWeight={600} mb={1}>
            Ordered Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {items.length > 0 ? (
            items.map((item, idx) => (
              <Box
                key={item.productId || idx}
                mb={2}
                sx={{ p: 1, border: "1px solid #eee", borderRadius: 1 }}
              >
                <Typography fontWeight={500}>{item.name}</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">
                      Price:
                    </Typography>
                    <Typography>Rs {item.price}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">
                      Quantity:
                    </Typography>
                    <Typography>{item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" color="text.secondary">
                      Subtotal:
                    </Typography>
                    <Typography>Rs {item.subtotal}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Typography>No items found</Typography>
          )}
        </Paper>

        {/* PAYMENT */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography fontWeight={600}>Payment Method</Typography>
              <Chip label={order.paymentMethod} color="primary" />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight={600}>Payment Status</Typography>
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
              <Typography fontWeight={600}>Total Amount</Typography>
              <Typography>Rs {order.totalAmount}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewOrderDialog;
