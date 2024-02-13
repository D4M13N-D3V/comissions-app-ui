import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";

import { CircularProgress } from '@mui/material';

import { IconButton } from '@mui/material';

const ArtistPortfolioImage = ({artistId,itemId}) => {
  const [loaded, setLoaded] = useState(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };
    
    return (
        <ImageListItem key={itemId }>
        <img
          srcSet={process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${artistId}/Portfolio/${itemId}`}
          src={process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${artistId}/Portfolio/${itemId}`}
          alt={itemId}
          loading="lazy"
          style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', backgroundColor:'grey' }}
          onLoad={handleImageLoaded}
        />
      </ImageListItem>)
}
export default ArtistPortfolioImage