import * as React from 'react';
import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const ArtistOnboardRequest = () => {
    const [sellerRequestData, setArtistRequestData] = useState(null);
  
    const getData = async () => {
      const response = await fetch('/api/artist/request');
      const sellerProfile = response.ok ? await response.json() : null;
      setArtistRequestData(sellerProfile && sellerProfile.id ? sellerProfile : null);
    }
    useEffect(() => {
      getData();
    }, []);

    let formattedTime = ""
    if (sellerRequestData && sellerRequestData["requestDate"]) {
      const date = new Date(sellerRequestData["requestDate"]);
      if (!isNaN(date.getTime()))
        formattedTime = date.toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    return (
        (sellerRequestData ? (
        
          <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography variant="h5" gutterBottom>
              Request Status
              </Typography>
              {(sellerRequestData["accepted"] ? (
              <Typography variant="body2" color="text.warning" component="div">Accepted</Typography>
              ) : (
              <Typography variant="h6" color="text.warning" component="div">Pending</Typography>
              ))}
              <Typography variant="body2" color="text.secondary" component="div">Request submitted on {formattedTime ?? ''}</Typography>
          </CardContent>
          </Card>) : (

        <Box sx={{textAlign:"center", paddingTop:"5%"}}>
        <Typography variant="h4" sx={{textAlign:"center"}}>
          Loading
        </Typography>
        <Box sx={{ paddingTop: 5 }} />
        <CircularProgress  />
      </Box>
        ))
    )
        }
export default ArtistOnboardRequest