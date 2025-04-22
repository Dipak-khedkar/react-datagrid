import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AppProvider,
  type Session,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/slice/authSlice";
import { useAppSelector } from "../store/store";
import StudentsList from "../pages/StudentsList";
import Dashboard from "../pages/Dashboard";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "students-list",
    title: "Students List",
    icon: <PermContactCalendarIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "15px",
      }}
    >
      {pathname === "/dashboard" && <Dashboard />}
      {pathname === "/students-list" && <StudentsList />}
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function Navbar(props: DemoProps) {
  const { window } = props;

  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [session, setSession] = React.useState<Session | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        if (user) {
          const userData = {
            name: user.name,
            email: user.email,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setSession({ user: userData });
          dispatch(updateUser(userData));
        }
      },
      signOut: () => {
        localStorage.removeItem("user");
        dispatch(updateUser(null));
        setSession(null);
      },
    };
  }, [dispatch, user]);

  const router = useDemoRouter("/");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
