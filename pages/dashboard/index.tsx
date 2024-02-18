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
import { Card, Typography } from '@mui/material'
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Button from '@mui/material/Button'
import { CardContent } from '@mui/material'
import Onboarding from '../../components/Onboarding'
import { useState } from 'react'
import { useEffect } from 'react'
import { isObject } from 'util'
import Orders from '../../components/Orders'



const Dashboard = () => {
  const [profileData, setSellerProfileData] = useState(null);
  const [requestData, setSellerRequestData] = useState(null);
  const [onboardData, setOnboardedData] = useState(false);

  const [onboarding, setOnboarding] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  const setOnboardingTrue = () => {
    setOnboarding(true);
  }

  const getData = async () => {
    const profileResponse = await fetch('/api/artist/profile');
    const sellerProfile = await profileResponse.json();
    setSellerProfileData(sellerProfile);
    const requestResponse = await fetch('/api/artist/request');
    const sellerRequest = await requestResponse.json();
    setSellerRequestData(sellerRequest);
    const onboardedResponse = await fetch('/api/artist/onboarded');
    const onboardedData = await onboardedResponse.json();
    setOnboardedData(onboardedData["onboarded"]);
    setTimeout(getData, 5000); // Poll every 5 seconds (adjust as needed)


    if(sellerRequest != null && Object.keys(sellerRequest).length>0){
      setOnboarding(true)
    }
    if(sellerProfile!=null && Object.keys(sellerProfile).length>0 && sellerRequest["accepted"]){
      setOnboarded(true)
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (

    <ApexChartWrapper>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={12} sx={{textAlign:"center"}}>
                  <Typography variant="h5" gutterBottom>
                    My Orders
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Orders />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

    
        {( onboarding==true && onboardData==false ) ? ( 
        <Grid item xs={12} md={6}>
          <Onboarding />
        </Grid>
        ):(
          (onboarding) ? (
            <Grid item xs={12} md={6}>
              <Card sx={{textAlign:"center", width:"100%"}}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Button color="secondary" sx={{width:"90%"}} variant="contained">Manage Portfolio</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button color="primary" href="/dashboard/artist/pagesettings" fullWidth sx={{width:"90%"}} variant="contained">Design Store Page</Button>
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
  )
}

export default withPageAuthRequired(Dashboard)