import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommissions,
  settleCommission,
} from "../store/slices/commission_slice";
import { fetchSellers } from "../store/slices/seller_slice";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";

const SellerSettlementPage = () => {
  const dispatch = useDispatch();

  const { list: commissions } = useSelector(
    (state) => state.commission
  );
  const { list: sellers } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(fetchCommissions());
    dispatch(fetchSellers());
  }, [dispatch]);

  const getSellerName = (sellerId) =>
    sellers.find((s) => s.id === sellerId)?.name || "Unknown Seller";

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Seller Settlement
      </Typography>

      <Paper elevation={4}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Payable</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {commissions.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{getSellerName(row.sellerId)}</TableCell>
                <TableCell>₹{row.subtotal}</TableCell>
                <TableCell>
                  ₹{row.commissionAmount} ({row.commissionRate * 100}%)
                </TableCell>
                <TableCell>₹{row.amountToSeller}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      row.status === "pending"
                        ? "warning"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {row.status === "pending" ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() =>
                        dispatch(settleCommission(row.id))
                      }
                    >
                      Pay
                    </Button>
                  ) : (
                    <Chip label="Paid" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SellerSettlementPage;
