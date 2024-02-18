import { useUser,withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditableArtistPortfolio from "../../../components/Old/editableArtistPortfolio";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

const ArtistSettings = () => {
  const {user, isLoading} = useUser();
  const [profileData, setSellerProfileData] = useState(null);
  const getData = async () => {
    const profileResponse = await fetch('/api/artist/profile');
    const sellerProfile = await profileResponse.json();
    setSellerProfileData(sellerProfile);
  }

  useEffect(() => {
      getData()
  }, []);
  return (
    <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>General Settings</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Button variant="contained" color="success" fullWidth>Save Changes</Button>   
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Grid container spacing={2} sx={{paddingTop:"2%"}}>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Shop Name" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" multiline rows={7} size="small" label="Shop Description" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Grid container spacing={2} sx={{paddingTop:"2%"}}>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 1" type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 2" type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 3" type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 4" type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" multiline rows={5} size="small" label="Your request guidelines" variant="outlined" fullWidth />
                            </Grid> 
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
        <Grid item xs={12} md={6}>
            <Card id="portfolio">
                <CardContent>
                    {(profileData != null) ? (
                    <EditableArtistPortfolio artistId={profileData["id"]}/>):null}
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(ArtistSettings);
