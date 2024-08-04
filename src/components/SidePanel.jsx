import React from "react";
import { Drawer, IconButton, Button, Typography, Box, Grid } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const SidePanel = ({ drawerOpen, toggleDrawer, toggleSorting, toggleColumnViews }) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer}
      variant="persistent"
      sx={{
        width: 400,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 400, boxSizing: "border-box" },
      }}
    >
      <Box p={2}>
        <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center">
          Side Panel
        </Typography>
        <IconButton onClick={toggleDrawer} style={{ position: "absolute", top: 12, right: 0 }}>
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
              onClick={toggleSorting}
            >
              Sorting
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              Grouping
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              Filtering
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
              onClick={toggleColumnViews}
            >
              Column Views
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SidePanel;

