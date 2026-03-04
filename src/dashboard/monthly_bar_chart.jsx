// src/components/Dashboard/MonthlyBarChart.jsx
import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Bar } from "recharts";

const MonthlyBarChart = ({ monthlyTrendData, theme, CustomTooltip }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Monthly Performance Trends
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="sales"
            name="Sales (₹)"
            fill={theme.palette.primary.main}
            radius={[4, 4, 0, 0]}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="orders"
            name="Orders"
            fill={theme.palette.secondary.main}
            radius={[4, 4, 0, 0]}
            animationBegin={200}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlyBarChart;