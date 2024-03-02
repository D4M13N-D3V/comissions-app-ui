// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from '../../core/components/card-statistics/card-stats-vertical'


// ** Styled Component Import
import ApexChartWrapper from '../../core/styles/libs/react-apexcharts'
import { Card, IconButton, TextField, Typography } from '@mui/material'
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Button from '@mui/material/Button'
import { CardContent } from '@mui/material'
import Onboarding from '../../components/dashboard/Onboarding'
import { useState } from 'react'
import { useEffect } from 'react'
import router from 'next/router'
import { isObject } from 'util'
import Orders from '../../components/dashboard/customer/orders'
import StatisticsCard from '../../views/dashboard/StatisticsCard'
import ArtistStats from '../../components/ArtistStats'
import { ArrowDownBox, BankTransfer, Cash, Clipboard, CubeOutline, StarOutline } from 'mdi-material-ui'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { Fullscreen, List, OpenInBrowser, Settings, WebAsset } from '@mui/icons-material'



const Dashboard = () => {
  const [userData , setUserData] = useState(null)
  const [profileData, setArtistData] = useState(null);
  const [requestData, setArtistRequestData] = useState(null);
  const [onboardData, setOnboardedData] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  const setOnboardingTrue = () => {
    setOnboarding(true);
  }

  const getData = async () => {
    const userResponse = await fetch('/api/me');
    const user = await userResponse.json();
    setUserData(user);
    const profileResponse = await fetch('/api/artist/profile');
    const sellerProfile = await profileResponse.json();
    setArtistData(sellerProfile);
    const statsResponse = await fetch('/api/artist/stats');
    const statsResponseData = await statsResponse.json();
    setStatsData(statsResponseData);
    const requestResponse = await fetch('/api/artist/request');
    const sellerRequest = await requestResponse.json();
    setArtistRequestData(sellerRequest);
    const onboardedResponse = await fetch('/api/artist/onboarded');
    const onboardedData = await onboardedResponse.json();
    setOnboardedData(onboardedData["onboarded"]);
    setTimeout(getData, 5000); // Poll every 5 seconds (adjust as needed)


    if(sellerRequest != null && Object.keys(sellerRequest).length>0){
      setOnboarding(true)
    }
    if(sellerProfile!=null && Object.keys(sellerProfile).length>0 && sellerRequest["accepted"]){
      ////console.log("Test")
      setOnboarded(true)
    }
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {(loading) ? (
        <Box sx={{textAlign:"center", paddingTop:"20%"}}>
          <CircularProgress />
        </Box>
      ):(


    <ApexChartWrapper>
    <Grid container spacing={6}>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={3} sx={{textAlign:"center"}}>
                <Typography variant="h5" gutterBottom>
                  Requests
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{textAlign:"center"}}>
              </Grid>
              <Grid item xs={12} md={5} sx={{textAlign:"right"}}>
                <Tooltip title="View all of your requests.">
                  <IconButton color="info" onClick={()=>{router.push("/dashboard/requests")}}><List/></IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={12} sx={{paddingTop:"2%"}}>
                <Orders />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

  
      {( onboarding==true && onboarded==false || onboardData==false ) ? ( 
      <Grid item xs={12} md={6}>
        <Onboarding />
      </Grid>
      ):(
        (onboarded && onboardData==true && onboarding) ? (
          <Grid item  xs={12} md={6}>
            <Card sx={{textAlign:"center", width:"100%"}}>
              <CardContent>
                <Grid spacing={3} container>
                  <Grid item xs={12} md={12} >
                    {(statsData!=null && isObject(statsData)) ? (<ArtistStats profileData={profileData} stats={statsData} />
                    ):(
                      null
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Tooltip title="View all of your reviews.">
                      <IconButton color="info" onClick={() => {router.push("/dashboard/artist/reviews")  }} size="large">
                        <StarOutline style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View all of your requests.">
                      <IconButton color="info" onClick={() => {router.push("/dashboard/artist/requests")  }} size="large">
                        <List  style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View your payouts and request related transactions.">
                      <IconButton color="success" onClick={() => { router.push("/dashboard/artist/payout") }} size="large">
                        <BankTransfer style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Tooltip title="Manage the settings of your artist account.">
                      <IconButton color="primary" onClick={() => { router.push("/dashboard/artist/artistsettings") }} size="large">
                        <Settings style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Manage the settings of your artist page.">
                      <IconButton color="primary" onClick={() => { router.push("/dashboard/artist/pagesettings") }} size="large">
                        <WebAsset style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Open your artist page.">
                      <IconButton color="primary" onClick={() => { router.push("/box/"+userData["displayName"]) }} size="large">
                        <OpenInBrowser style={{ fontSize: 64 }} />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <Card sx={{textAlign:"center", width:"100%"}}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Button color="primary" fullWidth variant="contained" onClick={setOnboardingTrue}>Become An Artist</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
      )}
    </Grid>
  </ApexChartWrapper>
      )}
    </>
  )
}

export default withPageAuthRequired(Dashboard)