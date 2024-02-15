import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from "../components/layout";
import { Grid, Button, Typography, TextField, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import SwipeableViews from '../components/swipableView';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import EditableArtistPortfolio from "../components/editableArtistPortfolio";





const SellerDashoard = (ctx) => {
  const { user, isLoading } = useUser();
  const [sellerRequestData, setSellerRequestData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onBoardUrl, setOnBoardUrl] = useState("");

  const [tabValue, setTabValue] = useState(1);

  const getData = async () => {
    const response = await fetch('/api/artist/profile');
    const sellerProfile = await response.json();
    setSellerData(sellerProfile);
    const requestResponse = await fetch('/api/artist/request', { method: "GET" });
    const sellerRequest = await requestResponse.json();
    setSellerRequestData(sellerRequest);
    const onboardCheckRequest = await fetch('/api/artist/onboarded', { method: "GET" });
    const onboardCheckResponse = await onboardCheckRequest.json();
    setIsOnboarded(onboardCheckResponse["onboarded"]);
    const onboardUrlRequest = await fetch('/api/artist/onboardurl', { method: "GET" });
    const onboardUrlResponse = await onboardUrlRequest.json();
    setOnBoardUrl(onboardUrlResponse["onboardUrl"]);
  
    setLoading(false); // Once data is fetched, set loading to false
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


  useEffect(() => {
    getData();
  }, []);
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'requestor', headerName: 'User', width: 150 },
    { field: 'message', headerName: 'Message', width: 280 },
    { field: 'amount', headerName: 'Amount', width: 125 },
  ];
  const rows = [
    { id: 1, requestor: 'Snow', message: 'This is a test message!', amount: 35.00 },
    { id: 2, requestor: 'Lannister', message: 'This is a test message!', amount: 42.00 },
    { id: 3, requestor: 'Lannister', message: 'This is a test message!', amount: 45.00 },
    { id: 4, requestor: 'Stark', message: 'This is a test message!', amount: 16.00 },
    { id: 5, requestor: 'Targaryen', message: 'This is a test message!', amount: 150.00 },
    { id: 6, requestor: 'Melisandre', message: "This is a test message!", amount: 150.00 },
    { id: 7, requestor: 'Clifford', message: 'This is a test message!', amount: 44.00 },
    { id: 8, requestor: 'Frances', message: 'This is a test message!', amount: 36.00 },
    { id: 9, requestor: 'Roxie', message: 'This is a test message!', amount: 65.00 },
  ];


  let formattedTime = ""
  if (sellerRequestData) {
    const date = new Date(sellerRequestData["requestDate"]);
    formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format  
  }

  const payoutButton = () =>{
    fetch('/api/artist/payout').then((response) => {
      if (response.ok) {
        fetch('/api/artist/request').then((requestResponse) => {
          requestResponse.json().then((sellerRequest) => {
            setSellerRequestData(sellerRequest);
          });
        });
      }
    });
  }

  const requestButton = () => {
    fetch('/api/artist/newRequest').then((response) => {
      if (response.ok) {
        fetch('/api/artist/request').then((requestResponse) => {
          requestResponse.json().then((sellerRequest) => {
            setSellerRequestData(sellerRequest);
            getData();
          });
        });
      }
    });
  }

  return (
    <>
      {loading ? ( // Render loading indicator if loading is true
        <Box sx={{ textAlign: "center", paddingTop: 20 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Loading
          </Typography>
          <Box sx={{ paddingTop: 5 }} />
          <CircularProgress  />
        </Box>
      ) : (
        <Layout user={user} loading={isLoading}>
          <Grid container spacing={2} sx={{ padding: 4 }}>

            {(Object.keys(sellerData).length > 0 ? (
              <>
                <Grid item container sx={{ textAlign: "center" }}>
                  <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
                    <Button color="primary" variant="contained" href="../">
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={8} sx={{ textAlign: "center" }}>
                    <Typography variant="h4">
                      Artist Dashboard
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
                  </Grid>
                </Grid>
                {(Object.keys(sellerRequestData).length > 0 ? (
                  <>
                    <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                      <Card sx={{ minWidth: 275, paddingTop: 2 }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Request Status
                          </Typography>
                          {(sellerRequestData["accepted"] ? (
                            <Typography variant="body2" color="text.warning" component="div">Accepted</Typography>
                          ) : (
                            <Typography variant="h6" color="text.warning" component="div">Pending</Typography>
                          ))}
                          <Typography variant="body2" color="text.secondary" component="div">Request submitted on {formattedTime ?? ''}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button color="primary" href="https://discord.gg/SAGBA3uTEF" target="_blank" size="small">Contact Us On Discord</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {(sellerRequestData["accepted"] ? (
                        <>
  
                          {(isOnboarded ? (<>
                            <Button sx={{ width: "50%" }} color="primary" variant="contained" href={onBoardUrl}>Payout Settings</Button>
                            <Button sx={{ width: "50%" }} color="secondary" variant="contained">Payout Portal</Button>
                            </>
                          ) : (
                            <>
                            <Button sx={{ width: "50%" }} href={onBoardUrl} color="secondary" variant="contained">Payout Onboarding</Button>
                            <Button sx={{ width: "50%" }} color="secondary" variant="contained" disabled>Payout Portal</Button>
                            </>
                          ))}
                          

                          <Grid item container xs={12} sm={12} sx={{paddingTop:2}}>

                            <AppBar position="static">
                              <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                              >
                                <Tab label="New Requests" {...a11yProps(0)} />
                                <Tab label="Portfolio" {...a11yProps(1)} />
                                <Tab label="Ongoing Requests" {...a11yProps(2)} />
                              </Tabs>
                            </AppBar>
                            <SwipeableViews
                              index={tabValue}
                              onChangeIndex={handleChangeIndex}
                            >
                              <TabPanel value={tabValue} index={0} dir={theme.direction}>
                                <DataGrid
                                  rows={rows}
                                  columns={columns}
                                  initialState={{
                                    pagination: {
                                      paginationModel: { page: 0, pageSize: 5 },
                                    },
                                  }}
                                  pageSizeOptions={[5, 10]}
                                  sx={{ width: '100%' }}
                                />
                              </TabPanel>
                              <TabPanel value={tabValue} index={1} dir={theme.direction}  >
                                <EditableArtistPortfolio artistId={sellerData["id"]}></EditableArtistPortfolio>
                              </TabPanel>
                              <TabPanel value={tabValue} index={2} dir={theme.direction}>
                                Item Three
                              </TabPanel>
                            </SwipeableViews>
                          </Grid>
                        </>
                      ) : (
<></>                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                      {(Object.keys(sellerRequestData).length==0 || sellerRequestData["accepted"]==false ? (<><Button sx={{ width: "50%" }} color="secondary" onClick={requestButton} variant="contained">Request Artist Access</Button></>):(<></>))}
                    </Grid>
                  </>
                ))}
              </>

            ) : (
              <></>
            ))}
            <Grid item container xs={12} sm={12}>
            </Grid>
          </Grid>
        </Layout>)}
    </>
  );
};

export default SellerDashoard;
