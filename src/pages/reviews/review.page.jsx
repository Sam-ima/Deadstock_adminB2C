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

const ReviewPage = () => {
  return (
    <>
      <Typography
        className="responsive_fontsize32"
        variant="h4"
        sx={{
          p:1.5,
          display: "flex",
          justifyContent: "center",
          color:"#1976d2",
          fontWeight: "bold",
          mt: { xs: 1.5, sm: 0 },  
        }}
      >
        Review Details
      </Typography>

    </>
  );
};

export default ReviewPage;