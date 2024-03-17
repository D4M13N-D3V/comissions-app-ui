import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Button, Stack, Typography } from '@mui/material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chip from '@mui/material/Chip';
import {Block, Check, Close, Download, OpenInFull, OpenInNew, Refresh, Star, Upload } from '@mui/icons-material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Card, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';


import dayjs from 'dayjs';
import { DownloadBox, Magnify, StarOutline } from 'mdi-material-ui';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Box } from '@mui/material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { request } from 'http';
import { useMediaQuery } from '@mui/material';


export default function AdminUsers() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Check if the screen size is small
    const router = useRouter();
    let columns = [];
    if(isSmallScreen){
        columns = [
            { field: 'id', headerName: 'User ID', flex: 0.95, sortable: false, filterable: false},
            { field: "actions", headerName: "Actions", flex: 0.05, sortable: false, filterable: false, renderCell: (params) => {
                return <Tooltip title="View more information about this user."><IconButton color="info" onClick={() => router.push("/dashboard/admin/users/"+params.row.id)}><OpenInNew /></IconButton></Tooltip>
            }}
        ];
    }
    else{
        columns = [
            { field: 'id', headerName: 'User ID', flex: 0.2, sortable: false, filterable: false},
            { field: 'displayName', headerName: 'Display Name', flex: 0.15, sortable: false, filterable: false},
            { field: 'email', headerName: 'Email', flex: 0.2, sortable: false, filterable: false},
            { field: "numberOfRequests", headerName: "# of Requests", flex: 0.1, sortable: false, filterable: false},
            { field: "numberOfReviews", headerName: "# of Reviews", flex: 0.1, sortable: false, filterable: false},
            { field: "amountSpent", headerName: "Amount Spent", flex: 0.1, sortable: false, filterable: false},
            { field: 'status', headerName: 'Status', flex: 0.1, sortable: false, filterable: false, renderCell: (params) =>{
                if(params.row.banned){
                    return <Chip icon={<Block />} label="Banned" variant="outlined" color="error" />
                }
                else if(params.row.suspended){
                    return <Chip icon={<Block />} label="Suspended" variant="outlined" color="error" />
                }
                else{
                    return <Chip icon={<Check />} label="Active" variant="outlined" color="success" />
                }
            }},
            { field: "actions", headerName: "", flex: 0.05, sortable: false, filterable: false, renderCell: (params) => {
                return <Tooltip title="View more information about this user."><IconButton color="info" onClick={() => router.push("/dashboard/admin/users/"+params.row.id)}><OpenInNew /></IconButton></Tooltip>
            }}
        ];
    }
  const [isLoading, setIsLoading] = React.useState(true);
  const [requestCount, setRequestCount] = React.useState(null);  
  const [requestData, setRequestData] = React.useState({});  
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });


  const getRequests = async () => {
    setIsLoading(true);
    const response = await fetch('/api/admin/users', {
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
    const response = await fetch('/api/admin/users/count', {
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
    
    <div style={{ height: '100%', width: '100%' }}>
    <Button target="_blank" href="https://manage.auth0.com/dashboard">Open Auth0 Dashboard</Button>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataGrid
        rows={requestData}
        columns={columns}
        rowCount={rowCountState}
        loading={isLoading}
        pageSizeOptions={[15]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
        </LocalizationProvider>
    </div>
  );
}