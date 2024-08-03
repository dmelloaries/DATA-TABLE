import React from "react";
import MUIDataTable from "mui-datatables";
import UseData from "../utils/UseData";
import { formatDate } from "../api/formatDate";

const MyDataTable = () => {
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

  return (
    <MUIDataTable 
      title={"DATA TABLE"}
      data={formattedData}
      columns={columns}
      options={options}
    />
  );
};

export default MyDataTable;
