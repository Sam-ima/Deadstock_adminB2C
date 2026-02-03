import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

export const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "/dashboard/sellers", title: "Sellers", icon: <Inventory2Icon /> },
  { segment: "/dashboard/buyers", title: "Buyers", icon: <AccountCircleIcon /> },
  { segment: "/dashboard/products", title: "Products", icon: <ProductionQuantityLimitsIcon /> },
   { segment: "/dashboard/orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "/dashboard/seller-settlement", title: "Seller Settlement", icon: <AccountBalanceWalletIcon/> },
  // { segment: "hidden-products", title: "Hidden Products", icon: <VisibilityOffIcon /> },
  { segment: "/dashboard/reviews", title: "Reviews", icon: <VisibilityIcon /> },
  { kind: "divider" },
  { segment: "logout", title: "Logout", icon: <LogoutIcon /> },
];
