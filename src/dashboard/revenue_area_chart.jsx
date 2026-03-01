// src/components/Dashboard/RevenueAreaChart.jsx
import React from "react";
import { Paper, Typography, Divider, Box, Chip } from "@mui/material";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area } from "recharts";

const RevenueAreaChart = ({ monthlyTrendData, revenueGrowth, theme, CustomTooltip }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Revenue Growth Trend
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="sales"
            name="Revenue (₹)"
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.light}
            fillOpacity={0.3}
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 3 }}>
        <Chip 
          label={`Total Revenue: ₹${monthlyTrendData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}`}
          color="primary"
          variant="outlined"
        />
        <Chip 
          label={`Growth: ${revenueGrowth}`}
          color={revenueGrowth.includes('+') ? "success" : "error"}
        />
      </Box>
    </Paper>
  );
};

export default RevenueAreaChart;