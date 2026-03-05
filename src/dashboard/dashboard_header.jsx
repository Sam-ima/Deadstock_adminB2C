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
          p: { xs: 2, sm: 3, md: 4 }, // ✅ Responsive padding
          mb: { xs: 2, sm: 3, md: 4 },
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          borderRadius: 3,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Circles */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: { xs: 120, sm: 160, md: 200 }, // ✅ Responsive size
            height: { xs: 120, sm: 160, md: 200 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: { xs: 180, sm: 240, md: 300 },
            height: { xs: 180, sm: 240, md: 300 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* Left Section */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.3rem",
                  md: "3rem",
                }, // ✅ Responsive font
              }}
            >
              B2C Admin Dashboard
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                }, // ✅ Responsive font
              }}
            >
              Dead Stock Inventory Overview
            </Typography>
          </Grid>

          {/* Right Section */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-start",
                md: "flex-end",
              }, // ✅ Better mobile layout
            }}
          >
            <Chip
              label={`Last Updated: ${new Date().toLocaleDateString()}`}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 500,
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.8rem",
                  md: "0.9rem",
                }, // ✅ Responsive chip text
                px: { xs: 1, sm: 2 }, // ✅ Padding control
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default DashboardHeader;