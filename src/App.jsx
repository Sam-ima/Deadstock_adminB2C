import React, { lazy, Suspense } from "react";
import "./global.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { SearchProvider } from "./components/searchbar/searchContext";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Lazy Loaded Components */
import LoginForm from "./dashboard/login/login_form";
import AdminDashboardPage from "./pages/admin_dashboard.page";

// Error boundary component
const ErrorBoundary = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <p>Please try refreshing the page or contact support.</p>
      <button onClick={() => window.location.href = '/dashboard'}>
        Go to Dashboard
      </button>
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LoginForm />} />
        {/* Catch all dashboard routes */}
        <Route 
          path="dashboard/*" 
          element={<AdminDashboardPage />}
          errorElement={<ErrorBoundary />}
        />
        {/* Redirect any other routes to login */}
        <Route path="*" element={<LoginForm />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <SearchProvider>
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
      </SearchProvider>
    </Suspense>
  );
}

export default App;