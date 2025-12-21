import React, { useEffect } from "react";
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
  People as PeopleIcon,
  Person as PersonIcon,
  BookOnline as BookOnlineIcon,
  LocalTaxi as LocalTaxiIcon,
  DirectionsCar as DirectionsCarIcon,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOwners } from "../redux/slices/ownerKycSlice";
// import { fetchCustomers } from "../redux/slices/customerSlice";
// import { fetchBookings } from "../redux/slices/bookingSlice";
// import { fetchPickups } from "../redux/slices/pickupSlice";
// import { fetchVehicles } from "../redux/slices/vehicleSlice"

const DashboardContent = () => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Correct Selectors with Safe Fallbacks
//   const ownerWithKyc = useSelector((state) => state.ownerWithKyc || {});
//   const owners = ownerWithKyc.list || [];
//   const ownersLoading = ownerWithKyc.loading || false;

  // console.log("owners:", owners);

//   const { customers = [], isLoading: customersLoading = false } =
//     useSelector((state) => state.customers || {});

//   const { bookings = [], isLoading: bookingsLoading = false } =
//     useSelector((state) => state.bookings || {});

//   const { pickups = [], isLoading: pickupsLoading = false } =
//     useSelector((state) => state.pickups || {});

//   const { vehicles = [], isLoading: vehiclesLoading = false } =
//     useSelector((state) => state.vehicles || {});

//   useEffect(() => {
//     dispatch(fetchAllOwners());
//     dispatch(fetchCustomers());
//     dispatch(fetchBookings());
//     dispatch(fetchPickups());
//     dispatch(fetchVehicles());
//   }, [dispatch]);

//   const stats = {
//     owners: owners.length,
//     customers: customers.length,
//     bookings: bookings.length,
//     pickups: pickups.length,
//     vehicles: vehicles.length,
//   };

//   const isLoading =
//     ownersLoading ||
//     customersLoading ||
//     bookingsLoading ||
//     pickupsLoading ||
//     vehiclesLoading;

  const cardData = [
    {
      title: "Owners Registered",
    //   value: stats.owners,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "Customers Registered",
    //   value: stats.customers,
      icon: <PersonIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: "Bookings Requested",
    //   value: stats.bookings,
      icon: <BookOnlineIcon />,
      color: theme.palette.success.main,
    },
    {
      title: "Pick-ups Requested",
    //   value: stats.pickups,
      icon: <LocalTaxiIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: "Vehicles Registered",
    //   value: stats.vehicles,
      icon: <DirectionsCarIcon />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        px: { xs: 1, sm: 2 },
        backgroundColor: "transparent",
        
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
          className="responsive_fontsize32"
          variant="h4"
          component="h1"
          textAlign="center"
          fontWeight={600}
          color="primary.main"
        >
          Admin Dashboard
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex" }}>
            <Card
              elevation={4}
              sx={{
                width: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
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
                  className="responsive_fontsize20"
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  {card.title}
                </Typography>

                <Typography
                  className="responsive_fontsize20"
                  variant="h5"
                  color="text.secondary"
                >
                  {/* {isLoading ? "..." : card.value} */}
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