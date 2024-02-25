import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArtistPortfolio from './artistPortfolio';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";


import { IconButton } from '@mui/material';

const Artist = ({user, artistId}) => {
  const [sellerData, setArtistData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/discovery/artist/'+artistId);
      const data = await response.json();
      setArtistData(data);
    }
    getData();
  }, []);
    
    return (
      <Card color="primary" sx={{margin:5}}>
      <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>
            <Typography variant="h5" component="h2">
              {sellerData["name"]}
            </Typography>
            <Typography color="primary">
              {sellerData["averageRating"] ? `${sellerData["averageRating"]} Stars (${sellerData["reviewCount"]} Reviews)` : "No Reviews"}
            </Typography>
            <Typography variant="body2" component="p">
              {sellerData["biography"]}
            </Typography>
          </Item>
          
        </Grid>
        <Grid item xs={6} md={4}>
          <Grid item xs={6} md={4}>
            <Button href={"artist/"+artistId} color="primary" variant='contained' sx={{width:160}}>View Profile</Button>
              {user ? (
                <Button color="secondary" variant='contained' href={"/artist/"+artistId+"/request"} sx={{ width: 160, marginTop:2 }}>Submit Request</Button>
              ) : (
                <Tooltip title="Log in order to place a request.">
                  <span>
                    <Button disabled color="secondary" variant='contained' sx={{ width: 160, marginTop:2 }}>Submit Request</Button>
                  </span>
                </Tooltip>
              )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>

          <Item>
          </Item>
        </Grid>
      </Grid>   
      </CardContent>
    </Card>)
}
export default Artist