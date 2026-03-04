// src/components/Dashboard/DashboardHeader.jsx
import React from "react";
import { Grid, Typography, Paper, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";

const DashboardHeader = ({ theme }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          borderRadius: 3,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              B2C Admin Dashboard
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Dead Stock Inventory Overview
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
          >
            <Chip
              label={`Last Updated: ${new Date().toLocaleDateString()}`}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 500 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default DashboardHeader;