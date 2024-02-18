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

  const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [social1, setSocial1] = useState("");
    const [social2, setSocial2] = useState("");
    const [social3, setSocial3] = useState("");
    const [social4, setSocial4] = useState("");
    const [guidelines, setGuidelines] = useState("");
    const [saved, setSaved] = useState(false);

  const [profileData, setSellerProfileData] = useState(null);

  const handleDisplayNameChange = (event) => {
    setName(event.target.value);
  }
const handleBiographyChange = (event) => {
    setDescription(event.target.value);
}
const handleSocial1Change = (event) => {
    setSocial1(event.target.value);
}
const handleSocial2Change = (event) => {
    setSocial2(event.target.value);
}
const handleSocial3Change = (event) => {
    setSocial3(event.target.value);
}
const handleSocial4Change = (event) => {
    setSocial4(event.target.value);
}
const handleGuidelinesChange = (event) => {
    setGuidelines(event.target.value);
}

const saveChanges = async () => {
    var userResponse = await fetch('/api/artist/profile',{
        method: 'PUT',
        body: JSON.stringify({name: name, description: description, socialMeidaLink1: social1, socialMeidaLink2: social2, socialMeidaLink3: social3, socialMeidaLink4: social4, requestGuidelines: guidelines})
    });
    var user = await userResponse.json();
    setSaved(true)
}

  const getData = async () => {
    const profileResponse = await fetch('/api/artist/profile');
    const sellerProfile = await profileResponse.json();
    setDescription(sellerProfile["description"]);
    setName(sellerProfile["name"]);
    setSocial1(sellerProfile["socialMeidaLink1"]);
    setSocial2(sellerProfile["socialMeidaLink2"]);
    setSocial3(sellerProfile["socialMeidaLink3"]);
    setSocial4(sellerProfile["socialMeidaLink4"]);
    setGuidelines(sellerProfile["requestGuidelines"]);
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
                        <Button variant="contained" onClick={saveChanges} color="success" fullWidth>{saved ? "Saved" : "Save Changes"}</Button>   
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Grid container spacing={2} sx={{paddingTop:"2%"}}>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Shop Name" value={name} onChange={handleDisplayNameChange} size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" multiline rows={7} value={description} onChange={handleBiographyChange} size="small" label="Shop Description" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Grid container spacing={2} sx={{paddingTop:"2%"}}>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 1" value={social1} onChange={handleSocial1Change} type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 2" value={social2} onChange={handleSocial2Change} type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 3" value={social3} onChange={handleSocial3Change} type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" label="Social Media 4" value={social4} onChange={handleSocial4Change} type="url" size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                                <TextField id="outlined-basic" multiline rows={5} size="small" label="Your request guidelines" value={guidelines} onChange={handleGuidelinesChange} variant="outlined" fullWidth />
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
