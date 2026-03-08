import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSearch } from "../../components/searchbar/searchContext";

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

  const { query } = useSearch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders based on search
  const filteredOrders = useMemo(() => {
    if (!query) return orders;

    const q = query.toLowerCase();

    return orders.filter((order) => {
      const customer = order.customerName || "";
      const city = order.deliveryDetails?.city || "";
      const address = order.deliveryDetails?.address || "";
      const phone = order.deliveryDetails?.phone || "";
      const paymentMethod = order.paymentMethod || "";
      const paymentStatus = order.paymentStatus || "";

      const itemMatch =
        order.items?.some((item) => item.name?.toLowerCase().includes(q)) ||
        false;

      return (
        customer.toLowerCase().includes(q) ||
        city.toLowerCase().includes(q) ||
        address.toLowerCase().includes(q) ||
        phone.toLowerCase().includes(q) ||
        paymentMethod.toLowerCase().includes(q) ||
        paymentStatus.toLowerCase().includes(q) ||
        itemMatch
      );
    });
  }, [orders, query]);

  // Ensure page is valid after filtering
  useEffect(() => {
    const maxPage = Math.floor((filteredOrders.length - 1) / rowsPerPage);
    if (page > maxPage) setPage(maxPage >= 0 ? maxPage : 0);
  }, [filteredOrders, page, rowsPerPage]);

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
        orders={filteredOrders} // pass filtered orders
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