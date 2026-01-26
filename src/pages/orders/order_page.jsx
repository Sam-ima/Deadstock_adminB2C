import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import OrderTable from "./order_table";
import ViewOrderDialog from "./vieworder_dialog";


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
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const handleViewOrder = (order) => {
  setSelectedOrder(order);
  setViewOpen(true);
};


  return (
    <Box sx={{ p: 3 }}>

      {/* Orders Table */}
      <OrderTable
        orders={orders}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewOrder={handleViewOrder}
      />
      {/* View Order Dialog */}
      <ViewOrderDialog
          open={viewOpen}
          order={selectedOrder}
          onClose={() => setViewOpen(false)}
        />

    </Box>
  );
};

export default Orders;
