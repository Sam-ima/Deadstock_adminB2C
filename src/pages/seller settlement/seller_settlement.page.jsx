import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSearch } from "../../components/searchbar/searchContext";

import SellerSettlementTable from "./seller_settlement_table";
import {
  fetchSellerSettlements,
  settleSellerPayment,
  deleteSellerSettlement,
} from "../../store/slices/sellerSettlementSlice";

const SellerSettlementPage = () => {
  const dispatch = useDispatch();
  const { settlements, loading, error } = useSelector(
    (state) => state.sellerSettlement
  );

  const { query } = useSearch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch settlements
  useEffect(() => {
    dispatch(fetchSellerSettlements());
  }, [dispatch]);

  // Filter settlements based on search query
  const filteredSettlements = useMemo(() => {
    if (!query) return settlements;

    const q = query.toLowerCase();

    return settlements.filter((s) => {
      return (
        (s.productName?.toLowerCase().includes(q) || false) ||
        (s.sellerName?.toLowerCase().includes(q) || false) ||
        (s.sellerPhone?.toLowerCase().includes(q) || false) ||
        (s.paymentMethod?.toLowerCase().includes(q) || false) ||
        (s.status?.toLowerCase().includes(q) || false)
      );
    });
  }, [settlements, query]);

  // Ensure current page is valid
  useEffect(() => {
    const maxPage = Math.floor((filteredSettlements.length - 1) / rowsPerPage);
    if (page > maxPage) setPage(maxPage >= 0 ? maxPage : 0);
  }, [filteredSettlements, page, rowsPerPage]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSettle = async (id, status) => {
    if (status === "settled") return; // Prevent action if already settled
    try {
      await dispatch(settleSellerPayment(id)).unwrap();
      toast.success("Payment settled successfully!");
    } catch (err) {
      toast.error("Failed to settle payment");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this settlement?")) {
      try {
        await dispatch(deleteSellerSettlement(id)).unwrap();
        toast.success("Settlement deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete settlement");
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Seller Settlements
      </Typography>

      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 3 }}>
          Error: {error}
        </Typography>
      )}

      {!loading && !error && (
        <SellerSettlementTable
          settlements={filteredSettlements}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onSettle={handleSettle}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default SellerSettlementPage;