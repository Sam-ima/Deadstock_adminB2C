
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerSettlements,
  settleSellerPayment,
  deleteSellerSettlement,
} from "../../store/slices/sellerSettlementSlice";

const SellerSettlementTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.sellerSettlement
  );

  useEffect(() => {
    console.log("🔄 Dispatching fetchSellerSettlements");
    dispatch(fetchSellerSettlements());
  }, [dispatch]);

  useEffect(() => {
    console.log("📊 Current Redux data:", data);
    console.log("📊 Data length:", data.length);
    if (data.length > 0) {
      console.log("📊 First item:", data[0]);
    }
  }, [data]);

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 5 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Total Records: {data.length}
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Seller ID</TableCell>
              <TableCell>Buyer ID</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Seller Amount</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No settlements found
                </TableCell>
              </TableRow>
            )}

            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.productName || "N/A"}</TableCell>
                <TableCell>{row.sellerId?.substring(0, 8)}...</TableCell>
                <TableCell>{row.buyerId?.substring(0, 8)}...</TableCell>
                <TableCell>Rs. {row.subtotal || 0}</TableCell>
                <TableCell>Rs. {row.commissionAmount || 0}</TableCell>
                <TableCell>Rs. {row.amountToSeller || 0}</TableCell>
                <TableCell>{row.paymentMethod || "N/A"}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status || "unknown"}
                    color={row.status === "settled" ? "success" : "warning"}
                  />
                </TableCell>
                
                <TableCell>
                  {row.createdAt 
                    ? new Date(row.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {row.status !== "settled" && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => dispatch(settleSellerPayment(row.id))}
                      >
                        Settle
                      </Button>
                    )}

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(deleteSellerSettlement(row.id))}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SellerSettlementTable;