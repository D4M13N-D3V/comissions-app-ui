import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/layout";
import { Typography, Box, CircularProgress } from '@mui/material';
import Artist from "../components/artist";
import { useEffect, useState } from "react";

const Home = () => {
  const [sellersData, setSellersData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/discovery/artists');
      const data = await response.json();
      setSellersData(data);
      setLoading(false);
    }
    getData();
  }, []);
  const { user, isLoading } = useUser();
  return (
    <Layout user={user} loading={isLoading}>
      {loading ? ( // Render loading indicator if loading is true
        <Box sx={{textAlign:"center", paddingTop:20}}>
          <Typography variant="h4" sx={{textAlign:"center"}}>
            Loading...
          </Typography>
        <CircularProgress sx={{paddingTop:5}} />
        </Box>
      ) : (
        <>
          {sellersData.map((item) => (
            <Artist user={user} artistId={item.id} />
          ))}
        </>
      )}
    </Layout>
  );
};

// fast/cached SSR page
export default Home;