import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

export const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { segment: "sellers", title: "Sellers", icon: <Inventory2Icon />, path: "/dashboard/sellers" },
  { segment: "buyers", title: "Buyers", icon: <AccountCircleIcon />, path: "/dashboard/buyers" },
  { segment: "products", title: "Products", icon: <ProductionQuantityLimitsIcon />, path: "/dashboard/products" },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon />, path: "/dashboard/orders" },
  { segment: "seller-settlement", title: "Seller Settlement", icon: <AccountBalanceWalletIcon />, path: "/dashboard/seller-settlement" },
  { segment: "review", title: "Reviews", icon: <VisibilityIcon />, path: "/dashboard/review" },
  { kind: "divider" },
  { segment: "logout", title: "Logout", icon: <LogoutIcon />, path: "/logout", action: "logout" },
];