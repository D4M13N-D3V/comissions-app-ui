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
import ArtistRequest from "../../../components/dashboard/admin/artistRequest";

const ArtistRequests = () => {
  const {user, isLoading} = useUser();
  const [artistRequestData, setArtistRequestData] = useState(null);
  const getData = () => {
    fetch('/api/admin/requests').then(response => response.json().then(data => setArtistRequestData(data)))
  } 
  useEffect(() => {
      getData()
  }, []);
  return (
    <Grid container spacing={2}>
        {(artistRequestData != null && Object.keys(artistRequestData).length>0) ? (
            (artistRequestData.map((request) => {

                let formattedTime = "";
                if (artistRequestData) {
                    const date = new Date(request["requestDate"]);
                    formattedTime = date.toLocaleTimeString('en-US', { 
                        month: 'long', 
                        day: '2-digit', 
                        year: 'numeric', 
                        hour12: true, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    }); // Example format  
  }
                return (
                    <ArtistRequest userid={request["userId"]} id={request["id"]} username={""} message={request["message"]} date={formattedTime}  reload={getData} />
                )
            }
            ))  
        ):(<Typography>No requests</Typography>)}
    </Grid>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(ArtistRequests);
