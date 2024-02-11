import { useUser } from "@auth0/nextjs-auth0/client";
import { GetAccessToken } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import Artist from "../components/artist";
import { useEffect, useState } from "react";
import { fetchSellers } from "../services/DiscoveryService";




//API CODE FOR DISCOVERY







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
  const [sellersData, setSellersData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSellers();
      setSellersData(data);
    }
    getData();
  }, []);

  const { user, isLoading } = useUser();

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

        {sellersData.map((item) => (
          <Artist artistId={item.id} />
        ))}
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