import React from "react";

import DashboardContent from "./dashboard_content";
import UsersPage from "../pages/users/user_page";
import SellersPage from "../pages/sellers/seller.page";
import CustomersPage from "../pages/customers/customer.page";
import ProductsPage from "../pages/products/products_page";
import LowStockPage from "../pages/low_stock_page";
import OrdersPage from "../pages/orders/order_page";
import ReviewPage from "../pages/reviews/review.page";
import SellerSettlementPage from "../pages/seller settlement/seller_settlement.page";

export const componentMap = {
  "/dashboard": <DashboardContent />,
  "/dashboard/users": <UsersPage />,
  "/dashboard/sellers": <SellersPage />,
  "/dashboard/buyers": <CustomersPage />,
  "/dashboard/products": <ProductsPage />,
  "/dashboard/low-stock": <LowStockPage />,
  "/dashboard/orders": <OrdersPage />,
  "/dashboard/seller-settlement": <SellerSettlementPage />,
  "/dashboard/review": <ReviewPage />,
};

export const resolveComponent = (path, navigate) => {
  const component = componentMap[path];

  if (component) {
    return React.cloneElement(component, { navigate });
  }

  return <DashboardContent navigate={navigate} />;
};