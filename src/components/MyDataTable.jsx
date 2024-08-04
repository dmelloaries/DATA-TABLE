import React, { useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { Drawer, IconButton, Button, Typography, Box, Tooltip, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import UseData from "../utils/UseData";
import { formatDate } from "../api/formatDate";
import SidePanel from "./SidePanel";
import { sortData, formatData } from "../api/sorting";

const MyDataTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [columnViewsOpen, setColumnViewsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });
  const [sortDirection, setSortDirection] = useState(''); // 'asc', 'desc', or ''
  const [sortColumn, setSortColumn] = useState('');

  const columns = useMemo(() => [
    { name: "id", label: "ID" },
    { name: "name", label: "Name" },
    { name: "category", label: "Category" },
    { name: "subcategory", label: "SubCategory" },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "updatedAt",
      label: "Updated At",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    { name: "price", label: "Price" },
    { name: "sale_price", label: "Sale Price" },
  ], []);

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    print: false,
  };

  const sampleData = UseData;

  const filteredColumns = columns.filter(col => visibleColumns[col.name]);

  const sortedData = useMemo(() => sortData(sampleData, sortColumn, sortDirection), [sampleData, sortColumn, sortDirection]);

  const formattedData = useMemo(() => formatData(sortedData, filteredColumns), [sortedData, filteredColumns]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSorting = () => {
    setSortingOpen(!sortingOpen);
  };

  const toggleColumnViews = () => {
    setColumnViewsOpen(!columnViewsOpen);
  };

  const handleColumnVisibilityChange = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleSortingChange = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const clearSorting = () => {
    setSortColumn('');
    setSortDirection('');
  };

  return (
    <div style={{ position: "relative" }}>
      {!drawerOpen && !sortingOpen && !columnViewsOpen && (
        <Tooltip title="Side Panel" arrow>
          <IconButton
            onClick={toggleDrawer}
            style={{ position: "absolute", top: 12, right: 0, zIndex: 1201 }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}

      <SidePanel 
        drawerOpen={drawerOpen} 
        toggleDrawer={toggleDrawer} 
        toggleSorting={toggleSorting} 
        toggleColumnViews={toggleColumnViews} 
      />

      <Drawer
        anchor="right"
        open={sortingOpen}
        onClose={toggleSorting}
        variant="temporary"
        sx={{
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 400, boxSizing: "border-box" },
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Sorting Options
            </Typography>
            <IconButton onClick={toggleSorting}>
              <CloseIcon />
            </IconButton>
          </Box>
          {columns.map((col) => (
            <Box key={col.name} mb={2}>
              <Typography variant="body1">{col.label}</Typography>
              <TextField
                fullWidth
                select
                SelectProps={{ native: true }}
                variant="outlined"
                onChange={(e) => handleSortingChange(col.name, e.target.value)}
                value={sortColumn === col.name ? sortDirection : ''}
              >
                <option value="">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </TextField>
            </Box>
          ))}
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
            onClick={() => {
              clearSorting();
              toggleSorting();
            }}
          >
            Clear Sorting
          </Button>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={columnViewsOpen}
        onClose={toggleColumnViews}
        variant="temporary"
        sx={{
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 400, boxSizing: "border-box" },
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Show/Hide Columns
            </Typography>
            <IconButton onClick={toggleColumnViews}>
              <CloseIcon />
            </IconButton>
          </Box>
          {columns.map((col) => (
            <Box key={col.name} mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleColumns[col.name]}
                    onChange={() => handleColumnVisibilityChange(col.name)}
                  />
                }
                label={col.label}
              />
            </Box>
          ))}
        </Box>
      </Drawer>

      <MUIDataTable
        title={"DATA TABLE"}
        data={formattedData}
        columns={filteredColumns}
        options={options}
      />
    </div>
  );
};

export default MyDataTable;
