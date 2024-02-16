import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import { CircularProgress, ImageListItemBar } from '@mui/material';

import { IconButton } from '@mui/material';

const EditableArtistPortfolioImage = ({artistId,itemId,reload}) => {
  const [loaded, setLoaded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };
    

  const deleteButton = () => {
    setDeleting(true);
    fetch('/api/artist/portfolio/'+itemId+"/delete", {
      method: 'DELETE'
    }).then(response => {
          reload().then(data => {
          })
    })
  }

    return (
        <ImageListItem key={itemId } sx={{maxWidth:300, maxHeight:300, overflow:"hidden"}}>
        <img
          srcSet={process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${artistId}/Portfolio/${itemId}`}
          src={process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${artistId}/Portfolio/${itemId}`}
          alt={itemId}
          loading="lazy"
          style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', backgroundColor:'grey' }}
          onLoad={handleImageLoaded}
        />
        <ImageListItemBar
            actionIcon={
                <IconButton onClick={deleteButton} color="error" >
                    <DeleteIcon />
                </IconButton>
            }>
        </ImageListItemBar>
      </ImageListItem>)
}
export default EditableArtistPortfolioImage