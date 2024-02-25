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
import {Check, Close, Download, OpenInFull, OpenInNew, Refresh, Upload } from '@mui/icons-material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Card, CardContent } from '@mui/material';


import dayjs from 'dayjs';
import { DownloadBox } from 'mdi-material-ui';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Box } from '@mui/material';
import RequestDialog from '../../components/requestDialog';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';


export default function ServerPaginationGrid() {
    const router = useRouter();
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1},
        { field: 'status', headerName: 'Status', flex: 0.15,
        renderCell: (params) => {
            if(params.row.completed){
                return <Chip icon={<Check />} label="Completed" variant="filled" color="success" />
            }
            else if(params.row.paid){
                return <Chip icon={<PriceCheckIcon />} label="Paid" variant="filled" color="success" />
            }
            else if(params.row.accepted && params.row.paid==false){
                return <Chip icon={<PriceCheckIcon />} label="Pending Payment" variant="filled" color="warning" />
            }
            else if(params.row.accepted && params.row.paid){
                return <Chip icon={<AssignmentTurnedInIcon />} label="Accepted" variant="filled" color="info" />
            }
            else if(params.row.declined){
                return <Chip icon={<AssignmentLateIcon />} label="Declined" variant="filled" color="error" />
            }
            else{
                return <Chip icon={<Refresh />} label="Pending" variant="filled" color="secondary" />
            }
        }
    },
        { field: 'message', headerName: 'Message', flex: 0.5,
        renderCell: (params) => {
            return <TextField size="small" fullWidth value={params.row.message} disabled />;
        }},
        { field: 'amount', headerName: 'Amount', flex: 0.1, renderCell: (params) => {
        return <CurrencyTextField size="small" fullWidth value={params.row.amount} currencySymbol="$" disabled />;
        }},
        { field: 'requestDate', headerName: 'Request Date', flex:0.15, 
        renderCell: (params) =>{

            let formattedTime = ""
            const date = new Date(params.row.requestDate);  
            formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format  
            return <DateField
            size='small'
            disabled
            defaultValue={dayjs(params.row.requestDate)}
            format="LL"
            />
        } },
        { field: 'download', headerName: '', flex:0.1, 
            renderCell: (params) =>{
                const acceptRequest = async () => {
                  let response = await fetch('/api/artist/requests/'+params.row["id"]+"/accept", { method: 'PUT' })
                  if(response.status === 200){
                    router.reload()
                  }
                  else{
                    alert("Error accepting request.")
                  }
                }
    
                const viewRequest = async () => {
    
                }
    
                const denyRequest = async () => {
                  let response = await fetch('/api/artist/requests/'+params.row["id"]+"/deny", { method: 'PUT' })
                  if(response.status === 200){
                    router.reload()
                  }
                  else{
                    alert("Error accepting request.")
                  }
                }
    
                const completeRequest = async () => {
                  let response = await fetch('/api/artist/requests/'+params.row["id"]+"/complete", { method: 'PUT' })
                  if(response.status === 200){
                    router.reload()
                  }
                  else{
                    alert("Error accepting request.")
                  }
                }
                const handlePay = async () => {
                    var paymentUrlRequest = await fetch('/api/requests/'+params.row.id+'/payment')
                    //console.log(paymentUrlRequest);
                    var paymentUrlJson = await paymentUrlRequest.json();
                    var paymentUrl = paymentUrlJson.paymentUrl;
                    window.open(paymentUrl);
                }
                const [open, setOpen] = React.useState(false);
              
                const handleClickOpen = () => {
                  setOpen(true);
                };
              
                const handleClose = () => {
                  setOpen(false);
                };

                let formattedTime = ""
                const date = new Date(params.row.requestDate);  
                formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format  

                return (<>
                    <Dialog
                      fullWidth={true}
                      maxWidth={"lg"}
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle>Request submitted on {formattedTime ?? ''}</DialogTitle>
                      <DialogContent>
                        <Grid container spacing={3} sx={{paddingTop:"1%"}}>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            multiline={true}
                                            rows={10}
                                            fullWidth
                                            label="Request Message"
                                            value={params.row.message}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                      <Card>
                                        <CardContent>
                                          <Grid container>
                                            <Grid item xs={12} md={12}>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                            </Grid>
                                          </Grid>
                                        </CardContent>
                                      </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                      <Tooltip title="Upload reference image.">
                                        <IconButton disabled={params.row.accepted && params.row.paid} color="primary"><Upload/></IconButton>
                                      </Tooltip>
                                      <Tooltip title="Pay for this request.">
                                        <IconButton onClick={handlePay} disabled={params.row.accepted && params.row.paid || params.row.declined} color="success"><ShoppingCartCheckoutIcon/></IconButton>
                                      </Tooltip>
                                      <Tooltip title="Download all assets.">
                                        <IconButton disabled={!params.row.completed} color="secondary"><Download/></IconButton>
                                      </Tooltip>
                                      {(!params.row.declined && !params.row.accepted && !params.row.paid && !params.row.completed ? (
                                        <Chip icon={<Refresh />} label="Pending" variant="filled" color="secondary" />
                                      ):null)}
                                      {(params.row.declined ? (
                                        <Chip icon={<AssignmentLateIcon />} label="Declined" variant="filled" color="error" />
                                      ):null)}
                                      {(params.row.accepted ? (
                                        <Chip icon={<AssignmentTurnedInIcon />} label="Accepted" variant="filled" color="info" />
                                      ):null)}
                                      {(params.row.paid && params.row.acccepted ? (
                                        <Chip label="Paid" variant="filled" color="success" />
                                      ):null)}
                                      {(params.row.paid==false && params.row.accepted ? (
                                         <Chip icon={<PriceCheckIcon />} label="Pending Payment" variant="filled" color="warning" />
                                      ):null)}
                                      {(params.row.completed ? (
                                        <Chip disabled={!params.row.completed} icon={<Check />} label="Completed" variant="outlined" color="success" />
                                      ):null)}
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                      <Card>
                                        <CardContent>
                                          <Grid container>
                                            <Grid item xs={12} md={12}>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                            </Grid>
                                          </Grid>
                                        </CardContent>
                                      </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
                    <Tooltip title="View more details."><IconButton onClick={handleClickOpen}  aria-label="accept" color="primary"><OpenInNew/></IconButton></Tooltip>
                    {((params.row.accepted==true &&params.row.declined==false && params.row.paid==false) ? (
                        <Tooltip title="Pay for this request."><IconButton onClick={handlePay}  aria-label="accept" color="success"><ShoppingCartCheckoutIcon/></IconButton></Tooltip>
                    ): null
                    )}
                    {((params.row.completed) ? (
                        <Tooltip title="Download requests assets."><IconButton aria-label="download" color="secondary"><Download/></IconButton></Tooltip>
                    ): null
                    )}
                </>
                )
            } }
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
    
    <div style={{ height: '100%', width: '100%' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataGrid
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