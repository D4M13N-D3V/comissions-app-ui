import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chip from '@mui/material/Chip';
import {Check, Refresh } from '@mui/icons-material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

import dayjs from 'dayjs';


export default function ServerPaginationGrid() {
    const columns = [
      { field: 'id', headerName: 'ID', flex: 0.1},
      { field: 'status', headerName: 'Status', flex: 0.15,
        renderCell: (params) => {
            if(params.row.completed){
                return <Chip icon={<Check />} label="Completed" variant="outlined" color="success" />
            }
            else if(params.row.paid){
                return <Chip icon={<PriceCheckIcon />} label="Paid" variant="outlined" color="success" />
            }
            else if(params.row.accepted && params.row.paid==false){
                return <Chip icon={<PriceCheckIcon />} label="Pending Payment" variant="outlined" color="warning" />
            }
            else if(params.row.accepted && params.row.paid){
                return <Chip icon={<AssignmentTurnedInIcon />} label="Accepted" variant="outlined" color="info" />
            }
            else if(params.row.declined){
                return <Chip icon={<AssignmentLateIcon />} label="Declined" variant="outlined" color="error" />
            }
            else{
                return <Chip icon={<Refresh />} label="Pending" variant="outlined" color="secondary" />
            }
        }
    },
      { field: 'amount', headerName: 'Amount', flex: 0.1, renderCell: (params) => {
        return <CurrencyTextField size="small" fullWidth value={params.row.amount} currencySymbol="$" disabled />;
      }},
      { field: 'requestDate', headerName: 'Request Date', flex:0.15, type: 'date' ,
        valueGetter: (params) => { return new Date(params.row.requestDate); }} 
    ];
  const [isLoading, setIsLoading] = React.useState(true);
  const [requestCount, setRequestCount] = React.useState(null);  
  const [requestData, setRequestData] = React.useState({});  
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });


  const getRequests = async () => {
    setIsLoading(true);
    const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            completed: true, // Example query parameter
            declined: true, // Example query parameter
            accepted: true, // Example query parameter
            paid: true, // Example query parameter
            offset: paginationModel.page*paginationModel.pageSize, // Example query parameter
            pageSize: paginationModel.pageSize
        }),
    });
    const data = await response.json();
    setRequestData(data);
    setIsLoading(false);
  }
  const getRequestsCount = async () => {
    const response = await fetch('/api/requestcount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            completed: true, // Example query parameter
            declined: true, // Example query parameter
            accepted: true, // Example query parameter
            paid: true, // Example query parameter
            offset: paginationModel.page*paginationModel.pageSize, // Example query parameter
            pageSize: paginationModel.pageSize
        })
    });
    const data = await response.json();
    setRequestCount(data);
    setRowCountState((prevRowCountState) =>
      data !== undefined
        ? data
        : prevRowCountState,
    );
    return data;
  } 

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(0);
  React.useEffect(() => {
    getRequests();
     getRequestsCount();
  }, [requestCount, setRowCountState,paginationModel]);

  return (
    <div style={{ width: '100%' }}>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataGrid
      minHeight={"500px"}
        rows={requestData}
        columns={columns}
        rowCount={rowCountState}
        loading={isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
        </LocalizationProvider>
    </div>
  );
}