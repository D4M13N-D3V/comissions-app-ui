import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { Alert, Button, CircularProgress, ImageList, ImageListItem, ListItem, Stack, Typography } from '@mui/material';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chip from '@mui/material/Chip';
import {ArrowBack, AssignmentLateOutlined, Check, Close, Download, Error, OpenInFull, OpenInNew, Refresh, Star, Upload, Warning } from '@mui/icons-material';
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
import { UploadBoxOutline } from 'mdi-material-ui';
import AssetImage from '../../../components/dashboard/artist/AssetImage'
import ReferenceImage from '../../../components/dashboard/artist/ReferenceImage'
import Paper from '@mui/material/Paper';

const RequestDetails = () => {
    const [request, setRequest] = useState(null);
    const [references, setReferences] = useState([]);
    const [assets, setAssets] = useState([]);
    const router = useRouter();

    const getData = async () => {
        if(router.query.requestId!=null){
            const response = await fetch("/api/requests/"+router.query.requestId+"/details");
            const data = await response.json();
            setRequest(data);
            setRating(data.reviewRating)
            setReview(data.reviewMessage)
            setAlreadyReviewed(data.reviewed)

            const requestResponse = await fetch("/api/requests/"+router.query.requestId+"/references");
            const requestJson = await requestResponse.json();
            setReferences(requestJson); 

            const assetsResponse = await fetch("/api/requests/"+router.query.requestId+"/assets");
            const assetsJson = await assetsResponse.json();
            setAssets(assetsJson);
        }
    }

    const handleReferenceUpload = async (event) =>{
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('newImage', file);
    
      fetch('/api/requests/'+router.query.requestId+"/newreference", {
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
      const [alreadyReviewed, setAlreadyReviewed] = React.useState(true);

      const handleReviewChange = (event) => {
        setReview(event.target.value);
      }

      const handleRatingChange = async (event) => {
        var rating = event.target.value;
        var response = await fetch('/api/requests/'+request.id+'/review', {
          method:"PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            rating: rating,
            message: review
          })
        });
        if(response.ok){
          router.reload();
        }
        else{
          alert("Could not submit review!")
        }
      }
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
                      <Tooltip title="This is the message sent in with the request explaining what the customer wants.">
                        <TextField
                            multiline={true}
                            rows={10}
                            fullWidth
                            value={request.message}
                            disabled
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Grid container>
                            <Grid item xs={12} md={1}>
                              <input
                                  id="uploadInput"
                                  style={{ display: 'none' }}
                                  accept="image/*"
                                  type="file"
                                  onChange={handleReferenceUpload}
                                  disabled={request.declined || request.accepted}
                              />
                              <label htmlFor="uploadInput">
                                <Tooltip arrow title="Upload a new reference image.">
                                  <IconButton disabled={request.declined || request.accepted} component="span" color="info"><UploadBoxOutline sx={{fontSize:"2rem"}} /></IconButton>
                                </Tooltip>
                              </label>
                            </Grid>
                            <Grid item xs={12} md={11}>
                            {request.accepted ? (
                                <Alert sx={{width:"100%"}} severity="warning">You can no longer upload reference images, request is accepted!</Alert>
                            ):(
                              (references.length > 0) ? (
                                <Alert severity="info">
                                  There is a maximum of 10 reference images per request.
                                </Alert>
                              ):(
                                <Alert sx={{width:"100%"}} severity="error">You need to add reference images to your request!</Alert>
                              )
                            )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <ImageList variant="masonry">
                            {(references.map((reference) => (
                              <ReferenceImage referenceId={reference.id} requestId={request.id}/>
                            )))}
                          </ImageList>
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
                              <Tooltip arrow title="Download all assets.">
                                <IconButton disabled={!request.completed} color="secondary"><Download/></IconButton>
                                </Tooltip>
                              <Tooltip arrow title="Pay for this request.">
                                <IconButton onClick={handlePay} disabled={!(request.accepted && !request.paid)} color="success"><ShoppingCartCheckoutIcon/></IconButton>
                              </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={2} direction="row">
                              {(request.declined ? (
                                <Tooltip title="The request has been declined.">
                                    <Chip icon={<AssignmentLateOutlined />} label="Declined" variant="outlined" color="error" />
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
                                <Tooltip title="The request has been paid for and your request is being worked on.">
                                    <Chip icon={<PriceCheckIcon />} label="Paid" variant="outlined" color="success" />
                                </Tooltip>
                              ):null)}
                              {(request.paid==false && request.accepted ? (
                                <Tooltip title="You have not paid for this request.">
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
                            <IconButton onClick={() => {router.push("/dashboard/requests")}} color="primary">
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
                              {request.completed ? (
                                <Alert sx={{width:"100%"}} severity="success">Your success is complete and you can access your assets below!</Alert>
                              ):(
                                <Alert sx={{width:"100%"}} severity="info">When your request is completed your assets will appear below!</Alert>
                              )}
                          </Grid>
                          {request.completed ? (
                            <Tooltip title={alreadyReviewed ? "You have already reviewed this request." : "Leave a review for this request now that it is completed!"}>
                            <Grid item xs={12} md={12}>
                              <Paper elevation={3} sx={{padding:"1%"}}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={9}>
                                  <TextField
                                      fullWidth
                                      focused
                                      placeholder='Leave a review...'
                                      value={review}
                                      variant="outlined"
                                      size="small"
                                      disabled={alreadyReviewed}
                                      onChange={handleReviewChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                  <Rating
                                    name="simple-controlled"
                                    size="large"
                                    value={rating}
                                    disabled={!review || alreadyReviewed}
                                    onChange={handleRatingChange}/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {request.completed ? (
                                      request.reviewed ? (
                                        <Alert sx={{width:"100%"}} severity="info">You have reviewed this request so others know the quality of this artists work!</Alert>
                                      ):(
                                        <Alert sx={{width:"100%"}} severity="warning">Please leave a review for this request so other users know the quality of this artists work!</Alert>
                                      )
                                    ): null}
                                </Grid>
                              </Grid>
                              </Paper>
                            </Grid>
                              </Tooltip>
                          ): null}
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
        <Typography variant="h6" component="h6" gutterBottom>
            Loading...
        </Typography>
        <Box sx={{paddingTop:"20%"}}></Box>
        <CircularProgress/>
    </>
  )}
</>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(RequestDetails);


