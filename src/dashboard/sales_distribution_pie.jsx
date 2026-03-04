// src/components/Dashboard/SalesDistributionPie.jsx
import React from "react";
import { Paper, Typography, Divider, Box, Stack } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const SalesDistributionPie = ({ salesDistributionData, theme, CustomTooltip }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, height: "100%" }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Sales Distribution
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={salesDistributionData.filter((item) => item.value > 0)}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {salesDistributionData.filter((item) => item.value > 0).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {salesDistributionData.filter((item) => item.value > 0).map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
            <Typography variant="body2">
              {item.name}: ₹{item.value.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default SalesDistributionPie;