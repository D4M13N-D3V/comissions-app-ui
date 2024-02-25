import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as React from 'react';


const ArtistSettings = () => {
    const { user, isLoading } = useUser();
    const [appUser, setAppUser] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [biography, setBiography] = useState("");
    const [saved, setSaved] = useState(false);

    const [loading, setLoading] = useState(true);


    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
    }
    const handleBiographyChange = (event) => {
        setBiography(event.target.value);
    }

    const saveChanges = async () => {

        var userResponse = await fetch('/api/me',{
            method: 'PUT',
            body: JSON.stringify({displayName: displayName, biography: biography})
        });
        var user = await userResponse.json();   
        setSaved(true);
    }

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        var userResponse = await fetch('/api/me');
        var user = await userResponse.json();
        setDisplayName(user["displayName"])
        setBiography(user["biography"])
        setAppUser(user);
        setLoading(false);
    }
    return (
    <>
        {(loading) ? (
           <Box sx={{textAlign:"center"}}>
                <CircularProgress />
           </Box> 
        ):(
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Grid container item md={12}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h5" gutterBottom>General Settings</Typography>
                            </Grid>
                            <Grid item xs={12} md={4} >
                                {(saved) ? (
                                    <Button variant="contained" color="success" fullWidth onClick={saveChanges}>Saved</Button>
                                ):(
                                    <Button variant="contained" color="success" fullWidth onClick={saveChanges}>Save Changes</Button>
                                )}
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ paddingTop: "2%" }}>
                                <TextField id="outlined-basic" label="Display Name" onChange={handleDisplayNameChange} variant="outlined" fullWidth value={displayName} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        )}
    </>
    );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(ArtistSettings);
