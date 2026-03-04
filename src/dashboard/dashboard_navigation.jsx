import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

export const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    pattern: "dashboard",
  },
  {
    segment: "sellers",
    title: "Sellers",
    icon: <Inventory2Icon />,
    pattern: "sellers",
  },
  {
    segment: "buyers",
    title: "Buyers",
    icon: <AccountCircleIcon />,
    pattern: "buyers",
  },
  {
    segment: "products",
    title: "Products",
    icon: <ProductionQuantityLimitsIcon />,
    pattern: "products",
  },
  // {
  //   segment: "low-stock",
  //   title: "Low Stock",
  //   icon: <ProductionQuantityLimitsIcon />,
  //   pattern: "low-stock",
  // },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
    pattern: "orders",
  },
  {
    segment: "seller-settlement",
    title: "Seller Settlement",
    icon: <AccountBalanceWalletIcon />,
    pattern: "seller-settlement",
  },
  {
    segment: "review",
    title: "Reviews",
    icon: <VisibilityIcon />,
    pattern: "review",
  },
  { kind: "divider" },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
    action: "logout",
  },
];