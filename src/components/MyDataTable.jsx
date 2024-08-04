import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Drawer, IconButton, Button, Typography, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import UseData from "../utils/UseData";
import { formatDate } from "../api/formatDate";

const MyDataTable = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const columns = [
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
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    print: false,
   
    
  };

  const sampleData = UseData;

  const formattedData = sampleData.map((item) => [
    item.id,
    item.name,
    item.category,
    item.subcategory,
    item.createdAt,
    item.updatedAt,
    item.price,
    item.sale_price,
  ]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        onClick={toggleDrawer}
        style={{ position: 'absolute', top: 12, right: 0, zIndex: 1201 }}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
        sx={{ width: 400, flexShrink: 0, '& .MuiDrawer-paper': { width: 400, boxSizing: 'border-box' } }}
      >
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Side Panel
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
             
              console.log('Button in side panel clicked');
              
            }}
          >
            Perform Operation
          </Button>
          
        </Box>
      </Drawer>

      <MUIDataTable
        title={"DATA TABLE"}
        data={formattedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default MyDataTable;
