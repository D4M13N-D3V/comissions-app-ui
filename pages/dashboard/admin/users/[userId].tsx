import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Alert, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ArrowBack, ArrowLeft, Block, Close } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { OpenInNew } from 'mdi-material-ui';
import Tooltip from '@mui/material/Tooltip';

const AdminUser = () => {
    const router = useRouter();


    const [user, setUser] = useState(null);

    const getData = async () => {
        if(router.query.userId!=null){
            const response = await fetch("/api/admin/users/"+router.query.userId);
            const data = await response.json();
            setUser(data);
        }
    }
  

    useEffect(() => {
        getData()
    }, [router.query.userId]);

    return (
        <>
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h5">User Information</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:"right"}}>
                        <Tooltip title="Ban this user.">
                            <IconButton color="error">
                                <Block/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Suspend this user.">
                            <IconButton color="warning">
                                <Close/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Go back a page.">
                            <IconButton onClick={() => router.push("/dashboard/admin/users")} color="primary">
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}  md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        Display Name: {user?.displayName}
                                    </Grid>
                                    <Grid item xs={12}>
                                        Email: {user?.email}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>Save Changes</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <TextField size="small" label="Admin Notes" multiline rows={4} fullWidth variant="outlined" value={user?.userId} />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={user?.numberOfBans > 0 ? "error" : "success"}>{user?.numberOfBans > 0 ? "This user has been banned "+user?.numberOfBans+" times." : "This user has not been banned before."}</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={user?.numberOfSuspensions > 0 ? "error" : "success"}>{user?.numberOfBans > 0 ? "This user has been suspended "+user?.numberOfSuspensions+" times." : "This user has not been suspended before."}</Alert>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Alert severity={user?.numberOfRequests > 0 ? "success" : "warning"}>This user has opened {user?.numberOfRequests} requests.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={user?.amountSpent > 0 ? "success" : "warning"}>This user has paid {user?.amountSpent} for {user?.numberOfPaid} requests.</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Alert severity={user?.numberOfReviews > 0 ? "success" : "warning"}>This user has left {user?.numberOfReviews} reviews on completed requests.</Alert>
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
export default withPageAuthRequired(AdminUser);


