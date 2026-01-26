import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import OrderTable from "./order_table";
import ViewOrderDialog from "./vieworder_dialog";
import EditOrderDialog from "./editorder_dialog";
import {
  fetchOrders,
  updateOrder,
  deleteOrder,
} from "../../store/slices/order_slice";

const Orders = () => {
  const dispatch = useDispatch();
  const { list: orders } = useSelector((state) => state.orders);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditOpen(true);
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await dispatch(deleteOrder(id));
      toast.success("Order deleted successfully!");
    }
  };

const handleUpdateOrder = async (id, data) => {
  try {
    // Only send the fields you want to update
    await dispatch(updateOrder({ id, data })).unwrap();
    toast.success("Order updated successfully!");
    setEditOpen(false);
  } catch (error) {
    toast.error("Failed to update order: " + error);
  }
};


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Orders
      </Typography>

      <OrderTable
        orders={orders}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewOrder={handleViewOrder}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
      />

      <ViewOrderDialog
        open={viewOpen}
        order={selectedOrder}
        onClose={() => setViewOpen(false)}
      />

      <EditOrderDialog
        open={editOpen}
        order={selectedOrder}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdateOrder}
      />
    </Box>
  );
};

export default Orders;
