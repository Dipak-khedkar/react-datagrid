import { Box, Grid } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Grid>
        <Outlet />
      </Grid>
    </Box>
  );
};

export default Layout;
