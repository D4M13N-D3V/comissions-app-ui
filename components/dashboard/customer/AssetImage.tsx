import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const AssetImage = ({ assetId, requestId }) => {
  const [loaded, setLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const url = "/api/requests/"+requestId+"/assets/"+assetId
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <ImageListItem key={assetId} onClick={() => setOpenDialog(true)}>
        <img
          srcSet={url}
          src={url}
          alt={assetId}
          loading="lazy"
          style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', backgroundColor: 'grey', cursor: 'pointer' }}
          onLoad={handleImageLoaded}
        />
      </ImageListItem>
      {/* Dialog for displaying full-screen image */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <img
            src={url}
            alt={assetId}
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AssetImage;
