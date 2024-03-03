import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Button, CardHeader, CircularProgress, Stack, Typography } from '@mui/material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chip from '@mui/material/Chip';
import {ArrowBack, Check, Close, Download, OpenInFull, OpenInNew, Refresh, Star, Upload } from '@mui/icons-material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Card, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Box } from '@mui/material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { ImageList } from '@mui/material';
import AssetImage from '../../../../components/dashboard/artist/AssetImage'
import ReferenceImage from '../../../../components/dashboard/artist/ReferenceImage'
import { UploadBoxOutline } from 'mdi-material-ui';

const ArtistRequestDetails = () => {
    const [references, setReferences] = useState([]);
    const [assets, setAssets] = useState([]);
    const [request, setRequest] = useState(null);
    const router = useRouter();

    const getData = async () => {
        if(router.query.requestId!=null){
            const response = await fetch("/api/requests/"+router.query.requestId+"/details");
            const data = await response.json();
            setRequest(data);
            setRating(data.requestRating)
            setReview(data.reviewMessage)

            const requestResponse = await fetch("/api/artist/requests/"+router.query.requestId+"/references");
            const requestJson = await requestResponse.json();
            setReferences(requestJson); 

            const assetResponse = await fetch("/api/artist/requests/"+router.query.requestId+"/assets");
            const assetJson = await assetResponse.json();
            setAssets(assetJson);
        }
    }

    const acceptRequest = async () => {
        let response = await fetch('/api/artist/requests/'+request["id"]+"/accept", { method: 'PUT' })
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
        let response = await fetch('/api/artist/requests/'+request["id"]+"/deny", { method: 'PUT' })
        if(response.status === 200){
          router.reload()
        }
        else{
          alert("Error accepting request.")
        }
      }

      const completeRequest = async () => {
        let response = await fetch('/api/artist/requests/'+request["id"]+"/complete", { method: 'PUT' })
        if(response.status === 200){
          router.reload()
        }
        else{
          alert("Error accepting request.")
        }
      }

      const handleReferenceUpload = async (event) =>{
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('newImage', file);
      
        fetch('/api/artist/requests/'+router.query.requestId+"/newasset", {
          method: 'POST',
          body: formData // Don't set Content-Type, FormData will handle it
        })
        .then(response => response.json())
        .then(data => {
          getData();
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error appropriately
        });
      }
  

    useEffect(() => {
        getData()
    }, [router.query.requestId]);
  
      const [open, setOpen] = React.useState(false);
      const [rating, setRating] = React.useState(1);
      const [review, setReview] = React.useState("");

      const handlePay = async () => {
        var paymentUrlRequest = await fetch('/api/requests/'+request.id+'/payment')
        //console.log(paymentUrlRequest);
        var paymentUrlJson = await paymentUrlRequest.json();
        var paymentUrl = paymentUrlJson.paymentUrl;
        window.open(paymentUrl);
    }
      let formattedTime = ""
      const date = new Date(request?.requestDate ?? "");  
      formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format  

  return (<>
  {(request) ? (
    <Card>
      <CardContent>
      <Grid container spacing={3} sx={{paddingTop:"1%"}}>
            <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            multiline={true}
                            rows={10}
                            fullWidth
                            label="Request Message"
                            value={request.message}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <ImageList variant="masonry">
                            {(references.map((reference) => (
                              <ReferenceImage referenceId={reference.id} requestId={request.id}/>
                            )))}
                          </ImageList>
                        </Grid>
                        <Grid item xs={12} md={12}>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={10}>
                        <Grid container >
                        <Grid item xs={12} md={6}>
                            <Tooltip arrow title="Decline this request.">
                              <IconButton onClick={denyRequest} disabled={request.declined || request.accepted} color="error"><Close/></IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Accept this request.">
                            <IconButton onClick={acceptRequest} disabled={request.declined || request.accepted} color="success"><Check/></IconButton>
                            </Tooltip>
                              <label htmlFor="uploadInput">
                                <Tooltip arrow title="Upload asset image for customer.">
                                  <IconButton disabled={request.completed && request.paid} component="span" color="info"><UploadBoxOutline/></IconButton>
                                </Tooltip>
                              </label>
                            <Tooltip arrow title="Complete this request.">
                            <IconButton onClick={completeRequest} disabled={!request.paid || request.completed} color="success"><AssignmentTurnedInIcon/></IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={2} direction="row">
                              {(request.declined ? (
                                <Tooltip title="The request has been declined.">
                                    <Chip icon={<AssignmentLateIcon />} label="Declined" variant="outlined" color="error" />
                                </Tooltip>
                              ):null)}
                              {(!request.declined && !request.accepted && !request.paid && !request.completed ? (
                                <Tooltip title="The request is pending.">
                                    <Chip icon={<Refresh />} label="Pending" variant="outlined" color="secondary" />
                                </Tooltip>
                              ):null)}
                              {(request.accepted && !request.completed ? (
                                <Tooltip title="The request has been accepted.">
                                    <Chip icon={<AssignmentTurnedInIcon />} label="Accepted" variant="outlined" color="info" />
                                </Tooltip>
                              ):null)}
                              {(request.paid && request.accepted ? (
                                <Tooltip title="The request has been paid for you are clear to work on the request!">
                                    <Chip icon={<PriceCheckIcon />} label="Paid" variant="outlined" color="success" />
                                </Tooltip>
                              ):null)}
                              {(request.paid==false && request.accepted ? (
                                <Tooltip title="The request has not been paid for.">
                                    <Chip icon={<PriceCheckIcon />} label="Pending Payment" variant="outlined" color="warning" />
                                </Tooltip>
                              ):null)}
                              {(request.completed ? (
                                <Tooltip title="The request has been completed.">
                                    <Chip disabled={!request.completed} icon={<Check />} label="Completed" variant="outlined" color="success" />
                                </Tooltip>
                              ):null)}
                          </Stack>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{textAlign:"right"}}>
                        <Tooltip title="Go back to viewing all your requests.">
                            <IconButton onClick={() => {router.push("/dashboard/artist/requests")}} color="primary">
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                          <Grid item xs={12} md={12}>
                            <Alert icon={<Check />} severity="info">
                              Request submitted on {formattedTime}
                            </Alert>
                          </Grid>
                          <Grid item xs={12} md={12}>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={12}>
                              {request.paid ? (
                                <>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={12}>
                                    <Alert sx={{width:"100%"}} severity="success">The request has been paid for, start working on it!</Alert>
                                  </Grid>
                                  <Grid item xs={2} md={1}>
                                    <input
                                        id="uploadInput"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        type="file"
                                        onChange={handleReferenceUpload}
                                        disabled={request.completed}
                                    />
                                    <label htmlFor="uploadInput">
                                      <Tooltip arrow title="Upload a new reference image.">
                                        {assets.length>0 ? (
                                          <IconButton disabled={request.completed} component="span" color="info"><UploadBoxOutline sx={{fontSize:"2rem"}} /></IconButton>
                                        ):
                                        (
                                          <IconButton disabled={request.completed} component="span" color="warning"><UploadBoxOutline sx={{fontSize:"2rem"}} /></IconButton>
                                        )}
                                      </Tooltip>
                                    </label>
                                  </Grid>
                                  <Grid item xs={10} md={11}>
                                    {assets.length>0 ? (
                                      <Alert sx={{width:"100%"}} severity="info">Your uploaded assets will appear below!</Alert>
                                    ):
                                    (
                                      <Alert sx={{width:"100%"}} severity="warning">You have not uploaded any assets!</Alert>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                  </Grid>
                                </Grid>
                                </> 
                              ):(
                                <Alert sx={{width:"100%"}} severity="error">The request is not paid for do not work on the request!</Alert>
                              )}
                          </Grid>
                          <Grid item xs={12} md={12}>
                          <ImageList variant="masonry">
                            {(assets.map((asset) => (
                              <AssetImage assetId={asset.id} requestId={request.id}/>
                            )))}
                          </ImageList>
                          </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
  :(
    <>
      <Box sx={{paddingTop:"20%", textAlign:"center"}}>
        <Typography variant="h6" component="h6" gutterBottom>
            Loading...
        </Typography>
        <CircularProgress/>
      </Box>
    </>
  )}
</>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(ArtistRequestDetails);


