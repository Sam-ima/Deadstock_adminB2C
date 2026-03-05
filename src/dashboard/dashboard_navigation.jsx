import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group"; 

export const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    pattern: "dashboard",
  },
  {
    segment: "users", 
    title: "Users",
    icon: <GroupIcon />,
    pattern: "users",
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