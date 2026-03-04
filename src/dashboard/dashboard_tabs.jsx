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

/* ================= HELPERS ================= */

/**
 * Converts a React Router path like "/dashboard/orders"
 * into the Toolpad-style segment path "/orders".
 * The root "/dashboard" maps to "/".
 */
const toToolpadPathname = (path) => {
  if (path === "/dashboard") return "/";
  return path.replace(/^\/dashboard/, "") || "/";
};

/**
 * Converts a Toolpad segment path like "/orders"
 * back into the full React Router path "/dashboard/orders".
 */
const toRouterPath = (segment) => {
  if (!segment || segment === "/" || segment === "dashboard") return "/dashboard";
  const clean = segment.startsWith("/") ? segment : `/${segment}`;
  return `/dashboard${clean}`;
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

  /* Toolpad Router */
  const router = React.useMemo(
    () => ({
      // ✅ Pass the Toolpad-style pathname so active state is correctly highlighted
      pathname: toToolpadPathname(location.pathname),
      searchParams: new URLSearchParams(),

      navigate: (segment) => {
        if (segment === "logout") {
          handleLogout();
          return;
        }

        const path = toRouterPath(segment);

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