import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Typography,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

import {
  Inventory2 as InventoryIcon,
  Visibility as ActiveIcon,
  Category as CategoryIcon,
  ShoppingCart as OrdersIcon,
  People as BuyersIcon,
  Store as SellersIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

import { fetchAllData } from "../store/slices/product_slice";
import { fetchOrders } from "../store/slices/order_slice";
import { fetchSellerSettlements } from "../store/slices/sellerSettlementSlice";
import { fetchSellers } from "../store/slices/seller_slice";
import { fetchBuyers } from "../store/slices/buyer_slice";

const DashboardContent = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const chartVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  // Redux state
  const { products } = useSelector((state) => state.product);
  const { list: orders } = useSelector((state) => state.orders);
  const sellerSettlements = useSelector(
    (state) => state.sellerSettlement?.settlements || []
  );
  const buyersCount = useSelector((state) => state.buyers.list.length);
  const sellersCount = useSelector((state) => state.sellers.list.length);
  const categoriesCount = useSelector(
    (state) => state.product?.categories?.length || 0
  );

  // Calculations
  const activeProducts = products.filter((p) => p.status === "active").length;
  const inactiveProducts = products.length - activeProducts;
  
  const totalAmountToSeller = sellerSettlements.reduce(
    (sum, s) => sum + Number(s.amountToSeller || 0),
    0
  );
  const totalSalesAmount = sellerSettlements.reduce(
    (sum, s) => sum + Number(s.subtotal || 0),
    0
  );
  const totalCommissionAmount = sellerSettlements.reduce(
    (sum, s) => sum + Number(s.commissionAmount || 0),
    0
  );

  // Chart data
  const productStatusData = [
    { name: "Active Products", value: activeProducts, color: theme.palette.success.main },
    { name: "Inactive Products", value: inactiveProducts, color: theme.palette.error.main },
  ];

  const salesDistributionData = [
    { name: "Amount to Seller", value: totalAmountToSeller, color: theme.palette.warning.main },
    { name: "Commission", value: totalCommissionAmount, color: theme.palette.success.main },
  ];

  // Monthly trend data (simulated)
  const monthlyTrendData = [
    { month: "Jan", sales: 4000, orders: 24 },
    { month: "Feb", sales: 3000, orders: 18 },
    { month: "Mar", sales: 5000, orders: 30 },
    { month: "Apr", sales: 4500, orders: 27 },
    { month: "May", sales: 6000, orders: 35 },
    { month: "Jun", sales: 5500, orders: 32 },
  ];

  // Category performance data (simulated)
  const categoryData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Fashion", value: 25, color: "#82ca9d" },
    { name: "Home", value: 20, color: "#ffc658" },
    { name: "Books", value: 15, color: "#ff8042" },
    { name: "Sports", value: 5, color: "#a4de6c" },
  ];

  const cardData = [
    {
      title: "Total Products",
      value: products.length,
      icon: <InventoryIcon />,
      onClick: () => navigate("/products"),
      color: theme.palette.primary.main,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: <ActiveIcon />,
      onClick: () => navigate("/products"),
      color: theme.palette.success.main,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <OrdersIcon />,
      color: theme.palette.secondary.main,
      onClick: () => navigate("/orders"),
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Total Buyers",
      value: buyersCount,
      icon: <BuyersIcon />,
      color: theme.palette.primary.light,
      onClick: () => navigate("/buyers"),
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Total Sellers",
      value: sellersCount,
      icon: <SellersIcon />,
      color: theme.palette.info.main,
      onClick: () => navigate("/sellers"),
      trend: "+3%",
      trendUp: true,
    },
    {
      title: "Commission Amount",
      value: `₹${totalCommissionAmount.toLocaleString()}`,
      icon: <MonetizationOnIcon />,
      color: theme.palette.success.main,
      onClick: () => navigate("/seller-settlement"),
      trend: "+10%",
      trendUp: true,
    },
    {
      title: "Amount to Seller",
      value: `₹${totalAmountToSeller.toLocaleString()}`,
      icon: <AccountBalanceIcon />,
      color: theme.palette.warning.main,
      onClick: () => navigate("/seller-settlement"),
      trend: "+7%",
      trendUp: true,
    },
    {
      title: "Total Sales",
      value: `₹${totalSalesAmount.toLocaleString()}`,
      icon: <AccountBalanceWalletIcon />,
      color: theme.palette.primary.dark,
      onClick: () => navigate("/seller-settlement"),
      trend: "+20%",
      trendUp: true,
    },
  ];

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchOrders());
    dispatch(fetchSellerSettlements());
    dispatch(fetchSellers());
    dispatch(fetchBuyers());
  }, [dispatch]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1.5, bgcolor: "background.paper", boxShadow: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body1" sx={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
        {/* Header with animated gradient */}
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
              <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Chip
                  label={`Last Updated: ${new Date().toLocaleDateString()}`}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 500 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Stats Cards with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    onClick={card.onClick}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: theme.shadows[10],
                        borderColor: card.color,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: card.color,
                            width: 56,
                            height: 56,
                            boxShadow: `0 8px 16px -4px ${card.color}40`,
                          }}
                        >
                          {card.icon}
                        </Avatar>
                        
                        {card.trend && (
                          <Chip
                            icon={card.trendUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
                            label={card.trend}
                            size="small"
                            sx={{
                              bgcolor: card.trendUp ? `${theme.palette.success.main}20` : `${theme.palette.error.main}20`,
                              color: card.trendUp ? theme.palette.success.main : theme.palette.error.main,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>

                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {card.value}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {card.title}
                      </Typography>

                      {/* Mini progress bar */}
                      <Box
                        sx={{
                          mt: 2,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: `${card.color}20`,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: "75%",
                            height: "100%",
                            bgcolor: card.color,
                            borderRadius: 2,
                            animation: "progress 1.5s ease-in-out",
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {/* Pie Charts */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  height: "100%",
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Product Status Distribution
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productStatusData}
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
                      {productStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                  {productStatusData.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
                      <Typography variant="body2">{item.name}: {item.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  height: "100%",
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Sales Distribution
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={salesDistributionData}
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
                      {salesDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                  {salesDistributionData.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
                      <Typography variant="body2">{item.name}: ₹{item.value.toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
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
                      fill={theme.palette.primary.main}
                      radius={[4, 4, 0, 0]}
                      animationBegin={0}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                    <Bar
                      dataKey="orders"
                      fill={theme.palette.secondary.main}
                      radius={[4, 4, 0, 0]}
                      animationBegin={200}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Area Chart */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
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
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      fillOpacity={0.3}
                      animationBegin={0}
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* CSS Animation for progress bar */}
        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 75%; }
          }
        `}</style>
      </Container>
    </Box>
  );
};

export default DashboardContent;