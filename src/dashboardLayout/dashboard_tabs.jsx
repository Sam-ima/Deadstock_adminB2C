import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LogoutIcon from "@mui/icons-material/Logout";

import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useNavigate } from "react-router-dom";

/* ===================== PAGE IMPORTS ===================== */
import DashboardContent from "./dashboard_content";
import ProductsPage from "./products_page";
import CategoriesPage from "./categories_page";
import LowStockPage from "./low_stock_page";
import HiddenProductsPage from "./hidden_product_page";

/* ===================== NAVIGATION (B2C ADMIN) ===================== */
const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <Inventory2Icon />,
  },
  {
    segment: "categories",
    title: "Categories",
    icon: <CategoryIcon />,
  },
  {
    segment: "low-stock",
    title: "Low Stock",
    icon: <WarningAmberIcon />,
  },
  {
    segment: "hidden-products",
    title: "Hidden Products",
    icon: <VisibilityOffIcon />,
  },

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
  "/products": <ProductsPage />,
  "/categories": <CategoriesPage />,
  "/low-stock": <LowStockPage />,
  "/hidden-products": <HiddenProductsPage />,
};

const DashboardComponent = (path) =>
  componentMap[path] || <DashboardContent />;

/* ===================== BRANDING ===================== */
export const BRANDING = {
  title: "Deadstock Admin",
  logo: (
    <img
      alt="Deadstock Logo"
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

/* ===================== MAIN DASHBOARD ===================== */
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
