import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const ArtistPortfolioImage = ({ artistId, itemId }) => {
  const [loaded, setLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <ImageListItem key={itemId} onClick={() => setOpenDialog(true)}>
        <img
          srcSet={process.env.NEXT_PUBLIC_API_URL + `/api/Discovery/Artists/${artistId}/Portfolio/${itemId}`}
          src={process.env.NEXT_PUBLIC_API_URL + `/api/Discovery/Artists/${artistId}/Portfolio/${itemId}`}
          alt={itemId}
          loading="lazy"
          style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', backgroundColor: 'grey', cursor: 'pointer' }}
          onLoad={handleImageLoaded}
        />
      </ImageListItem>
      {/* Dialog for displaying full-screen image */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <img
            src={process.env.NEXT_PUBLIC_API_URL + `/api/Discovery/Artists/${artistId}/Portfolio/${itemId}`}
            alt={itemId}
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ArtistPortfolioImage;
