import * as React from 'react';
import {ImageList, Box, Typography, CircularProgress} from '@mui/material';
import { useEffect, useState } from "react";
import ArtistPortfolioImage from './artistPortfolioImage';

const ArtistPortfolio = ({artistId}) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/discovery/artist/'+artistId+'/portfolio');
      const data = await response.json();
      setPortfolioData(data);
      setLoading(false);
    }
    (portfolioData)
    getData();
  }, []);
    return (
        (loading) ? (
          <Box sx={{textAlign:"center", paddingTop:20}}>
            <Typography variant="h4" sx={{textAlign:"center"}}>
              Loading
            </Typography>
          <CircularProgress sx={{paddingTop:5}} />
          </Box>
          ) : 
        (
          <ImageList  cols={2} rowHeight={200} sx={{maxHeight:400}}>
            {portfolioData.map((item) => (
              <ArtistPortfolioImage artistId={artistId} itemId={item.id} />
            ))}
          </ImageList>
        )
      )
}
export default ArtistPortfolio