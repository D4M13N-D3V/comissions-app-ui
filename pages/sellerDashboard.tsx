import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import { Grid, Button, Typography, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";




const SellerDashoard = (ctx) => {
  const { user, isLoading } = useUser();
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/sellers/profile');
      const sellerProfile = await response.json();
      setSellerData(sellerProfile);
      setLoading(false); // Once data is fetched, set loading to false
    }
    getData();
  }, []);
  return (
    <Layout user={user} loading={isLoading}>

    {(Object.keys(sellerData).length>0) ? (
      <><Grid container spacing={2} sx={{padding:4}}>
      <Grid container   sx={{textAlign:"center"}}>
        <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
          <Button color="primary" variant="contained" href="../">
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
          <Typography variant="h4">
            Seller Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
      </Grid>
    </Grid>
      <Grid container spacing={2} sx={{padding:4}}>
        <Grid container   sx={{textAlign:"center"}}>
          <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
          </Grid>
          <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
              TODO
          </Grid>
          <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
        </Grid>
      </Grid>
      </>
      
    ) : (
        <Grid container spacing={2} sx={{padding:4}}>
          <Grid container   sx={{textAlign:"center"}}>
            <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              <Button color="primary" variant="contained" href="../">
                Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
              <Typography variant="h4">
                <Button size="large" color="secondary" variant="contained">Request To Become Seller</Button>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              {/* <Button color="secondary" variant="contained" href="../">
                Save
              </Button> */}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
          </Grid>
        </Grid>
    )}
      </Layout>
  );
};

export default SellerDashoard;
