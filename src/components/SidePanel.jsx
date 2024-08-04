import React, { useState } from "react";
import { Drawer, IconButton, Button, Typography, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const SidePanel = ({ drawerOpen, toggleDrawer, toggleSorting, toggleColumnViews, filters, setFilters, clearFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: date }));
  };

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

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
              onClick={toggleFilters}
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
          {showFilters && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Activity">Activity</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Pets">Pets</MenuItem>Automotive
                    <MenuItem value="Automotive">Automotive</MenuItem>
                
                    {/* can add more categories here  */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subcategory"
                    value={filters.subcategory}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Nutrition"><em>Nutrition</em></MenuItem>
                    <MenuItem value="Mens"><em>Mens</em></MenuItem>
                    <MenuItem value="Outdoors"><em>Outdoors</em></MenuItem>
                    <MenuItem value="Cleaning"><em>Cleaning</em></MenuItem>
                    <MenuItem value="Aquarium"><em>Aquarium</em></MenuItem>
                    
                    
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Created At"
                  value={filters.createdAt}
                  onChange={(date) => handleDateChange("createdAt", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Updated At"
                  value={filters.updatedAt}
                  onChange={(date) => handleDateChange("updatedAt", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={clearFilters}
                  sx={{
                    backgroundColor: "lightgrey",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "grey",
                    },
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
