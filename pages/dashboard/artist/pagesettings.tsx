import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Accordion, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input'
import { AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Slider from '@mui/material/Slider';
import ArtistPortfolio from '../../../components/Old/artistPortfolio';

const Profile = () => {

    const [profileData, setSellerProfileData] = useState(null);

    const [backgroundColor, setBackgroundColor] = useState('rgb(126, 115, 115)');

    const [headerColor, setHeaderColor] = useState('rgb(194, 187, 187)');
    const [headerIsImage, setHeaderImage] = useState(false);
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [headerText, setHeaderText] = useState('Shop');
    const [headerSize, setHeaderSize] = useState(5);
    const headerVariant = [
        'h6', // Size 1
        'h5', // Size 2
        'h4', // Size 3
        'h3', // Size 4
        'h2', // Size 5
        'h1', // Size 6
    ][headerSize - 1] || 'h6';


    const [bioColor, setBioColor] = useState('rgb(186, 186, 186)');
    const [bioBgColor, setBioBgColor] = useState('rgb(103, 97, 97)');
    const [bioHeaderColor, setBioHeaderColor] = useState('rgb(255, 255, 255)');
    const [bioHeaderIsImage, setBioHeaderImage] = useState(false);
    const [bioHeaderImageUrl, setBioHeaderImageUrl] = useState('');
    const [bioHeaderText, setBioHeaderText] = useState('Biography');
    const [bioHeaderSize, setBioHeaderSize] = useState(3);
    const [bioSize, setBioSize] = useState(1);
    const bioHeaderVariant = [
        'h6', // Size 1
        'h5', // Size 2
        'h4', // Size 3
        'h3', // Size 4
        'h2', // Size 5
        'h1', // Size 6
    ][bioHeaderSize - 1] || 'h6';
    const bioVariant = [
        'h6', // Size 1
        'h5', // Size 2
        'h4', // Size 3
        'h3', // Size 4
        'h2', // Size 5
        'h1', // Size 6
    ][bioSize - 1] || 'h6';

    const [portfolioBgColor, setPortfolioBgColor] = useState('rgb(78, 73, 73)');
    const [portfolioColumns, setPotrfolioColumns] = useState(2);
    const [portfolioWoven, setPortfolioWoven] = useState(true);     
    const [portfolioShouldScroll, setPortfolioShouldScroll] = useState(true);
    const [portfolioSize, setPortfolioSize] = useState(25);

    const getData = async () => {
      const profileResponse = await fetch('/api/artist/profile');
      const sellerProfile = await profileResponse.json();
      setSellerProfileData(sellerProfile);
    }

    useEffect(() => {
        getData()
    }, []);
  
    const handleBackgroundColorChange = (newValue) => {
        setBackgroundColor(newValue)
    }

    const handleHeaderTextChange = (e) => {
        setHeaderText(e.target.value)
    }

    const handleHeaderImageUrl = (e) => {
        setHeaderImageUrl(e.target.value)
    }
    const handleHeaderImageToggle = (e) => {
        setHeaderImage(e.target.checked)
    };

    const handleHeaderSize = (e, newValue) => {
        setHeaderSize(newValue)
    }

    const handleHeaderColorChange = (newValue) => {
        setHeaderColor(newValue)
    }



    const handleBioHeaderTextChange = (e) => {
        setBioHeaderText(e.target.value)
    }

    const handleBioHeaderImageUrl = (e) => {
        setBioHeaderImageUrl(e.target.value)
    }
    const handleBioHeaderImageToggle = (e) => {
        setBioHeaderImage(e.target.checked)
    };

    const handleBioHeaderSize = (e, newValue) => {
        setBioHeaderSize(newValue)
    }
    const handleBioSize = (e, newValue) => {
        setBioSize(newValue)
    }

    const handleBioHeaderColorChange = (newValue) => {
        setBioHeaderColor(newValue)
    }
    const handleBioColorChange = (newValue) => {
        setBioColor(newValue)
    }

    const handleBioBgColorChange = (newValue) => {
        setBioBgColor(newValue)
    }




    const handlePortfolioBgColor = (newValue) => {
        setPortfolioBgColor(newValue)
    }

    const handlePortfolioColumns = (e, newValue) => {
        setPotrfolioColumns(newValue)
    }
    const handlePortfolioWoven = (e) => {
        setPortfolioWoven(e.target.checked)
    };
    const handlePortfolioShouldScroll = (e) => {
        setPortfolioShouldScroll(e.target.checked)
        console.log(portfolioShouldScroll)
    };
    const handlePortfolioSize = (e, newValue) => {
        setPortfolioSize(newValue)
    }

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <Card >
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={9}>
                            <Typography variant="h6" >
                                Customize Your Page
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" size="large">
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                >
                                <Typography>Background</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput fullWidth value={backgroundColor} onChange={handleBackgroundColorChange} />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                >
                                <Typography>Header</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <TextField disabled={headerIsImage} variant="outlined" fullWidth label="Header Text" onChange={handleHeaderTextChange} value={headerText} size="small"></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <TextField variant="outlined" fullWidth label="Image Url" size="small" onChange={handleHeaderImageUrl}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Switch checked={headerIsImage} onChange={handleHeaderImageToggle} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput disabled={headerIsImage} label="Color" fullWidth value={headerColor} onChange={handleHeaderColorChange} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Typography variant="body1" >
                                                Text Size
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={9}>
                                            <Slider disabled={headerIsImage} value={headerSize} onChange={handleHeaderSize} aria-label="Size" defaultValue={6} step={1} marks min={1} max={6} />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                >
                                <Typography>Biography</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <TextField disabled={bioHeaderIsImage} variant="outlined" fullWidth label="Header Text" onChange={handleBioHeaderTextChange} value={bioHeaderText} size="small"></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <TextField variant="outlined" fullWidth label="Header Image Url" size="small" value={bioHeaderImageUrl} onChange={handleBioHeaderImageUrl}></TextField>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Switch checked={bioHeaderIsImage} onChange={handleBioHeaderImageToggle} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput disabled={bioHeaderIsImage} label="Header Text Color" fullWidth value={bioHeaderColor} onChange={handleBioHeaderColorChange} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput label="Background Color" fullWidth value={bioBgColor} onChange={handleBioBgColorChange} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput label="Text Color" fullWidth value={bioColor} onChange={handleBioColorChange} />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant="body1" >
                                                Header Size
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={7}> 
                                            <Slider disabled={bioHeaderIsImage}  value={bioHeaderSize} onChange={handleBioHeaderSize} aria-label="Size" defaultValue={6} step={1} marks min={1} max={6} />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant="body1" >
                                                Text Size
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={7}> 
                                            <Slider value={bioSize} onChange={handleBioSize} aria-label="Size" defaultValue={6} step={1} marks min={1} max={6} />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                >
                                <Typography>Portfolio</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <MuiColorInput label="Background Color" fullWidth value={portfolioBgColor} onChange={handlePortfolioBgColor} />
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <Typography variant="body1" >
                                                Masonry Layout Enabled
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={2 }>
                                            <Switch checked={portfolioWoven} onChange={handlePortfolioWoven} />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Typography variant="body1" >
                                                Columns
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={7}> 
                                            <Slider value={portfolioColumns} onChange={handlePortfolioColumns} aria-label="Size" defaultValue={6} step={1} marks min={1} max={5} />
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <Typography variant="body1" >
                                                Enable Scrolling
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={2 }>
                                            <Switch  checked={portfolioShouldScroll} onChange={handlePortfolioShouldScroll} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body1" >
                                                Max Size
                                            </Typography>   
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Slider disabled={!portfolioShouldScroll} value={portfolioSize} onChange={handlePortfolioSize} aria-label="Size" defaultValue={5} step={5} marks min={1} max={100} />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12} md={8}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Card sx={{backgroundColor:backgroundColor}}>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} sx={{textAlign:"center"}}>
                                    {(headerIsImage) ? (
                                        <img src={headerImageUrl} alt="Header Image"  />
                                    ) : (
                                        <Typography variant={headerVariant}  color={headerColor}>
                                            {headerText}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={12} sx={{textAlign:"center", marginTop:"2%"}}>
                                    <Card sx={{backgroundColor:bioBgColor}}>
                                        <CardContent>
                                            {(bioHeaderIsImage) ? (
                                            <img src={bioHeaderImageUrl} alt="Header Image"  />
                                            ) : (
                                                <Typography variant={bioHeaderVariant}  color={bioHeaderColor}>
                                                    {bioHeaderText}
                                                </Typography>
                                            )}              
                                            <Typography variant={bioVariant} color={bioColor} > {(profileData ? profileData["biography"]:null)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12} sx={{textAlign:"center", marginTop:"2%"}}>
                                    <Card sx={{backgroundColor:portfolioBgColor}}>
                                        {(portfolioShouldScroll)?(
                                            <CardContent sx={{height:`${portfolioSize}rem`, overflowY:"scroll",}}>
                                                {(profileData ? (
                                                    <ArtistPortfolio masonry={portfolioWoven} columns={portfolioColumns} artistId={profileData["id"]} />
                                                ):null)}
                                            </CardContent>
                                        ):(
                                            <CardContent >
                                                {(profileData ? (
                                                    <ArtistPortfolio masonry={portfolioWoven} columns={portfolioColumns} artistId={profileData["id"]} />
                                                ):null)}
                                            </CardContent>
                                        )}
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(Profile);
