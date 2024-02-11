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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import { fetchSeller,fetchSellerPortfolio,getPortfolioUrl } from "../services/DiscoveryService";


import { IconButton } from '@mui/material';

const ArtistPortfolio = ({artistId}) => {
  const [portfolioData, setPortfolioData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSellerPortfolio(artistId);
      console.log(data)
      setPortfolioData(data);
    }
    getData();
  }, []);
    
    return (
      
        <ImageList  cols={2} rowHeight={200} sx={{maxHeight:400}}>
        {portfolioData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${getPortfolioUrl(artistId,item.id)}`}
              src={`${getPortfolioUrl(artistId,item.id)}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>)
}
export default ArtistPortfolio