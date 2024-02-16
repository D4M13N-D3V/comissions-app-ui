import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from "../components/layout";
import { Grid, Button, Typography, TextField, Box, CircularProgress, IconButton } from "@mui/material";
import { useState, useEffect,useRef } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import SwipeableViews from '../components/swipableView';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import EditableArtistPortfolio from "../components/editableArtistPortfolio";
import Popover from '@mui/material/Popover';
import ArtistDashboardRequest from "../components/artistDashboardRequest";





const SellerDashoard = (ctx) => {
  const { user, isLoading } = useUser();
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onBoardUrl, setOnBoardUrl] = useState("");
  const [tabValue, setTabValue] = useState(1);

  const getData = async () => {
    const response = await fetch('/api/artist/profile');
    const sellerProfile = await response.json();
    setSellerData(sellerProfile);
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
    { field: 'amount', headerName: 'Amount', width: 50 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {

        const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const buttonRef = useRef(null);

        const accept = (e) => {
          return alert("TEST");
        };

        const decline = (e) => {
          return alert("TEST");
        };

        const handleClick = (e) => {
          setAnchorEl(e.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };
        console.log(params)
        return (
          <>
          <Button ref={buttonRef} startIcon={<ThumbsUpDownIcon/>} color="success" onClick={handleClick}></Button>
          <Popover
            id={params["requestor"]+"-"+params["amount"]}
            open={open}
            anchorEl={buttonRef.current}
            onClose={handleClose}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Button size="small" color="success" variant="contained" onClick={accept}>Accept</Button>
            <Button size="small" color="error" variant="contained" onClick={decline}>Decline</Button>
          </Popover>
          </>
        )
      }
    }
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
          <Grid container >
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
                <ArtistDashboardRequest/>
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
