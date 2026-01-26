import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import OrderTable from "./order_table";

// TEMP data (replace with API / Firestore later)
const mockOrders = [
  {
    id: "AqYYBeAUynzkMfgeMjf6",
    createdAt: new Date(),
    deliveryDetails: {
      fullName: "Sima Thapa",
      phone: "980322",
      city: "Lalitpur",
      address: "Sanepa",
    },
    items: ["dx5mB0bTSB67KYokBbXu"],
    paymentMethod: "ESEWA",
    paymentStatus: "PENDING",
    totalAmount: 149,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewOrder = (order) => {
    console.log("View Order:", order);
    // later → open modal or navigate to order details page
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Orders
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage customer orders and payment status
        </Typography>
      </Paper>

      {/* Orders Table */}
      <OrderTable
        orders={orders}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewOrder={handleViewOrder}
      />
    </Box>
  );
};

export default Orders;
