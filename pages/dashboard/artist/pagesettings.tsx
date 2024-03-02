import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import EditableArtistPortfolio from "../../../components/dashboard/artist/editablePortfolio";
import ArtistPortfolio from "../../../components/dashboard/artist/portfolio";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Reviews from "../../../components/dashboard/artist/reviews";

const Profile = () => {

    const [profileData, setArtistData] = useState(null);
    const [description, setDescription] = useState("");
    const [guidelines, setGuidelines] = useState("");

    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const profileResponse = await fetch('/api/artist/profile');
        const sellerProfile = await profileResponse.json();
        setArtistData(sellerProfile);

        setDescription(sellerProfile["description"]);
        setGuidelines(sellerProfile["requestGuidelines"]);
        setLoading(false);
    }

    useEffect(() => {
        getData()
    }, []);
  
    const columns: GridColDef[] = [
        {
          field: 'message',
          headerName: 'Review',
          flex: 0.75
        },
        {
          field: 'rating',
          headerName: 'Rating',
          flex: 0.25,
          renderCell: (params: GridValueGetterParams) => (
            <Rating name="read-only" value={params.value} readOnly />
          ),
        },
      ];
      
      const rows = [
        {   id: 1,  message: 'Great work!', rating: 5 },
        {   id: 2,  message: 'BAD work!', rating: 1 },
        {   id: 3,  message: 'Okay work!', rating: 4 },
        {   id: 4,  message: 'Meh work!', rating: 2 },
        {   id: 5,  message: 'Great work!', rating: 5 },
        {   id: 6,  message: 'Mid work!', rating: 3 },
        {   id: 7,  message: 'HORRIBLE work!', rating: 1 },
      ];
      

  return (
    (loading) ? (
        <Box sx={{textAlign:"center", paddingTop:"20%"}}>
            <CircularProgress />
        </Box> 
    ):(

    <Grid container spacing={2}>
    <Grid item xs={12} md={12}>
        <Card>
        <CardMedia
            sx={{ height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}
            image="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-255379.jpg&fm=jpg"
            title="green iguana"
        >
            <Typography variant="h5" align="center"  gutterBottom>STORE HEADER</Typography>
        </CardMedia>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center" gutterBottom>BIOGRAPHY HEADER</Typography>
                                    <Typography variant="body2" align="center">
                                        {description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} textAlign={"center"}>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} md={12} >
                                            <Typography variant="h5" align="center" gutterBottom>GUIDELINES HEADER</Typography>
                                            <Typography variant="body2" align="center">
                                                {guidelines}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                            <Typography variant="caption" color={"error"} align="center" sx={{marginTop:"4%"}}>
                                                By clicking "Start New Request" you are agreeing to the terms above and to the terms of service.
                                            </Typography>
                                            <Typography variant="caption" color={"primary"} align="center" sx={{marginTop:"4%"}}>
                                                [TERMS OF SERVICE]
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                            <Button size="large" variant="contained" color="primary" sx={{marginTop:"2%"}}>Start New Request</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} md={12} >
                                            <Typography variant="h5" align="center" gutterBottom>REVIEWS HEADER</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                            {profileData!=null ? (
                                                <Reviews artistId={profileData["id"]}/>
                                            ):null}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} md={12} >
                                    <Typography variant="h5" align="center" gutterBottom>PORTFOLIO HEADER</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <Typography variant="body2" align="center">
                                        {profileData!=null ? (
                                            <ArtistPortfolio masonry={true} columns={3} artistId={profileData["id"]} />
                                        ):null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </CardContent>
        </Card>
    </Grid>
</Grid>
    )
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(Profile);


