import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import TextField from '@mui/material/TextField';
import ArtistPortfolio from "../../components/dashboard/artist/portfolio";
import { RouterNetwork } from "mdi-material-ui";
import { useRouter } from "next/router";    
import { profile } from "console";
import FileOpen from "@mui/icons-material/FileOpen";
import Reviews from "../../components/dashboard/artist/reviews";

const Profile = () => {

    const [profileData, setArtistData] = useState(null);
    const [description, setDescription] = useState("");
    const [guidelines, setGuidelines] = useState("");

    const [requestMessage, setRequestMessage] = useState("");
    const [requestPrice, setRequestPrice] = useState(100.00);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setFile(files); // Set files to state
    }


    const handleRequestMessageChange = (event) => {
        setRequestMessage(event.target.value);
    }

    const handleRequestPriceChange = (event) => {
        setRequestPrice(event.target.value);
    }


    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const submitRequest = async (payload) => {
    
        try {
            const requestResponse = await fetch('/api/box/newRequest', {
                method: 'POST',
                body: JSON.stringify({
                    artistId: profileData["id"],
                    message: payload.get('Message'),
                    amount: payload.get('Amount'),
                })
            });
            if (requestResponse.ok) {
                const requestResponseData = await requestResponse.json();
                router.push("/dashboard/requests/"+requestResponseData["id"]);
            } else {
                const errorData = await requestResponse.json();
                alert("Error submitting request: " + errorData.detail);
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            alert("Error submitting request. Please try again later.");
        }
    };
    
    const getData = async () => {
        if(router.query.artistName!=null){
            const profileResponse = await fetch('/api/discovery/artist/'+router.query.artistName);
            const sellerProfile = await profileResponse.json();
            setArtistData(sellerProfile);
    
            setDescription(sellerProfile["description"]);
            setGuidelines(sellerProfile["requestGuidelines"]);
        }
    }

    useEffect(() => {
        getData()
    }, [router.query.artistName]);
  

  return (
    <>
<Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        submitRequest(formData);
        handleClose();
      },
    }}
>
    <DialogTitle>New Request</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Please read the guidelines of submitting a request before you proceed. You can do that by closing this popup and looking at the page behind.
        </DialogContentText>
        <TextField
            autoFocus
            required
            margin="dense"
            id="Message"
            name="Message"
            label="Request Message"
            type="message"
            fullWidth
            variant="outlined"
            multiline
            rows={10}
            onChange={handleRequestMessageChange}
            value={requestMessage}
        />
        <CurrencyTextField  
            label="Amount"
            variant="standard"
            currencySymbol="$"
            name="Amount"
            outputFormat="number"
            decimalCharacter="."
            digitGroupSeparator=","
            fullWidth
            onChange={handleRequestPriceChange}
            value={requestPrice}    
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit Request</Button>
    </DialogActions>
</Dialog>

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
                                                <Button onClick={handleClickOpen} size="large" variant="contained" color="primary" sx={{marginTop:"2%"}}>Start New Request</Button>
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
    </>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(Profile);


