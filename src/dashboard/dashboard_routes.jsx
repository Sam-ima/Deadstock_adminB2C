import React from "react";
import DashboardContent from "./dashboard_content";
import SellersPage from "../pages/sellers/seller.page";
import CustomersPage from "../pages/customers/customer.page";
import ProductsPage from "../pages/products/products_page";
import LowStockPage from "../pages/low_stock_page";
import OrdersPage from "../pages/orders/order_page";
// import HiddenProductsPage from "../pages/hidden_product_page";
import ReviewPage from "../pages/reviews/review.page";

export const componentMap = {
  "/dashboard": <DashboardContent />,
  "/sellers": <SellersPage />,
  "/buyers": <CustomersPage />,
  "/products": <ProductsPage />,
  "/low-stock": <LowStockPage />,
  "/orders": <OrdersPage />,
  // "/hidden-products": <HiddenProductsPage />,
  "/review": <ReviewPage />,
};

export const resolveComponent = (path, navigate) => {
  const component = componentMap[path];
  if (component) {
    return React.cloneElement(component, { navigate });
  }
  return <DashboardContent navigate={navigate} />;
};