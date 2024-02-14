import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from "../components/layout";
import { Grid, Button, Typography, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import SwipeableViews from '../components/swipableView';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';





const SellerDashoard = (ctx) => {
  const { user, isLoading } = useUser();
  const [sellerRequestData, setSellerRequestData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const requestSeller = () => {
    const response = fetch('/api/seller/request', {
      method: 'POST'
    }).then((response) => { 
      console.log(response);
    });
  }
  
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
    const getData = async () => {
      const response = await fetch('/api/seller/profile');
      const sellerProfile = await response.json();
      console.log(sellerProfile)
      setSellerData(sellerProfile);
      const requestResponse = await fetch('/api/seller/request', {method:"POST"});
      const sellerRequest = await response.json();
      setSellerData(sellerProfile);
      setLoading(false); // Once data is fetched, set loading to false
    }
    getData();
  }, []);
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: 'requestor', headerName: 'User', width: 150 },
    { field: 'message', headerName: 'Message', width: 280 },
    { field: 'amount', headerName: 'Amount', width:125 },
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


  return (
      <Layout user={user} loading={isLoading}>
        <Grid container spacing={2} sx={{padding:4}}>
          <Grid item container   sx={{textAlign:"center"}}>
            <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
              <Button color="primary" variant="contained" href="../">
                Back
              </Button>
            </Grid>
            <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
              <Typography variant="h4">
                Seller Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
            <Button color="secondary" variant="contained" href="../">
                Save
              </Button>
            </Grid>
          </Grid>

          <Grid item container xs={12} sm={12}>
            <Grid item xs={12} sm={12}>
              <TextField variant="filled" fullWidth label="Artist Name" />
              <Box sx={{padding:1}} />
              <TextField variant="outlined" fullWidth multiline rows={4} label="Biography"  />
              <Box sx={{padding:1}} />
            </Grid>
            <Grid item xs={12} sm={12} sx={{textAlign:"center"}}>
              <Button sx={{width:"50%"}} color="success" variant="contained">Payout Portal</Button>
            </Grid>
          </Grid>

          <Grid item container xs={12} sm={12}>

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
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
            sx={{width: '100%'}}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={tabValue} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>
          </Grid>
        </Grid>
      </Layout>
  );
};

export default SellerDashoard;
