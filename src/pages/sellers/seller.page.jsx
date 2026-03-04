import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";
import SellerTable from "../../components/seller/sellerTable";

const SellerPage = () => {
  return (
    <Box p={3}>
      <Typography
        // className="responsive_fontsize32"
        variant="h5"
        fontWeight={600} mb={3}
        // sx={{
        //   p:1.5,
        //   display: "flex",
        //   justifyContent: "center",
        //   color:"#1976d2",
        //   fontWeight: "bold",
        //   mt: { xs: 1.5, sm: 0 },  
        // }}
      >
        Seller Details
      </Typography>
      <SellerTable/>

    </Box>
  );
};

export default SellerPage;