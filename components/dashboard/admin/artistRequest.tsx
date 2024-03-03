import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useUser,withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";



export default function AdminArtistRequest({id,userid,username,message,date,reload}) {


  useEffect(() => {
    getData()
  } 
  , []);

  const getData = async () => {

  }

  const handleAccept = () => {
    fetch("/api/admin/requests/"+userid, {method:"PUT"}).then(response => response.json().then(data => {
      reload();
    }));
  }
  const handleDeny = () => {
    fetch("/api/admin/requests/"+userid, {method:"DELETE"}).then(response => response.json().then(data => {
      reload();
    }))
  }
  return (
    <Grid item xs={12} md={4}>
        <Card>
            <CardContent>
                <Typography>ID: {id}</Typography>
                <Typography>User: {username}</Typography>
                <Typography>Message</Typography>
                <Typography>{message}</Typography>
                <Typography>Submitted Date {date}</Typography>
                <Button variant="contained" onClick={handleAccept} color="primary">Accept</Button>
                <Button variant="contained" onClick={handleDeny} color="secondary">Reject</Button>
            </CardContent>
        </Card>
    </Grid>
  );
}
