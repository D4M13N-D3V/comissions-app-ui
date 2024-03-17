import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Alert, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { OpenInNew } from 'mdi-material-ui';
import Tooltip from '@mui/material/Tooltip';
import { ArrowBack } from '@mui/icons-material';


const AdminRequest = () => {
    const router = useRouter();

    const [request, setRequest] = useState(null);

    
    const getData = async () => {
        if(router.query.requestId!=null){
            const response = await fetch("/api/admin/requests/"+router.query.requestId);
            const data = await response.json();
            setRequest(data);
        }
    }
  
    const handleAccept = async () => {
        var response = await fetch("/api/admin/requests/"+router.query.requestId, {method:"PUT"})
        if(response.ok){
            var data = await response.json();
            router.reload();
        }
        else{
            alert("Failed to accept request.")
        }
    }
    const handleDeny = async () => {
        var response = await fetch("/api/admin/requests/"+router.query.requestId, {method:"DELETE"})
        if(response.ok){
            var data = await response.json();
            router.reload();
        }
        else{
            alert("Failed to deny request.")
        }
    }

    useEffect(() => {
        getData()
    }, [router.query.requestId]);

    let formattedTime = ""
    const date = new Date(request?.requestDate);  
    formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format
    return (
    <>
    <Card>
        <CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5">{router.query.requestId} - Artist Access Request</Typography>
                </Grid>
                    <Grid item xs={6} sx={{textAlign:"right"}}>
                        <Tooltip title="Go back a page.">
                            <IconButton onClick={() => router.push("/dashboard/admin/requests")} color="primary">
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert severity="info">Submitted on {formattedTime}</Alert>
                        </Grid>
                        {request?.accepted ? (
                            <Grid item xs={12}>
                                <Alert severity="success">This artist access request has been accepted.</Alert>
                            </Grid>
                        ):(
                            <Grid item xs={12}>
                                <Alert severity="warning">Pending review from platform administrator.</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                fullWidth
                                value={request?.message}
                                disabled>
                                    {request?.message}
                                </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button fullWidth disabled={request?.accepted} variant="contained" onClick={handleAccept} color="primary">Accept</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button fullWidth disabled={request?.accepted} variant="contained" onClick={handleDeny} color="secondary">Reject</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </CardContent>
    </Card>
    </>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(AdminRequest);


