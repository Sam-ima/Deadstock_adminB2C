import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCommissions,
  settleCommission,
} from "../../store/slices/commission_slice";
import { fetchSellers } from "../../store/slices/seller_slice";

import {
  Box,
  Typography,
  Button,
  Chip,
  TableRow,
  TableCell,
} from "@mui/material";

import CommonTable from "../../components/Table/common_table";

const SellerSettlementPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const commissions = useSelector(
    (state) => state.commission?.list || []
  );
  const loading = useSelector(
    (state) => state.commission?.loading
  );
  const sellers = useSelector(
    (state) => state.sellers?.list || []
  );

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data
  useEffect(() => {
    if (commissions.length === 0) {
      dispatch(fetchCommissions());
    }
    if (sellers.length === 0) {
      dispatch(fetchSellers());
    }
  }, [dispatch]);

  // Helpers
  const getSellerName = (sellerId) => {
    const seller = sellers.find((s) => s.id === sellerId);
    return seller?.name || "Unknown Seller";
  };

  // Table columns
  const columns = [
    { id: "product", label: "Product" },
    { id: "seller", label: "Seller" },
    { id: "subtotal", label: "Subtotal" },
    { id: "commission", label: "Commission" },
    { id: "amount", label: "Amount to Seller" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action", width: 120 },
  ];

  // Paginated data
  const paginatedData = commissions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Row renderer
  const renderRow = (row) => (
    <TableRow key={row.id} hover>
      <TableCell>{row.productName}</TableCell>

      <TableCell>{getSellerName(row.sellerId)}</TableCell>

      <TableCell>₹{row.subtotal}</TableCell>

      <TableCell>
        ₹{row.commissionAmount} (
        {(row.commissionRate * 100).toFixed(0)}%)
      </TableCell>

      <TableCell>
        <strong>₹{row.amountToSeller}</strong>
      </TableCell>

      <TableCell>
        <Chip
          label={row.status}
          size="small"
          color={row.status === "pending" ? "warning" : "success"}
        />
      </TableCell>

      <TableCell align="center">
        {row.status === "pending" ? (
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => dispatch(settleCommission(row.id))}
          >
            Pay
          </Button>
        ) : (
          <Chip label="Paid" size="small" />
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Seller Settlement
      </Typography>

      <CommonTable
        columns={columns}
        data={paginatedData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        emptyMessage={
          loading ? "Loading settlements..." : "No commission records found"
        }
        renderRow={renderRow}
      />
    </Box>
  );
};

export default SellerSettlementPage;
