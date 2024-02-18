import * as React from 'react';
import {ImageList, Box, Typography, CircularProgress} from '@mui/material';
import { useEffect, useState } from "react";
import ArtistPortfolioImage from './artistPortfolioImage';

const ArtistPortfolio = ({masonry,columns,artistId}) => {
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
            <Box sx={{paddingTop:"2%"}}/>
          <CircularProgress />
          </Box>
          ) : 
        (
          (masonry) ? (
          <ImageList variant="masonry" gap={8} cols={columns} sx={{overflowY:"scroll", maxWidth:"100%"}} >
            {portfolioData.map((item) => (
              <ArtistPortfolioImage artistId={artistId} itemId={item.id} />
            ))}
          </ImageList>
          ):(
            <ImageList gap={8} cols={columns} >
              {portfolioData.map((item) => (
                <ArtistPortfolioImage artistId={artistId} itemId={item.id} />
              ))}
            </ImageList>
          )
        )
      )
}
export default ArtistPortfolio