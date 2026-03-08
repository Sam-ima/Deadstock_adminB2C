import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
  Chip
} from "@mui/material";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const BuyerProductsDialog = ({ open, handleClose, buyer }) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!buyer || !open) return;

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const buyerUid = buyer.uid || buyer.id;

        // ✅ Query using userId
        const q = query(
          collection(db, "orders"),
          where("userId", "==", buyerUid)
        );

        const snapshot = await getDocs(q);

        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(orderList);

      } catch (error) {

        console.error("Error fetching orders:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, [buyer, open]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

      <DialogTitle>
        Orders of {buyer?.fullName}
      </DialogTitle>

      <DialogContent dividers>

        {loading && (
          <Typography align="center">Loading orders...</Typography>
        )}

        {!loading && orders.length === 0 && (
          <Typography align="center">
            No orders found for this buyer
          </Typography>
        )}

        {!loading && orders.length > 0 && (

          <Box>

            {orders.map((order) => (

              <Box
                key={order.id}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  mb: 3
                }}
              >

                {/* Order Info */}

                <Typography variant="subtitle2">
                  <b>Order Date:</b> {formatDate(order.createdAt)}
                </Typography>

                <Typography>
                  <b>Total Amount:</b> Rs. {order.totalAmount}
                </Typography>

                <Typography>
                  <b>Payment Method:</b> {order.paymentMethod}
                </Typography>

                <Box sx={{ mt: 1, mb: 2 }}>
                  <Chip
                    label={order.paymentStatus}
                    color={order.paymentStatus === "PAID" ? "success" : "warning"}
                    size="small"
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Products */}

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Products
                </Typography>

                {order.items?.map((item, index) => (

                  <Grid container spacing={1} key={index} sx={{ mb: 1 }}>

                    <Grid item xs={5}>
                      <Typography>
                        <b>Name:</b> {item.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        <b>Price:</b> Rs. {item.price}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography>
                        <b>Qty:</b> {item.quantity}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography>
                        <b>Subtotal:</b> Rs. {item.subtotal}
                      </Typography>
                    </Grid>

                  </Grid>

                ))}

                <Divider sx={{ mt: 2, mb: 2 }} />

                {/* Delivery Info */}

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Delivery Details
                </Typography>

                <Typography>
                  <b>Address:</b> {order.deliveryDetails?.address}
                </Typography>

                <Typography>
                  <b>City:</b> {order.deliveryDetails?.city}
                </Typography>

                <Typography>
                  <b>State:</b> {order.deliveryDetails?.state}
                </Typography>

                <Typography>
                  <b>Phone:</b> {order.deliveryDetails?.phone}
                </Typography>

              </Box>

            ))}

          </Box>

        )}

      </DialogContent>

      <DialogActions>

        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>

      </DialogActions>

    </Dialog>

  );

};

export default BuyerProductsDialog;