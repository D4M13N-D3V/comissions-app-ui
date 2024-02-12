import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import { fetchSellerPortfolio,getPortfolioUrl } from "../services/DiscoveryService";

import { CircularProgress } from '@mui/material';

import { IconButton } from '@mui/material';

const ArtistPortfolioImage = ({artistId,itemId}) => {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };
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
        <ImageListItem key={itemId }>
        <img
          srcSet={`${getPortfolioUrl(artistId,itemId)}`}
          src={`${getPortfolioUrl(artistId,itemId)}`}
          alt={itemId}
          loading="lazy"
          style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', backgroundColor:'grey' }}
          onLoad={handleImageLoaded}
        />
      </ImageListItem>)
}
export default ArtistPortfolioImage