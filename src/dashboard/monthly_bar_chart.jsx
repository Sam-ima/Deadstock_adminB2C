// src/components/Dashboard/MonthlyBarChart.jsx
import React from "react";
import { Paper, Typography, Divider, Box } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { useTheme, useMediaQuery } from "@mui/material";

const MonthlyBarChart = ({ monthlyTrendData, theme, CustomTooltip }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Calculate dynamic margins based on screen size
  const getChartMargins = () => {
    if (isMobile) {
      return { top: 20, right: 10, left: 5, bottom: 55 };
    }
    if (isTablet) {
      return { top: 20, right: 20, left: 15, bottom: 45 };
    }
    return { top: 20, right: 30, left: 30, bottom: 35 };
  };

  // Calculate bar size based on screen size
  const getBarSize = () => {
    if (isMobile) return 18;
    if (isTablet) return 22;
    return 28;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto", // Center horizontally
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
            md: "1.25rem",
          },
          textAlign: "center",
          width: "100%",
        }}
      >
        Monthly Performance Trends
      </Typography>

      <Divider sx={{ width: "100%", mb: { xs: 2, sm: 2.5, md: 3 } }} />
      
      <Box
        sx={{
          width: "100%",
          height: isMobile ? 300 : isTablet ? 340 : 380,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyTrendData}
            margin={getChartMargins()}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
              horizontal={true}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke={theme.palette.text.secondary}
              tick={{
                fontSize: isMobile ? 9 : isTablet ? 10 : 12,
                fill: theme.palette.text.secondary,
              }}
              angle={isMobile ? -30 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 45}
              interval={0}
              tickMargin={5}
            />

            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{
                fontSize: isMobile ? 9 : isTablet ? 10 : 12,
                fill: theme.palette.text.secondary,
              }}
              width={isMobile ? 35 : isTablet ? 40 : 45}
              tickFormatter={(value) => 
                isMobile ? `${(value/1000).toFixed(0)}K` : value
              }
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{
                textAlign: "center",
                fontSize: isMobile ? "0.65rem" : "0.8rem",
                paddingTop: 10,
                width: "100%",
              }}
              iconSize={isMobile ? 8 : 10}
            />

            <Bar
              dataKey="sales"
              name="Sales (₹)"
              fill={theme.palette.primary.main}
              radius={[4, 4, 0, 0]}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              barSize={getBarSize()}
            />

            <Bar
              dataKey="orders"
              name="Orders"
              fill={theme.palette.secondary.main}
              radius={[4, 4, 0, 0]}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-out"
              barSize={getBarSize()}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default MonthlyBarChart;