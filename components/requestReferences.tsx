import * as React from 'react';
import {useEffect } from "react";
import { ImageList, ImageListItem } from '@mui/material';

export default function RequestReferences({id}) {
  const [open, setOpen] = React.useState(false);
  const [refrences, setReferences] = React.useState([]);

  const getData = async () => {
    const response = await fetch('/api/requests/'  + id + '/references');
    const references = await response.json();
    setReferences(references);
  
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (<ImageList>
    {refrences.map((item) => (
        <ImageListItem>
            <img src={item.url} alt={item.title} />
        </ImageListItem>
    ))}
  </ImageList>
  );
}