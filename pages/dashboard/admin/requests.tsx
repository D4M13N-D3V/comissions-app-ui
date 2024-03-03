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
import {Block, Check, Close, Download, OpenInFull, OpenInNew, Person, Refresh, Star, Upload } from '@mui/icons-material';
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


export default function AdminRequests() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Check if the screen size is small
    const router = useRouter();
    let columns = [];
    if(isSmallScreen){
        columns = [
            { field: 'id', headerName: '', flex: 0.05, sortable: false, filterable: false},
            { field: 'message', headerName: 'Message', flex: 0.2, sortable: false, filterable: false},
            { field: 'actions', headerName: '', flex: 0.15, sortable: false, filterable: false, renderCell: (params) => {
                const handleAccept = async () => {
                    var response = await fetch("/api/admin/requests/"+params.row.userId, {method:"PUT"})
                    if(response.ok){
                        var data = await response.json();
                        router.reload();
                    }
                    else{
                        alert("Failed to accept request.")
                    }
                }
                const handleDeny = async () => {
                    var response = await fetch("/api/admin/requests/"+params.row.userId, {method:"DELETE"})
                    if(response.ok){
                        var data = await response.json();
                        router.reload();
                    }
                    else{
                        alert("Failed to deny request.")
                    }
                }
                if(params.row.accepted){
                    return <>
                    <Tooltip title="Revoke artist access"><IconButton color="error"><Block/></IconButton></Tooltip>
                    <Tooltip title="View artist information"><IconButton onClick={() => router.push("/dashboard/admin/requests/"+params.row.id)} color="info"><Magnify/></IconButton></Tooltip>
                    </>
                }
                else{
                    
                    return (
                        <>
                            <Tooltip title="Accept this request and grant artist access."><IconButton onClick={handleAccept} color="success"><Check/></IconButton></Tooltip>
                            <Tooltip title="Decline this request and refuse artist access."><IconButton onClick={handleDeny} color="error"><Close/></IconButton></Tooltip>
                        </>
                    )
                }
            }}
        ];
    }
    else{
        columns = [
            { field: 'id', headerName: '', flex: 0.05, sortable: false, filterable: false},
            { field: 'userId', headerName: 'User ID', flex: 0.25, sortable: false, filterable: false},
            { field: 'message', headerName: 'Message', flex: 0.5, sortable: false, filterable: false},
            { field: 'requestDate', headerName: 'Request Date', flex: 0.1, sortable: false, filterable: false, type: 'date', valueGetter: (params) => { return new Date(params.row.requestDate); }},
            { field: 'accepted', headerName:'Accepted', flex: 0.15, sortable: false, filterable: false, renderCell: (params) => {
                return (params.row.accepted ? <Chip icon={<Check />} label="Accepted" variant="outlined" color="success" /> : <Chip icon={<Refresh />} label="Pending" variant="outlined" color="info" />)
            }},
            { field: 'actions', headerName: '', flex: 0.15, sortable: false, filterable: false, renderCell: (params) => {
                const handleAccept = async () => {
                    var response = await fetch("/api/admin/requests/"+params.row.userId, {method:"PUT"})
                    if(response.ok){
                        var data = await response.json();
                        router.reload();
                    }
                    else{
                        alert("Failed to accept request.")
                    }
                }
                const handleDeny = async () => {
                    var response = await fetch("/api/admin/requests/"+params.row.userId, {method:"DELETE"})
                    if(response.ok){
                        var data = await response.json();
                        router.reload();
                    }
                    else{
                        alert("Failed to deny request.")
                    }
                }
                if(params.row.accepted){
                    return <>
                    <Tooltip title="View request information"><IconButton onClick={() => router.push("/dashboard/admin/requests/"+params.row.id)} color="info"><OpenInNew/></IconButton></Tooltip>
                    <Tooltip title="View artist information"><IconButton onClick={() => router.push("/dashboard/admin/users/"+params.row.id)} color="info"><Person/></IconButton></Tooltip>
                    </>
                }
                else{
                    
                    return (
                        <>
                            <Tooltip title="View request information"><IconButton onClick={() => router.push("/dashboard/admin/requests/"+params.row.id)} color="info"><OpenInNew/></IconButton></Tooltip>
                            <Tooltip title="Accept this request and grant artist access."><IconButton onClick={handleAccept} color="success"><Check/></IconButton></Tooltip>
                            <Tooltip title="Decline this request and refuse artist access."><IconButton onClick={handleDeny} color="error"><Close/></IconButton></Tooltip>
                        </>
                    )
                }
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
    const response = await fetch('/api/admin/requests', {
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
    const response = await fetch('/api/admin/requests/count', {
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