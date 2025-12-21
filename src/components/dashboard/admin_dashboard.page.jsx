import React, { useEffect } from "react";
import { Container } from "@mui/material";
import DashboardTabs from "../../dashboardLayout/dashboard_tabs";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("login_token");
    if (!token) {
      navigate("/");
    }
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