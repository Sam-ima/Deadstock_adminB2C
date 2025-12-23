import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LogoutIcon from "@mui/icons-material/Logout";

export const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "sellers", title: "Sellers", icon: <Inventory2Icon /> },
  { segment: "customers", title: "Customers", icon: <AccountCircleIcon /> },
  { segment: "products", title: "Products", icon: <ProductionQuantityLimitsIcon /> },
  { segment: "low-stock", title: "Low Stock", icon: <WarningAmberIcon /> },
  { segment: "hidden-products", title: "Hidden Products", icon: <VisibilityOffIcon /> },
  { segment: "reviews", title: "Reviews", icon: <VisibilityIcon /> },
  { kind: "divider" },
  { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
];
