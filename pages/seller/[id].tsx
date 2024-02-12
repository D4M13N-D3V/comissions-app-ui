import Layout from "../../components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Grid, Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Tabs, Tab, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { fetchSeller } from "../../services/DiscoveryService";
import ArtistPortfolio from "../../components/artistPortfolio";
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createData(
  serviceName: string,
  rating: number,
  review: string
) {
  return { serviceName, rating, review };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
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
                <Button color="primary" variant="contained" href="../">
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
                <Typography variant="h4">
                  {sellerData.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{height:250, overflowY: 'scroll'}}>
                <CardContent>
                  <Typography variant="h5" sx={{textAlign:"center"}}>
                  Biography
                  </Typography>
                  <Typography sx={{paddingTop:2, textAlign:"center"}}>
                    {sellerData.biography}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{height:250, overflowY: 'scroll'}}>
                <CardContent sx={{textAlign:"center"}}>
                  <Grid item xs={12} md={12}>
                        <Typography variant="h5">
                        Social Media
                        </Typography>
                    <List
                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      aria-label="contacts"
                    >
                    </List>
                  </Grid> 
                  <Grid item xs={12} md={12}>             
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign:"center"}} >
            {user ? (
              <Button size="large" color="secondary" variant="contained" href={"../order/"+id}>
                Request Order
              </Button>
            ) : (
              <Tooltip title="Log in order to place a request.">
                <span>
                  <Button size="large" color="secondary" variant="contained" disabled>
                    Request Order
                  </Button>
                </span>
              </Tooltip>
            )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <ArtistPortfolio artistId={id} />
            </Grid>
        </Grid>
        )}
      </Layout>
    );
  };
  
  export default SellerProfile;
