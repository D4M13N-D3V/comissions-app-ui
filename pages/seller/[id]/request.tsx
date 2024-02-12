import Layout from "../../../components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Grid, Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Tabs, Tab, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { fetchSeller } from "../../../services/DiscoveryService";
import ArtistPortfolio from "../../../components/artistPortfolio";
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from "@mui/material";
import CurrencyTextField from '@lupus-ai/mui-currency-textfield'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SellerProfile = () => {
    const { user, isLoading } = useUser();
    const router = useRouter()
    const { id } = router.query 
    console.log(router.query)
    const [sellerData, setSellerData] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    useEffect(() => {
      const getData = async () => {
        if(id){
          const data = await fetchSeller(id);
          setSellerData(data);
          setLoading(false); // Once data is fetched, set loading to false
        }
      }
      getData();
    }, [id]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [value, setValue] = useState(0);
    return (
      <Layout user={user} loading={isLoading}>
      {loading ? ( // Render loading indicator if loading is true
        <Box sx={{textAlign:"center", paddingTop:20}}>
          <Typography variant="h4" sx={{textAlign:"center"}}>
            Loading...
          </Typography>
        <CircularProgress sx={{paddingTop:5}} />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{padding:4}}>
            <Grid container   sx={{textAlign:"center"}}>
              <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
                <Button color="primary" variant="contained" href={"../"+id}>
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
                <Typography variant="h4">
                  New Request
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={12} sx={{textAlign:"center"}} >
            {user ? (
              <>

              <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
                <TextField fullWidth disabled id="fo" label="Artist" variant="outlined" value={sellerData.name}/>
                <Box sx={{padding:2}} />  
                <TextField id="outlined-multiline-static" label="Request Details" fullWidth multiline rows={4} defaultValue="" placeholder="Put the details of your request. Links to reference images. Descriptions of what you want. Things like that."/>
                <Box sx={{padding:2}} />  
                </Grid>
              <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
                <Button>
                  <input type="file" multiple />
                </Button>
              </Grid>
                <Box sx={{padding:2}} />  
              <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
                <CurrencyTextField
                    label="Offer Amount"
                    variant="standard"
                    value={value}
                    currencySymbol="USD "
                    //minimumValue="0"
                    outputFormat="string"
                    
                    decimalCharacter="."
                    digitGroupSeparator=","
                    onChange={(event, value)=> setValue(value)}/>
              
              </Grid>
                <Box sx={{padding:2}} />  
              <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
                <Button color="secondary" variant="contained" >
                  Submit Request
                </Button>
              </Grid>
              </>
            ) : (
              <>
              <Typography>
                Please login to place a request.
              </Typography>
              <Button color="primary" variant="contained" href="/api/auth/login">
                Login
              </Button>
              </>
            )}
            </Grid>
        </Grid>
        )}
      </Layout>
    );
  };
  
  export default SellerProfile;
