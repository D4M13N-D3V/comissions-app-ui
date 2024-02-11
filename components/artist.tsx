import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';

const Artist = ({artistId}) => {
    return (
    <ImageListItem key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">
    <img
      srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x`}
      src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format`}
      alt={"Neroshi"}
      loading="lazy"
    />
    <ImageListItemBar
      title={artistId}
      subtitle={"0 Stars (0 Reviews)"}
      actionIcon={
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={`info`}
        >
          <InfoIcon />
        </IconButton>
      }
    />
  </ImageListItem>)
}
export default Artist