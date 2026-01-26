import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import OrderTable from "./order_table";
import ViewOrderDialog from "./vieworder_dialog";
import { fetchOrders } from "../../store/slices/order_slice";

const Orders = () => {
  const dispatch = useDispatch();

  const { list: orders, loading, error } = useSelector(
    (state) => state.orders
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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
      {/* Header */}
      {/* <Paper sx={{ p: 2, mb: 3 }}> */}
        <Typography variant="h5" fontWeight={600}>
          Orders
        </Typography>
      
      {/* </Paper> */}

      {/* Table */}
      <OrderTable
        orders={orders}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewOrder={handleViewOrder}
      />

      {/* View Dialog */}
      <ViewOrderDialog
        open={viewOpen}
        order={selectedOrder}
        onClose={() => setViewOpen(false)}
      />
    </Box>
  );
};

export default Orders;
