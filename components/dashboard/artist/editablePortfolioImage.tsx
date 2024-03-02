import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogContent, ImageList,ImageListItem, ImageListItemBar } from '@mui/material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from "react";

const EditableArtistPortfolioImage = ({ artistId, itemId, reload }) => {
  const [loaded, setLoaded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  const deleteButton = () => {
    setDeleting(true);
    fetch('/api/artist/portfolio/' + itemId + "/delete", {
      method: 'DELETE'
    }).then(response => {
      reload().then(data => {
      })
    })
  }

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
        <ImageListItemBar
          actionIcon={
            <IconButton onClick={deleteButton} color="error">
              <DeleteIcon />
            </IconButton>
          }>
        </ImageListItemBar>
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

export default EditableArtistPortfolioImage;
