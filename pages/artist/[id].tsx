import Layout from "../../components/OLd/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Grid, Card, CardContent, Typography, List, Button, CircularProgress, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import ArtistPortfolio from "../../components/artistPortfolio";


const SellerProfile = () => {
    const { user, isLoading } = useUser();
    const router = useRouter()
    const { id } = router.query 
    const [sellerData, setSellerData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    useEffect(() => {
      const getData = async () => {
        if(id){
          const response = await fetch('/api/discovery/artist/'+id);
          const data = await response.json();
          setSellerData(data);
          setLoading(false); // Once data is fetched, set loading to false
        }
      }
      getData();
    }, [id]);

    const [value, setValue] = useState(0);
    return (
      <Layout user={user} loading={isLoading}>
      {loading ? ( // Render loading indicator if loading is true
        <Box sx={{textAlign:"center", paddingTop:20}}>
          <Typography variant="h4" sx={{textAlign:"center"}}>
            Loading
          </Typography>
          <Box sx={{ paddingTop: 5 }} />
          <CircularProgress  />
          </Box>
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
                  {sellerData["name"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{height:250, overflowY: 'scroll'}}>
                <CardContent>
                  <Typography variant="h5" sx={{textAlign:"center"}}>
                  Biography
                  </Typography>
                  <Typography sx={{paddingTop:2, textAlign:"center"}}>
                    {sellerData["biography"]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{height:250, overflowY: 'scroll'}}>
                <CardContent sx={{textAlign:"center"}}>
                  <Grid item xs={12} md={12}>
                        <Typography variant="h5">
                        Social Media
                        </Typography>
                    <List
                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      aria-label="contacts"
                    >
                    </List>
                  </Grid> 
                  <Grid item xs={12} md={12}>             
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
            {user ? (
              <Button size="large" color="secondary" variant="contained" href={"/artist/"+id+"/request"}>
                Request Order
              </Button>
            ) : (
              <Tooltip title="Log in order to place a request.">
                <span>
                  <Button size="large" color="secondary" variant="contained" disabled>
                    Submit Request
                  </Button>
                </span>
              </Tooltip>
            )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <ArtistPortfolio artistId={id} />
            </Grid>
        </Grid>
        )}
      </Layout>
    );
  };
  
  export default SellerProfile;
