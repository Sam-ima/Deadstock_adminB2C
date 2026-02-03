import React, { lazy, Suspense } from "react";
import "./global.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { SearchProvider } from "./components/searchbar/searchContext";
// import { SnackbarProvider } from "./components/context/snackbarContext";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Lazy Loaded Components */
import LoginForm from "./dashboard/login/login_form";
import AdminDashboardPage from "./pages/admin_dashboard.page";
// import DashboardContent from "./dashboard/dashboard_content";
// import ProductsPage from "./pages/products/products_page";
// import OrdersPage from "./pages/orders/order_page";
// import SellersPage from "./pages/sellers/seller.page";
// import CustomersPage from "./pages/customers/customer.page";
// import ReviewPage from "./pages/reviews/review.page";
/* Uncomment below to lazy load more pages */
// import RedeemSchemeTable from "./pages/redeemScheme/RedeemSchemeTable";
// import ReviewsTable from "./pages/reviews/ReviewsTable";
// const OwnerTable = lazy(() => import("./pages/owner/owner/OwnerTable"));
// const CustomerTable = lazy(() => import("./pages/customer/CustomerTable"));
// const BookingTable = lazy(() => import("./pages/booking/BookingTable"));
// const PickUpTable = lazy(() => import("./pages/pickUp/PickUpTable"));
// const HireDriverTable = lazy(() => import("./pages/hireDriver/hireDriverTable"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
      <Route index element={<LoginForm />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
         {/* <Route index element={<DashboardContent />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="sellers" element={<SellersPage />} />
        <Route path="buyers" element={<CustomersPage />} />
        <Route path="reviews" element={<ReviewPage />} /> */}
        {/* <Route path="/owner" element={<OwnerTable />} />
        <Route path="/customer" element={<CustomerTable />} />
        <Route path="/booking" element={<BookingTable />} />
        <Route path="/pickup" element={<PickUpTable />} />
        <Route path="/hireDriver" element={<HireDriverTable />} />
        <Route path="/redeemScheme" element={<RedeemSchemeTable />} />
        <Route path="/reviews" element={<ReviewsTable />} /> */}
      </Route>
    )
  );

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <SearchProvider>
        {/* <SnackbarProvider> */}
        <RouterProvider router={router} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
        {/* </SnackbarProvider> */}
      </SearchProvider>
    </Suspense>
  );
}

export default App;
