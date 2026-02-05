import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommissions, deleteCommission } from "../../store/slices/commission_slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

const CommissionTable = () => {
  const dispatch = useDispatch();
const { list = [], loading = false } =
  useSelector((state) => state.commission || {});
  

  useEffect(() => {
    dispatch(fetchCommissions());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Buyer ID</TableCell>
            <TableCell>Seller ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell>Commission</TableCell>
            <TableCell>Amount to Seller</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.buyerId}</TableCell>
              <TableCell>{item.sellerId}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.subtotal}</TableCell>
              <TableCell>{item.commissionAmount}</TableCell>
              <TableCell>{item.amountToSeller}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.paymentMethod}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => dispatch(deleteCommission(item.id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default CommissionTable;
