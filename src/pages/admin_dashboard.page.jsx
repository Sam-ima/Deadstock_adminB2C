import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../components/config/firebase";
import DashboardTabs from "../dashboard/dashboard_tabs";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        overflowX: "hidden",
        maxWidth: "100vw",
        p: 0,
      }}
    >
      <DashboardTabs />
    </Container>
  );
};

export default AdminDashboardPage;