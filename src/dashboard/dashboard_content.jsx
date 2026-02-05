import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


// temporary frontend data (API simulation)
// import { dashboardData } from "../store/dashboardData";


import { fetchAllData } from "../store/slices/product_slice";
import { fetchOrders } from "../store/slices/order_slice";
import { fetchCommissions } from "../store/slices/commission_slice";


const DashboardContent = ({ navigate }) => {
  // const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const dispatch = useDispatch();

     // Fetch products and orders from Redux
  const { products } = useSelector((state) => state.product);
  const { list: orders } = useSelector((state) => state.orders);
 const commissions = useSelector(
  (state) => state.commission?.list || []
);

const totalCommission = commissions.reduce(
  (sum, c) => sum + Number(c.commissionAmount || 0),
  0
);

const totalAmountToSeller = commissions.reduce(
  (sum, c) => sum + Number(c.amountToSeller || 0),
  0
);
const categoriesCount = useSelector(
  (state) => state.product?.categories?.length || 0
);



  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchOrders());
    dispatch(fetchCommissions());
  }, [dispatch]);


  const cardData = [
    {
      title: "Total Products",
      // value: dashboardData.totalProducts,
       value: products.length,
      icon: <InventoryIcon />,
       onClick: () => navigate("/products"),
      color: theme.palette.primary.main,
    },
    {
      title: "Active Products",
      // value: dashboardData.activeProducts,
      value: products.filter((p) => p.status === "active").length,
      icon: <ActiveIcon />,
        onClick: () => navigate("/products"),
      color: theme.palette.success.main,
    },
    {
      title: "Total Orders",
      // value: dashboardData.totalOrders,
       value: orders.length,
      icon: <OrdersIcon />,
      color: theme.palette.secondary.main,
      onClick: () => navigate("/orders"),
    },
    {
  title: "Total Buyers",
  // value: buyers.length, 
  icon: <BuyersIcon/>,
  color: theme.palette.primary.light,
  onClick: () => navigate("/buyers"),

},
{
  title: "Total Sellers",
  // value: sellers.length, // from Redux later
  icon: <SellersIcon />,
  color: theme.palette.info.main,
  onClick: () => navigate("/sellers"),
},

{
  title: "Amount to Seller",
  value: `₹${totalAmountToSeller.toLocaleString()}`,
  icon: <AttachMoneyIcon />, // changed icon
  color: theme.palette.warning.main,
  onClick: () => navigate("/seller-settlement"),
},
    // {
    //   title: "Hidden Products",
    //   // value: dashboardData.hiddenProducts,
    //   icon: <HiddenIcon />,
    //   color: theme.palette.error.main,
    // },
    {
      title: "Categories",
      value: categoriesCount,
      // value: dashboardData.categories,
      icon: <CategoryIcon />,
      color: theme.palette.info.main,
      onClick: () => navigate("/categories"),
    },
    {
      title: "Seller Settlement", 
      //  value: products.filter((p) => (p.stock ?? 0) <= 10).length,
      // value: dashboardData.lowStock,
      icon: <AccountBalanceWalletIcon /> ,
      color: theme.palette.warning.main,
      onClick: () => navigate("/seller-settlement"),
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
              onClick={card.onClick}
              sx={{
                width: "100%",
                 cursor: "pointer",
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
