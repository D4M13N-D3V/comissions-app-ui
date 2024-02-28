import * as React from 'react';
import {ImageList, Box, Typography, CircularProgress} from '@mui/material';
import { useEffect, useState } from "react";
import ArtistPortfolioImage from './artistPortfolioImage';

const ArtistPortfolio = ({masonry,columns,artistId}) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [profileId, setArtistId] = useState(artistId)
  const [loading, setLoading] = useState(true); // State for loading indicator
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/discovery/artist/'+profileId+'/portfolio');
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
            <ImageList variant='masonry' cols={columns}  sx={{  width:"100%" }}>
            {portfolioData.map((item) => (
              <ArtistPortfolioImage artistId={profileId} itemId={item.id} />
            ))}
          </ImageList>
          ):(
            <ImageList cols={columns}  sx={{  width:"100%" }}>
            {portfolioData.map((item) => (
                <ArtistPortfolioImage artistId={profileId} itemId={item.id} />
              ))}
            </ImageList>
          )
        )
      )
}
export default ArtistPortfolio