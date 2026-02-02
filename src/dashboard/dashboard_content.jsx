import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
} from "@mui/material";

import {
  Inventory2 as InventoryIcon,
  Visibility as ActiveIcon,
  VisibilityOff as HiddenIcon,
  Category as CategoryIcon,
  ShoppingCart as OrdersIcon, 
  People as BuyersIcon,
  Store as SellersIcon,
  Paid as CommissionIcon,
} from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


// temporary frontend data (API simulation)
// import { dashboardData } from "../store/dashboardData";


import { fetchAllData } from "../store/slices/product_slice";
import { fetchOrders } from "../store/slices/order_slice";

const DashboardContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const dispatch = useDispatch();

     // Fetch products and orders from Redux
  const { products } = useSelector((state) => state.product);
  const { list: orders } = useSelector((state) => state.orders);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchOrders());
  }, [dispatch]);


  const cardData = [
    {
      title: "Total Products",
      // value: dashboardData.totalProducts,
       value: products.length,
      icon: <InventoryIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "Active Products",
      // value: dashboardData.activeProducts,
      value: products.filter((p) => p.status === "active").length,
      icon: <ActiveIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Total Orders",
      // value: dashboardData.totalOrders,
       value: orders.length,
      icon: <OrdersIcon />,
      color: theme.palette.secondary.main,
    },
    {
  title: "Total Buyers",
  // value: buyers.length, 
  icon: <BuyersIcon/>,
  color: theme.palette.primary.light,
},
{
  title: "Total Sellers",
  // value: sellers.length, // from Redux later
  icon: <SellersIcon />,
  color: theme.palette.info.main,
},

{
  title: "Total Commission",
  // value: `₹${totalCommission}`, 
  icon: <CommissionIcon />,
  color: theme.palette.success.dark,
},


    // {
    //   title: "Hidden Products",
    //   // value: dashboardData.hiddenProducts,
    //   icon: <HiddenIcon />,
    //   color: theme.palette.error.main,
    // },
    {
      title: "Categories",
      value: useSelector((state) => state.product.categories.length),
      // value: dashboardData.categories,
      icon: <CategoryIcon />,
      color: theme.palette.info.main,
    },
    {
      title: "Seller Settlement", 
      //  value: products.filter((p) => (p.stock ?? 0) <= 10).length,
      // value: dashboardData.lowStock,
      icon: <AccountBalanceWalletIcon /> ,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      {/* Sticky heading */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          // backgroundColor: theme.palette.background.default,
          mb: 3,
          py: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          fontWeight={600}
          color="primary.main"
        >
          B2C Admin Dashboard
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
        >
          Dead Stock Inventory Overview
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              elevation={4}
              sx={{
                width: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: card.color,
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Avatar>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardContent;
