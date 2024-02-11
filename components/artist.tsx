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
import { useEffect, useState } from "react";
import { fetchSeller } from "../services/DiscoveryService";


import { IconButton } from '@mui/material';

const Artist = ({artistId}) => {
  const [sellerData, setSellerData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSeller(artistId);
      console.log(data)
      setSellerData(data);
    }
    getData();
  }, []);
    
    return (
      <Card color="primary" sx={{margin:5}}>
      <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Item>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Live from space album cover"
            />
          </Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>
            <Typography variant="h5" component="h2">
              {sellerData.name}
            </Typography>
            <Typography color="primary">
              {sellerData.averageRating ? `${sellerData.averageRating} Stars (${sellerData.reviewCount} Reviews)` : "No Reviews"}
            </Typography>
            <Typography variant="body2" component="p">
              {sellerData.biography}
            </Typography>
          </Item>
          
        </Grid>
        <Grid item xs={12} md={12}>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            View Portfolio
          </AccordionSummary>
          <AccordionDetails>
            <ArtistPortfolio artistId={artistId} />
          </AccordionDetails>
        </Accordion>
          <Item>
          </Item>
        </Grid>
      </Grid>   
      </CardContent>
      <CardActions>
      <IconButton color="primary" size="small"><AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>Profile</IconButton>
      <IconButton color="primary" size="small"><StarBorderOutlinedIcon></StarBorderOutlinedIcon>Reviews</IconButton>
      <IconButton color="primary" size="small"><ShoppingCartCheckoutOutlinedIcon></ShoppingCartCheckoutOutlinedIcon>Browse Services</IconButton>
      </CardActions>
    </Card>)
}
export default Artist