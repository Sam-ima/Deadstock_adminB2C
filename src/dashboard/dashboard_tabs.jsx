import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useNavigate } from "react-router-dom";

import { NAVIGATION } from "./dashboard_navigation";
import { dashboardTheme } from "./dashboard_theme";
import { resolveComponent } from "./dashboard_routes";
import ToolbarActions from "./toolbar_actions";

import logo from "../assets/ChatGPT Image Dec 23, 2025, 11_11_06 PM.png";

const BRANDING = {
  title: "Deadstock Admin",
  logo: (
    <img
      src={logo}
      alt="Deadstock Logo"
      style={{ height: 50, width: 50, borderRadius: "50%" }}
    />
  ),
};

function PageContent({ pathname }) {
  return (
    <Box sx={{ p: 2, width: "100%", overflowX: "hidden" }}>
      {resolveComponent(pathname)}
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function DashboardTabs({ window }) {
  const navigate = useNavigate();
  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path === "/logout") {
          localStorage.removeItem("login_token");
          navigate("/");
          return;
        }
        setPathname(String(path));
      },
    }),
    [pathname, navigate]
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
        <PageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
