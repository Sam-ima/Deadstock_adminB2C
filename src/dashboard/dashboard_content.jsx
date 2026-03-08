// src/components/Dashboard/DashboardContent.jsx

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { fetchAllData } from "../store/slices/product_slice";
import { fetchOrders } from "../store/slices/order_slice";
import { fetchSellerSettlements } from "../store/slices/sellerSettlementSlice";
import { fetchSellers } from "../store/slices/seller_slice";
import { fetchBuyers } from "../store/slices/buyer_slice";

import DashboardHeader from "./dashboard_header";
import DashboardCards from "./dashboard_card";
import ProductStatusPie from "./product_status_pie";
import SalesDistributionPie from "./sales_distribution_pie";
import MonthlyBarChart from "./monthly_bar_chart";
import RevenueAreaChart from "./revenue_area_chart";

import { motion } from "framer-motion";

const DashboardContent = ({ navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  /* =======================
      Redux State
  ======================== */

  const { products = [] } = useSelector((state) => state.product);
  const { list: orders = [] } = useSelector((state) => state.orders);

  const sellerSettlements = useSelector(
    (state) => state.sellerSettlement?.settlements || []
  );

  const buyers = useSelector((state) => state.buyers?.list || []);
  const sellers = useSelector((state) => state.sellers?.list || []);

  /* =======================
      Calculations
  ======================== */

  const activeProducts = useMemo(
    () => products.filter((p) => p.status === "active").length,
    [products]
  );

  const inactiveProducts = products.length - activeProducts;

  const totalAmountToSeller = useMemo(
    () =>
      sellerSettlements.reduce(
        (sum, s) => sum + Number(s.amountToSeller || 0),
        0
      ),
    [sellerSettlements]
  );

  const totalSalesAmount = useMemo(
    () =>
      sellerSettlements.reduce(
        (sum, s) => sum + Number(s.subtotal || 0),
        0
      ),
    [sellerSettlements]
  );

  const totalCommissionAmount = useMemo(
    () =>
      sellerSettlements.reduce(
        (sum, s) => sum + Number(s.commissionAmount || 0),
        0
      ),
    [sellerSettlements]
  );

  /* =======================
      Monthly Data
  ======================== */

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const monthlyTrendData = useMemo(() => {
    const monthlyData = {};

    months.forEach((m) => {
      monthlyData[m] = { month: m, sales: 0, orders: 0 };
    });

    orders.forEach((order) => {
      const date = new Date(order.createdAt || order.orderDate);
      const month = months[date.getMonth()];

      monthlyData[month].orders += 1;
      monthlyData[month].sales += Number(
        order.totalAmount || order.amount || 0
      );
    });

    sellerSettlements.forEach((s) => {
      const date = new Date(s.createdAt || s.settlementDate);
      const month = months[date.getMonth()];

      if (s.subtotal) {
        monthlyData[month].sales += Number(s.subtotal);
      }
    });

    return Object.values(monthlyData).filter(
      (d) => d.orders > 0 || d.sales > 0
    );
  }, [orders, sellerSettlements]);

  /* =======================
      Pie Data
  ======================== */

  const productStatusData = [
    {
      name: "Active Products",
      value: activeProducts,
      color: theme.palette.success.main,
    },
    {
      name: "Inactive Products",
      value: inactiveProducts,
      color: theme.palette.error.main,
    },
  ];

  const salesDistributionData = [
    {
      name: "Amount to Seller",
      value: totalAmountToSeller,
      color: theme.palette.warning.main,
    },
    {
      name: "Commission",
      value: totalCommissionAmount,
      color: theme.palette.success.main,
    },
  ];

  /* =======================
      Revenue Growth
  ======================== */

  const revenueGrowth = useMemo(() => {
    if (monthlyTrendData.length < 2) return "+0%";

    const last =
      monthlyTrendData[monthlyTrendData.length - 1].sales || 0;

    const prev =
      monthlyTrendData[monthlyTrendData.length - 2].sales || 0;

    if (prev === 0) return "+0%";

    const growth = ((last - prev) / prev) * 100;

    return `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`;
  }, [monthlyTrendData]);

  /* =======================
      Tooltip
  ======================== */

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <Paper sx={{ p: 1.5, boxShadow: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        {payload.map((item, i) => (
          <Typography key={i} sx={{ color: item.color }}>
            {item.name}: ₹{item.value.toLocaleString()}
          </Typography>
        ))}
      </Paper>
    );
  };

  /* =======================
      Dashboard Cards (trend removed)
  ======================== */

  const cardData = [
    // 1️⃣ Total Products
    {
      title: "Total Products",
      value: products.length,
      icon: <InventoryIcon />,
      onClick: () => navigate("/products"),
      color: theme.palette.primary.main,
    },

    // 2️⃣ Active Products
    {
      title: "Active Products",
      value: activeProducts,
      icon: <CheckCircleIcon />,
      onClick: () => navigate("/products"),
      color: theme.palette.success.main,
    },

    // 3️⃣ Inactive Products
    {
      title: "Inactive Products",
      value: inactiveProducts,
      icon: <CancelIcon />,
      onClick: () => navigate("/products"),
      color: theme.palette.error.main,
    },

    // 4️⃣ Total Orders
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("/orders"),
      color: theme.palette.warning.main,
    },

    // 5️⃣ Total Buyers
    {
      title: "Total Buyers",
      value: buyers.length,
      icon: <PeopleIcon />,
      onClick: () => navigate("/buyers"),
      color: theme.palette.info.main,
    },

    // 6️⃣ Total Sellers
    {
      title: "Total Sellers",
      value: sellers.length,
      icon: <StoreIcon />,
      onClick: () => navigate("/sellers"),
      color: theme.palette.secondary.main,
    },

    // 7️⃣ Amount to Seller
    {
      title: "Amount to Seller",
      value: `Rs${totalAmountToSeller.toLocaleString()}`,
      icon: <AccountBalanceIcon />,
      onClick: () => navigate("/seller-settlement"),
      color: theme.palette.success.dark,
    },

    // 8️⃣ Commission Amount
    {
      title: "Commission",
      value: `Rs${totalCommissionAmount.toLocaleString()}`,
      icon: <PaymentsIcon />,
      onClick: () => navigate("/seller-settlement"),
      color: theme.palette.warning.dark,
    },

    // 9️⃣ Total Sales
    {
      title: "Total Sales",
      value: `Rs${totalSalesAmount.toLocaleString()}`,
      icon: <MonetizationOnIcon />,
      onClick: () => navigate("/seller-settlement"),
      color: theme.palette.primary.dark,
      // Revenue growth is still used elsewhere (area chart), but not on the card
    },
  ];

  /* =======================
      Animations
  ======================== */

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  /* =======================
      Fetch Data
  ======================== */

  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchOrders());
    dispatch(fetchSellerSettlements());
    dispatch(fetchSellers());
    dispatch(fetchBuyers());
  }, [dispatch]);

  /* =======================
      Render
  ======================== */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg,
          ${theme.palette.background.default},
          ${theme.palette.background.paper})`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>

        <DashboardHeader theme={theme} />

        <DashboardCards
          cardData={cardData}
          theme={theme}
          itemVariants={itemVariants}
          totalSalesAmount={totalSalesAmount}
        />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <ProductStatusPie
              productStatusData={productStatusData}
              theme={theme}
              CustomTooltip={CustomTooltip}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SalesDistributionPie
              salesDistributionData={salesDistributionData}
              theme={theme}
              CustomTooltip={CustomTooltip}
            />
          </Grid>

          <Grid item xs={12}>
            <MonthlyBarChart
              monthlyTrendData={monthlyTrendData}
              theme={theme}
              CustomTooltip={CustomTooltip}
            />
          </Grid>

          <Grid item xs={12}>
            <RevenueAreaChart
              monthlyTrendData={monthlyTrendData}
              revenueGrowth={revenueGrowth}
              theme={theme}
              CustomTooltip={CustomTooltip}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardContent;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import {
//   Typography,
//   Container,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   Avatar,
//   useTheme,
//   useMediaQuery,
//   Paper,
//   Divider,
//   Chip,
//   Stack,
// } from "@mui/material";

// import {
//   Inventory2 as InventoryIcon,
//   Visibility as ActiveIcon,
//   Category as CategoryIcon,
//   ShoppingCart as OrdersIcon,
//   People as BuyersIcon,
//   Store as SellersIcon,
//   TrendingUp as TrendingUpIcon,
//   TrendingDown as TrendingDownIcon,
//   AccountBalance as AccountBalanceIcon,
//   AccountBalanceWallet as AccountBalanceWalletIcon,
//   MonetizationOn as MonetizationOnIcon,
// } from "@mui/icons-material";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Area,
//   AreaChart,
// } from "recharts";

// import { fetchAllData } from "../store/slices/product_slice";
// import { fetchOrders } from "../store/slices/order_slice";
// import { fetchSellerSettlements } from "../store/slices/sellerSettlementSlice";
// import { fetchSellers } from "../store/slices/seller_slice";
// import { fetchBuyers } from "../store/slices/buyer_slice";

// const DashboardContent = ({ navigate }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
//   const dispatch = useDispatch();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   const chartVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         delay: 0.3,
//       },
//     },
//   };

//   // Redux state
//   const { products, categories } = useSelector((state) => state.product);
//   const { list: orders } = useSelector((state) => state.orders);
//   const sellerSettlements = useSelector(
//     (state) => state.sellerSettlement?.settlements || []
//   );
//   const buyers = useSelector((state) => state.buyers.list);
//   const sellers = useSelector((state) => state.sellers.list);

//   // Calculations
//   const activeProducts = products.filter((p) => p.status === "active").length;
//   const inactiveProducts = products.length - activeProducts;
  
//   const totalAmountToSeller = sellerSettlements.reduce(
//     (sum, s) => sum + Number(s.amountToSeller || 0),
//     0
//   );
//   const totalSalesAmount = sellerSettlements.reduce(
//     (sum, s) => sum + Number(s.subtotal || 0),
//     0
//   );
//   const totalCommissionAmount = sellerSettlements.reduce(
//     (sum, s) => sum + Number(s.commissionAmount || 0),
//     0
//   );

//   // Process real data for charts
//   const productStatusData = [
//     { 
//       name: "Active Products", 
//       value: activeProducts, 
//       color: theme.palette.success.main 
//     },
//     { 
//       name: "Inactive Products", 
//       value: inactiveProducts, 
//       color: theme.palette.error.main 
//     },
//   ];

//   const salesDistributionData = [
//     { 
//       name: "Amount to Seller", 
//       value: totalAmountToSeller, 
//       color: theme.palette.warning.main 
//     },
//     { 
//       name: "Commission", 
//       value: totalCommissionAmount, 
//       color: theme.palette.success.main 
//     },
//   ];

//   // Process orders data for monthly trends
//   const processMonthlyData = () => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const monthlyData = {};
    
//     // Initialize monthly data
//     months.forEach(month => {
//       monthlyData[month] = { month, sales: 0, orders: 0 };
//     });

//     // Process orders
//     orders.forEach(order => {
//       const orderDate = new Date(order.createdAt || order.orderDate);
//       const month = months[orderDate.getMonth()];
//       if (monthlyData[month]) {
//         monthlyData[month].orders += 1;
//         monthlyData[month].sales += Number(order.totalAmount || order.amount || 0);
//       }
//     });

//     // Process seller settlements for additional sales data
//     sellerSettlements.forEach(settlement => {
//       const settlementDate = new Date(settlement.createdAt || settlement.settlementDate);
//       const month = months[settlementDate.getMonth()];
//       if (monthlyData[month] && settlement.subtotal) {
//         monthlyData[month].sales += Number(settlement.subtotal);
//       }
//     });

//     return Object.values(monthlyData).filter(data => data.orders > 0 || data.sales > 0);
//   };

//   // Process category data from actual products
//   const processCategoryData = () => {
//     const categoryMap = {};
    
//     products.forEach(product => {
//       const categoryName = product.category?.name || product.category || 'Uncategorized';
//       if (!categoryMap[categoryName]) {
//         categoryMap[categoryName] = {
//           name: categoryName,
//           value: 0,
//           color: getRandomColor(categoryName)
//         };
//       }
//       categoryMap[categoryName].value += 1;
//     });

//     return Object.values(categoryMap).sort((a, b) => b.value - a.value).slice(0, 5);
//   };

//   // Generate consistent colors based on category name
//   const getRandomColor = (str) => {
//     const colors = [
//       "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c",
//       "#d0ed57", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"
//     ];
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = ((hash << 5) - hash) + str.charCodeAt(i);
//       hash = hash & hash;
//     }
//     return colors[Math.abs(hash) % colors.length];
//   };

//   // Calculate revenue growth trend
//   const calculateRevenueGrowth = () => {
//     const monthlyData = processMonthlyData();
//     if (monthlyData.length < 2) return "+0%";
    
//     const lastMonth = monthlyData[monthlyData.length - 1]?.sales || 0;
//     const previousMonth = monthlyData[monthlyData.length - 2]?.sales || 0;
    
//     if (previousMonth === 0) return "+0%";
//     const growth = ((lastMonth - previousMonth) / previousMonth) * 100;
//     return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
//   };

//   const monthlyTrendData = processMonthlyData();
//   const categoryData = processCategoryData();
//   const revenueGrowth = calculateRevenueGrowth();

//   const cardData = [
//     {
//       title: "Total Products",
//       value: products.length,
//       icon: <InventoryIcon />,
//       onClick: () => navigate("/products"),
//       color: theme.palette.primary.main,
//       trend: "+12%",
//       trendUp: true,
//     },
//     {
//       title: "Active Products",
//       value: activeProducts,
//       icon: <ActiveIcon />,
//       onClick: () => navigate("/products"),
//       color: theme.palette.success.main,
//       trend: activeProducts > 0 ? `${Math.round((activeProducts/products.length)*100)}%` : "0%",
//       trendUp: activeProducts > inactiveProducts,
//     },
//     {
//       title: "Total Orders",
//       value: orders.length,
//       icon: <OrdersIcon />,
//       color: theme.palette.secondary.main,
//       onClick: () => navigate("/orders"),
//       trend: orders.length > 0 ? "+" + Math.round(Math.random() * 20) + "%" : "0%",
//       trendUp: true,
//     },
//     {
//       title: "Total Buyers",
//       value: buyers.length,
//       icon: <BuyersIcon />,
//       color: theme.palette.primary.light,
//       onClick: () => navigate("/buyers"),
//       trend: buyers.length > 0 ? "+" + Math.round(Math.random() * 10) + "%" : "0%",
//       trendUp: true,
//     },
//     {
//       title: "Total Sellers",
//       value: sellers.length,
//       icon: <SellersIcon />,
//       color: theme.palette.info.main,
//       onClick: () => navigate("/sellers"),
//       trend: sellers.length > 0 ? "+" + Math.round(Math.random() * 8) + "%" : "0%",
//       trendUp: true,
//     },
//     {
//       title: "Commission Amount",
//       value: `₹${totalCommissionAmount.toLocaleString()}`,
//       icon: <MonetizationOnIcon />,
//       color: theme.palette.success.main,
//       onClick: () => navigate("/seller-settlement"),
//       trend: totalCommissionAmount > 0 ? "+" + Math.round(Math.random() * 15) + "%" : "0%",
//       trendUp: true,
//     },
//     {
//       title: "Amount to Seller",
//       value: `₹${totalAmountToSeller.toLocaleString()}`,
//       icon: <AccountBalanceIcon />,
//       color: theme.palette.warning.main,
//       onClick: () => navigate("/seller-settlement"),
//       trend: totalAmountToSeller > 0 ? "+" + Math.round(Math.random() * 12) + "%" : "0%",
//       trendUp: true,
//     },
//     {
//       title: "Total Sales",
//       value: `₹${totalSalesAmount.toLocaleString()}`,
//       icon: <AccountBalanceWalletIcon />,
//       color: theme.palette.primary.dark,
//       onClick: () => navigate("/seller-settlement"),
//       trend: totalSalesAmount > 0 ? "+" + Math.round(Math.random() * 18) + "%" : "0%",
//       trendUp: true,
//     },
//   ];

//   // Fetch data on mount
//   useEffect(() => {
//     dispatch(fetchAllData());
//     dispatch(fetchOrders());
//     dispatch(fetchSellerSettlements());
//     dispatch(fetchSellers());
//     dispatch(fetchBuyers());
//   }, [dispatch]);

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <Paper sx={{ p: 1.5, bgcolor: "background.paper", boxShadow: 3 }}>
//           <Typography variant="body2" color="text.secondary">
//             {label}
//           </Typography>
//           {payload.map((entry, index) => (
//             <Typography key={index} variant="body1" sx={{ color: entry.color }}>
//               {entry.name}: {typeof entry.value === 'number' ? 
//                 (entry.name.includes('₹') || entry.dataKey?.includes('sales') ? 
//                   `₹${entry.value.toLocaleString()}` : entry.value.toLocaleString()) 
//                 : entry.value}
//             </Typography>
//           ))}
//         </Paper>
//       );
//     }
//     return null;
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
//       }}
//     >
//       <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
//         {/* Header with animated gradient */}
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ type: "spring", stiffness: 100, damping: 15 }}
//         >
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               mb: 4,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
//               borderRadius: 3,
//               color: "white",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -20,
//                 right: -20,
//                 width: 200,
//                 height: 200,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.1)",
//               }}
//             />
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: -40,
//                 left: -40,
//                 width: 300,
//                 height: 300,
//                 borderRadius: "50%",
//                 background: "rgba(255,255,255,0.05)",
//               }}
//             />
            
//             <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
//               <Grid item xs={12} md={8}>
//                 <Typography variant="h3" fontWeight={700} gutterBottom>
//                   B2C Admin Dashboard
//                 </Typography>
//                 <Typography variant="h6" sx={{ opacity: 0.9 }}>
//                   Dead Stock Inventory Overview
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                 <Chip
//                   label={`Last Updated: ${new Date().toLocaleDateString()}`}
//                   sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 500 }}
//                 />
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>

//         {/* Stats Cards with Motion */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             {cardData.map((card, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <motion.div variants={itemVariants}>
//                   <Card
//                     elevation={0}
//                     onClick={card.onClick}
//                     sx={{
//                       cursor: "pointer",
//                       borderRadius: 3,
//                       background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
//                       border: `1px solid ${theme.palette.divider}`,
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "translateY(-8px)",
//                         boxShadow: theme.shadows[10],
//                         borderColor: card.color,
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                         <Avatar
//                           sx={{
//                             bgcolor: card.color,
//                             width: 56,
//                             height: 56,
//                             boxShadow: `0 8px 16px -4px ${card.color}40`,
//                           }}
//                         >
//                           {card.icon}
//                         </Avatar>
                        
//                         {card.trend && (
//                           <Chip
//                             icon={card.trendUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
//                             label={card.trend}
//                             size="small"
//                             sx={{
//                               bgcolor: card.trendUp ? `${theme.palette.success.main}20` : `${theme.palette.error.main}20`,
//                               color: card.trendUp ? theme.palette.success.main : theme.palette.error.main,
//                               fontWeight: 600,
//                             }}
//                           />
//                         )}
//                       </Box>

//                       <Typography variant="h4" fontWeight={700} gutterBottom>
//                         {card.value}
//                       </Typography>

//                       <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                         {card.title}
//                       </Typography>

//                       {/* Mini progress bar */}
//                       <Box
//                         sx={{
//                           mt: 2,
//                           height: 4,
//                           borderRadius: 2,
//                           bgcolor: `${card.color}20`,
//                           overflow: "hidden",
//                         }}
//                       >
//                         <Box
//                           sx={{
//                            width: `${Math.min(
//   100,
//   Math.max(
//     25,
//     Math.round(
//       typeof card.value === "number"
//         ? card.value
//         : totalSalesAmount > 0
//         ? totalSalesAmount / 100000
//         : 50
//     )
//   )
// )}%`,
//  height: "100%",
//   bgcolor: card.color,  
//   borderRadius: 2,
//     transition: "width 0.8s ease-in-out",
//                           }}
//                         />
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </motion.div>

//         {/* Charts Section */}
//         <motion.div
//           variants={chartVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <Grid container spacing={3}>
//             {/* Pie Charts */}
//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   border: `1px solid ${theme.palette.divider}`,
//                   height: "100%",
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   Product Status Distribution
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
                
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={productStatusData.filter(item => item.value > 0)}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={5}
//                       dataKey="value"
//                       animationBegin={0}
//                       animationDuration={1500}
//                       animationEasing="ease-out"
//                     >
//                       {productStatusData.filter(item => item.value > 0).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>

//                 <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
//                   {productStatusData.filter(item => item.value > 0).map((item, index) => (
//                     <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
//                       <Typography variant="body2">{item.name}: {item.value}</Typography>
//                     </Box>
//                   ))}
//                 </Stack>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   border: `1px solid ${theme.palette.divider}`,
//                   height: "100%",
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   Sales Distribution
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
                
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={salesDistributionData.filter(item => item.value > 0)}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={5}
//                       dataKey="value"
//                       animationBegin={0}
//                       animationDuration={1500}
//                       animationEasing="ease-out"
//                     >
//                       {salesDistributionData.filter(item => item.value > 0).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>

//                 <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
//                   {salesDistributionData.filter(item => item.value > 0).map((item, index) => (
//                     <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color }} />
//                       <Typography variant="body2">{item.name}: ₹{item.value.toLocaleString()}</Typography>
//                     </Box>
//                   ))}
//                 </Stack>
//               </Paper>
//             </Grid>

//             {/* Bar Chart */}
//             <Grid item xs={12}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   border: `1px solid ${theme.palette.divider}`,
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   Monthly Performance Trends
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
                
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                     <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
//                     <YAxis stroke={theme.palette.text.secondary} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Bar
//                       dataKey="sales"
//                       name="Sales (₹)"
//                       fill={theme.palette.primary.main}
//                       radius={[4, 4, 0, 0]}
//                       animationBegin={0}
//                       animationDuration={1500}
//                       animationEasing="ease-out"
//                     />
//                     <Bar
//                       dataKey="orders"
//                       name="Orders"
//                       fill={theme.palette.secondary.main}
//                       radius={[4, 4, 0, 0]}
//                       animationBegin={200}
//                       animationDuration={1500}
//                       animationEasing="ease-out"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>

//             {/* Area Chart */}
//             <Grid item xs={12}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   border: `1px solid ${theme.palette.divider}`,
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   Revenue Growth Trend
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
                
//                 <ResponsiveContainer width="100%" height={300}>
//                   <AreaChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                     <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
//                     <YAxis stroke={theme.palette.text.secondary} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Area
//                       type="monotone"
//                       dataKey="sales"
//                       name="Revenue (₹)"
//                       stroke={theme.palette.primary.main}
//                       fill={theme.palette.primary.light}
//                       fillOpacity={0.3}
//                       animationBegin={0}
//                       animationDuration={2000}
//                       animationEasing="ease-out"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
                
//                 {/* Revenue Growth Summary */}
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 3 }}>
//                   <Chip 
//                     label={`Total Revenue: ₹${monthlyTrendData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}`}
//                     color="primary"
//                     variant="outlined"
//                   />
//                   <Chip 
//                     label={`Growth: ${revenueGrowth}`}
//                     color={revenueGrowth.includes('+') ? "success" : "error"}
//                   />
//                 </Box>
//               </Paper>
//             </Grid>

            
//           </Grid>
//         </motion.div>

//         {/* CSS Animation for progress bar */}
//         <style jsx>{`
//           @keyframes progress {
//             0% { width: 0%; }
//             100% { width: 75%; }
//           }
//         `}</style>
//       </Container>
//     </Box>
//   );
// };

// export default DashboardContent;