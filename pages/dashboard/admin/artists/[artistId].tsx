import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Alert, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ArrowBack, ArrowLeft, Block, Close } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { OpenInNew } from 'mdi-material-ui';
import Tooltip from '@mui/material/Tooltip';

const AdminArtist = () => {
    const router = useRouter();


    const [artist, setArtist] = useState(null);

    const getData = async () => {
        if(router.query.artistId!=null){
            const response = await fetch("/api/admin/artists/"+router.query.artistId);
            const data = await response.json();
            setArtist(data);
        }
    }
  

    useEffect(() => {
        getData()
    }, [router.query.artistId]);

    return (
        <>
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h5">Artist Information</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:"right"}}>
                        <Tooltip title="Ban this artist.">
                            <IconButton color="error">
                                <Block/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Suspend this artist.">
                            <IconButton color="warning">
                                <Close/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Go back a page.">
                            <IconButton onClick={() => router.push("/dashboard/admin/artists")} color="primary">
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}  md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        Display Name: {artist?.user?.displayName}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Email: {artist?.user?.email}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Save Changes</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <TextField size="small" label="Admin Notes" multiline rows={4} fullWidth variant="outlined" value={artist?.userId} />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={artist?.numberOfBans > 0 ? "error" : "success"}>{artist?.numberOfBans > 0 ? "This user has been banned "+artist?.numberOfBans+" times." : "This user has not been banned before."}</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={artist?.numberOfSuspensions > 0 ? "error" : "success"}>{artist?.numberOfBans > 0 ? "This user has been suspended "+artist?.numberOfSuspensions+" times." : "This user has not been suspended before."}</Alert>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Alert severity="success">This artist has made ${artist?.amountMade}, and we have made ${artist?.feesCollected} in fees.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={artist?.numberOfRequests > 0 ? "success" : "warning"}>This artist has accepted {artist?.numberOfRequests} requests.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={artist?.numberOfCompleted > 0 ? "success" : "warning"}>This artist has completed {artist?.numberOfCompleted} requests.</Alert>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(AdminArtist);


