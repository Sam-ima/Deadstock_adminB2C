import React, { useEffect } from "react";
import { Container } from "@mui/material";
import DashboardTabs from "../dashboard/dashboard_tabs";
import { useNavigate } from "react-router-dom";
import auth from "../components/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

   useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // No user logged in
        navigate("/");
      }
      
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        // backgroundColor: "blue",
        overflowX: "hidden",        // ⭐ FIX
        maxWidth: "100vw",          // ⭐ FIX
      }}
    >
      <DashboardTabs />
    </Container>
  );
};

export default AdminDashboardPage;