import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MyDataTable from './components/MyDataTable';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MyDataTable />
    </LocalizationProvider>
  );
};

export default App;
