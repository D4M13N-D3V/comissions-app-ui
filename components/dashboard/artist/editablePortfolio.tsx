import * as React from 'react';
import { useEffect, useState } from "react";
import { Grid, ImageList, Box, Tooltip, CircularProgress, Slider, IconButton } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import EditableArtistPortfolioImage from './editablePortfolioImage';

const EditableArtistPortfolio = ({ artistId }) => {
    const [portfolioData, setPortfolioData] = useState([]);
    const [columns, setColumns] = useState(2);
    const [loading, setLoading] = useState(true); // State for loading indicator
    useEffect(() => {
        getData();
    }, []);

    const handleColumns = (event, value)=>{
        setColumns(value);
    }

    const getData = async () => {
        const response = await fetch('/api/discovery/artist/' + artistId + '/portfolio');
        const data = await response.json();
        setPortfolioData(data);
        setLoading(false);
    }
    
    function handlePortfolioUploadImageChange(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('newImage', file);
      
        fetch('/api/artist/portfolio', {
          method: 'POST',
          body: formData // Don't set Content-Type, FormData will handle it
        })
        .then(response => response.json())
        .then(data => {
          getData();
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error appropriately
        });
      }
      
    return (
        (loading) ? (
            <Box sx={{ textAlign: "center", paddingTop: 20 }}>
                <CircularProgress sx={{ paddingTop: 5 }} />
            </Box>
        ) :
            (
                
                <Grid container spacing={2} sm={12}>
                <Grid item xs={12} sm={1} sx={{ textAlign: "center" }}>
                    <input
                        id="portfolioUploadInput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        type="file"
                        onChange={handlePortfolioUploadImageChange}
                    />
                    <label htmlFor="portfolioUploadInput">
                        <Tooltip arrow title="Upload Image To Portfolio">
                            <IconButton color="primary" component="span">
                                <FileUpload sx={{fontSize:"2rem"}}/>
                            </IconButton>
                        </Tooltip>
                    </label>
                </Grid>
                    <Grid item xs={12} sm={11} sx={{ textAlign: "center" }}>
                        <Tooltip arrow title="Amount of columns">
                        <Slider
                            defaultValue={columns}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            onChange={handleColumns}
                            step={1}
                            marks
                            min={1}
                            max={5}/>
                            </Tooltip>

                    </Grid> 
                    <Grid item xs={12} sm={12} sx={{maxHeight:"45rem",overflowY:"scroll"}}>
                        <ImageList variant='masonry' cols={columns}  sx={{  width:"100%" }}>
                            {portfolioData.map((item) => (
                                <EditableArtistPortfolioImage artistId={artistId} itemId={item.id} reload={getData}/>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            
            )
    )
}
export default EditableArtistPortfolio