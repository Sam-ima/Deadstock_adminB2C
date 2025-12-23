import React from "react";
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
  WarningAmber as WarningIcon,
} from "@mui/icons-material";

// temporary frontend data (API simulation)
// import { dashboardData } from "../store/dashboardData";

const DashboardContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardData = [
    {
      title: "Total Products",
      // value: dashboardData.totalProducts,
      icon: <InventoryIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "Active Products",
      // value: dashboardData.activeProducts,
      icon: <ActiveIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Hidden Products",
      // value: dashboardData.hiddenProducts,
      icon: <HiddenIcon />,
      color: theme.palette.error.main,
    },
    {
      title: "Categories",
      // value: dashboardData.categories,
      icon: <CategoryIcon />,
      color: theme.palette.info.main,
    },
    {
      title: "Low Stock Items",
      // value: dashboardData.lowStock,
      icon: <WarningIcon />,
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
          backgroundColor: theme.palette.background.default,
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
