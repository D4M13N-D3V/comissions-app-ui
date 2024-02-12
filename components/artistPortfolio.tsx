import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import { fetchSellerPortfolio,getPortfolioUrl } from "../services/DiscoveryService";
import ArtistPortfolioImage from './artistPortfolioImage';


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
          <ArtistPortfolioImage artistId={artistId} itemId={item.id} />
        ))}
      </ImageList>)
}
export default ArtistPortfolio