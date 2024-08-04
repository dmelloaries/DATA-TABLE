import React, { useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import {
  Drawer,
  IconButton,
  Button,
  Typography,
  Box,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import UseData from "../utils/UseData";
import { formatDate } from "../api/formatDate";
import SidePanel from "./SidePanel";
import { sortData, formatData } from "../api/sorting";

const MyDataTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [columnViewsOpen, setColumnViewsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
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
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    subcategory: '',
    createdAtFrom: null,
    createdAtTo: null,
    updatedAtFrom: null,
    updatedAtTo: null,
    priceFrom: '',
    priceTo: ''
  });

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

  const filteredData = useMemo(() => {
    return sampleData.filter((row) => {
      const createdAt = dayjs(row.createdAt);
      const updatedAt = dayjs(row.updatedAt);
      return (
        (!filters.name || row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.category || row.category === filters.category) &&
        (!filters.subcategory || row.subcategory === filters.subcategory) &&
        (!filters.createdAtFrom || createdAt.isAfter(dayjs(filters.createdAtFrom).subtract(1, 'day'))) &&
        (!filters.createdAtTo || createdAt.isBefore(dayjs(filters.createdAtTo).add(1, 'day'))) &&
        (!filters.updatedAtFrom || updatedAt.isAfter(dayjs(filters.updatedAtFrom).subtract(1, 'day'))) &&
        (!filters.updatedAtTo || updatedAt.isBefore(dayjs(filters.updatedAtTo).add(1, 'day'))) &&
        (!filters.priceFrom || row.price >= parseFloat(filters.priceFrom)) &&
        (!filters.priceTo || row.price <= parseFloat(filters.priceTo))
      );
    });
  }, [sampleData, filters]);

  const sortedData = useMemo(() => sortData(filteredData, sortColumn, sortDirection), [filteredData, sortColumn, sortDirection]);

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

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
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

  const clearFilters = () => {
    setFilters({
      name: '',
      category: '',
      subcategory: '',
      createdAtFrom: null,
      createdAtTo: null,
      updatedAtFrom: null,
      updatedAtTo: null,
      priceFrom: '',
      priceTo: ''
    });
  };

  return (
    <div style={{ position: "relative" }}>
      {!drawerOpen && !sortingOpen && !columnViewsOpen && !filtersOpen && (
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
        toggleFilters={toggleFilters}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
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

      <Drawer
        anchor="right"
        open={filtersOpen}
        onClose={toggleFilters}
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
              Filters
            </Typography>
            <IconButton onClick={toggleFilters}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="SubCategory"
            value={filters.subcategory}
            onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <DatePicker
              label="Created At From"
              value={filters.createdAtFrom}
              onChange={(date) => setFilters({ ...filters, createdAtFrom: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box mt={2}>
            <DatePicker
              label="Created At To"
              value={filters.createdAtTo}
              onChange={(date) => setFilters({ ...filters, createdAtTo: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box mt={2}>
            <DatePicker
              label="Updated At From"
              value={filters.updatedAtFrom}
              onChange={(date) => setFilters({ ...filters, updatedAtFrom: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box mt={2}>
            <DatePicker
              label="Updated At To"
              value={filters.updatedAtTo}
              onChange={(date) => setFilters({ ...filters, updatedAtTo: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box mt={2}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={[filters.priceFrom || 0, filters.priceTo || 200]}
              onChange={(event, newValue) => setFilters({ ...filters, priceFrom: newValue[0], priceTo: newValue[1] })}
              valueLabelDisplay="auto"
              min={0}
              max={300}
            />
          </Box>
          <Box mt={2}>
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
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
      </Drawer>

      <MUIDataTable
        title={"Product List"}
        data={formattedData}
        columns={filteredColumns}
        options={options}
      />
    </div>
  );
};

export default MyDataTable;
