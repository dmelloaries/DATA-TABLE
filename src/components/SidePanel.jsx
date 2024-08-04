import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const SidePanel = ({
  drawerOpen,
  toggleDrawer,
  toggleSorting,
  toggleColumnViews,
  filters,
  setFilters,
  clearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: date }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceFrom: newValue[0],
      priceTo: newValue[1],
    }));
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Side Panel
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
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
            <Grid item xs={12}>
              <Box mt={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Activity">Activity</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Pets">Pets</MenuItem>
                    <MenuItem value="Automotive">Automotive</MenuItem>
                    {/* can add more categories here*/}
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subcategory"
                    value={filters.subcategory}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Nutrition">Nutrition</MenuItem>
                    <MenuItem value="Mens">Mens</MenuItem>
                    <MenuItem value="Outdoors">Outdoors</MenuItem>
                    <MenuItem value="Cleaning">Cleaning</MenuItem>
                    <MenuItem value="Aquarium">Aquarium</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2}>
                <DatePicker
                  label="Created At From"
                  value={filters.createdAtFrom}
                  onChange={(date) => handleDateChange("createdAtFrom", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box mt={2}>
                <DatePicker
                  label="Created At To"
                  value={filters.createdAtTo}
                  onChange={(date) => handleDateChange("createdAtTo", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box mt={2}>
                <DatePicker
                  label="Updated At From"
                  value={filters.updatedAtFrom}
                  onChange={(date) => handleDateChange("updatedAtFrom", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box mt={2}>
                <DatePicker
                  label="Updated At To"
                  value={filters.updatedAtTo}
                  onChange={(date) => handleDateChange("updatedAtTo", date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box mt={2}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={[filters.priceFrom || 0, filters.priceTo || 200]}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={300}
                />
              </Box>
              <Box mt={2}>
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
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
