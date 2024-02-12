import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import { fetchSellerPortfolio,getPortfolioUrl } from "../services/DiscoveryService";


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
          <ImageListItem key={item.id}>
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