import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import ManIcon from "@mui/icons-material/Man";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useNavigate } from "react-router-dom";

import DashboardContent from "./dashboard_content";
// import OwnerTable from "../pages/owner/owner/OwnerTable";
// import CustomerTable from "../pages/customer/CustomerTable";
// import BookingTable from "../pages/booking/BookingTable";
// import PickUpTable from "../pages/pickUp/PickUpTable";
// import HireDriverTable from "../pages/hireDriver/hireDriverTable";
// import RedeemSchemeTable from "../pages/redeemScheme/RedeemSchemeTable";
// import ReviewTable from "../pages/review/ReviewTable";

// import LogoImage from "../assets/getgo.jpg";

/* ===================== NAVIGATION ===================== */
const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "owner", title: "Owner", icon: <HomeIcon /> },
  { segment: "customer", title: "Customer", icon: <AccountCircleIcon /> },
  { segment: "booking", title: "Rental Request", icon: <BookOnlineIcon /> },
  { segment: "pickUp", title: "PickUp", icon: <DirectionsCarIcon /> },
  { segment: "hireDriver", title: "Hire Driver", icon: <ManIcon /> },
  { segment: "redeemScheme", title: "Redeem Scheme", icon: <ScheduleIcon /> },
  { segment: "review", title: "Review", icon: <VisibilityIcon /> },

  // Divider pushes Logout visually to bottom
  { kind: "divider" },

  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

/* ===================== THEME ===================== */
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

/* ===================== ROUTE → COMPONENT MAP ===================== */
const componentMap = {
  "/dashboard": <DashboardContent />,
  // "/owner": <OwnerTable />,
  // "/customer": <CustomerTable />,
  // "/booking": <BookingTable />,
  // "/pickUp": <PickUpTable />,
  // "/hireDriver": <HireDriverTable />,
  // "/redeemScheme": <RedeemSchemeTable />,
  // "/review": <ReviewTable />,
};

const DashboardComponent = (path) =>
  componentMap[path] || <DashboardContent />;

/* ===================== BRANDING ===================== */
export const BRANDING = {
  title: "Deadstock",
  logo: (
    <img
      // src={LogoImage}
      alt="App Logo"
      style={{ height: 40, borderRadius: "50%" }}
    />
  ),
};

/* ===================== PAGE CONTENT ===================== */
function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      {DashboardComponent(pathname)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

/* ===================== MAIN COMPONENT ===================== */
function DashboardTabs({ window }) {
  const navigate = useNavigate();
  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path === "/logout") {
          localStorage.removeItem("login_token");
          navigate("/");
          return;
        }
        setPathname(String(path));
      },
    }),
    [pathname, navigate]
  );

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={BRANDING}
    >
      <DashboardLayout
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardTabs.propTypes = {
  window: PropTypes.func,
};

export default DashboardTabs;