import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../components/config/firebase";
import { NAVIGATION } from "./dashboard_navigation";
import { dashboardTheme } from "./dashboard_theme";
import { resolveComponent } from "./dashboard_routes";
import ToolbarActions from "./toolbar_actions";

/* ================= BRANDING ================= */

const BRANDING = {
  title: "Deadstock Admin",
  logo: (
    <img
      src="/logo.png"
      alt="Deadstock Logo"
      style={{ height: 50, width: 50, borderRadius: "50%" }}
    />
  ),
};

/* ================= CONTENT ================= */

function PageContent({ pathname, navigate }) {
  return (
    <Box sx={{ p: 2, width: "100%", overflowX: "hidden" }}>
      {resolveComponent(pathname, navigate)}
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

/* ================= MAIN ================= */

export default function DashboardTabs({ window }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* LOGOUT */
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  /* Convert URL → segment */
  const getSegment = (path) => {
    if (path === "/dashboard") return "dashboard";

    const match = path.match(/^\/dashboard\/(.+)/);
    return match ? match[1] : "dashboard";
  };

  /* Toolpad Router */
  const router = React.useMemo(
    () => ({
      pathname: getSegment(location.pathname),
      searchParams: new URLSearchParams(),

      navigate: (segment) => {
        if (segment === "logout") {
          handleLogout();
          return;
        }

        const path =
          segment === "dashboard"
            ? "/dashboard"
            : `/dashboard/${segment}`;

        if (location.pathname !== path) {
          navigate(path);
        }
      },
    }),
    [location.pathname, navigate]
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={dashboardTheme}
      branding={BRANDING}
      window={window?.()}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => <ToolbarActions navigate={navigate} />,
        }}
      >
        <PageContent
          pathname={location.pathname}
          navigate={router.navigate}
        />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardTabs.propTypes = {
  window: PropTypes.func,
};