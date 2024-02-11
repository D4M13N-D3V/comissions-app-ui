import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/layout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import Chip from "@mui/material/Chip";
import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "../types";
import Artist from "../components/artist";


const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    right: 0,
    textAlign: "center"
  },
  "& .MuiInputLabel-shrink": {
    margin: "0 auto",
    position: "absolute",
    right: "0",
    left: "0",
    top: "-3px",
    width: "150px", // Need to give it a width so the positioning will work
    background: "white" // Add a white background as below we remove the legend that had the background so text is not meshing with the border
    // display: "none" //if you want to hide it completly
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& legend ": {
      display: "none"
    }
  }
});


const Home = () => {
  const { user, isLoading } = useUser();
  const fetcher = Fetcher.for<paths>()
  fetcher.configure({
    baseUrl: 'https://localhost.7148',
    init: {
      headers: {
  
      },
    }
  })

  return (
    <Layout user={user} loading={isLoading}>
      <>
      
        { user ? (
          <>
        <Box sx={{ m: 1 }} />
          <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
            <Button color="primary" fullWidth>Your Orders</Button>
            <Button color="secondary" fullWidth>Seller Dashboard</Button>
          </ButtonGroup>
          </>
        ): (
          <Typography variant="h2" component="h2" textAlign="center">COMISSIONS.APP</Typography>
        )}  
        <Box sx={{ m: 2 }} />
        <StyledTextField    inputRef={input => input && input.focus()} sx={{input: {textAlign: "center"}}} fullWidth color="secondary" label="SEARCH ARTISTS" variant="outlined" />
        <Box sx={{ m: 4 }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip.label}
            color="primary"
            variant={chip.outlined ? 'outlined' : 'default'}
            onClick={() => console.log(`Clicked on ${chip.label}`)}
            style={{ margin: '0 5px' }}
          />
        ))}
      </div>


    <ImageList sx={{ flex:1 }}>
      {itemData.map((item) => (
        <Artist artistId="1" />
      ))}
    </ImageList>
      </>
    </Layout>
  );
};

// fast/cached SSR page
export default Home;


const chips = [
  { label: 'Category', outlined: true },
  { label: 'Category', outlined: false },
  { label: 'Category', outlined: true },
  { label: 'Category', outlined: false },
  { label: 'Category', outlined: true },
  { label: 'Category', outlined: false },
  { label: 'Category', outlined: true },
  { label: 'Category', outlined: false },
];


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Neroshi',
    author: '0 Stars (0 Reviews)',
  },
];