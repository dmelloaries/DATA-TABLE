import { formatDate } from "./formatDate";
export const sortData = (data, sortColumn, sortDirection) => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === 'desc') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
      return 0;
    });
  };
  
  export const formatData = (data, columns) => {
    return data.map((item) =>
      columns.map((col) =>
        col.name === "createdAt" || col.name === "updatedAt" ? formatDate(item[col.name]) : item[col.name]
      )
    );
  };
  