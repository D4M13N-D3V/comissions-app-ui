import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import ArtistDashboardRequest from '../components/OLd/artistDashboardRequest';
import ArtistPortfolio from '../components/OLd/artistPortfolio';
import EditableArtistPortfolio from '../components/OLd/editableArtistPortfolio';
import { useEffect, useState } from "react";

import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import {Card, CardContent, CardHeader, Divider } from '@mui/material';


const steps = [
  {
    label: 'Request Access As Artist',
    description: `In order to start selling your art on our platform, you need to request access. Please include links to your social media and tag or DM us on the platform (@RequestDotBox). We may reach out for further verification and examples of your work.`,
  },
  {
    label: 'Onboard On Stripe',
    description:
      'Our platform uses Stripe as a payment processor. You will be required to onboard with them with all of your payout information and business information.',
  },
  {
    label: 'Setup Your Portfolio',
    description: `This is where you can setup your initial portfolio. You can upload any image format file to your portfolio. It will be automatically displayed on your artist page. You can add and remove from this later.`,
  },
  {
    label: 'Configure Your Artist Page',
    description: `Every artist gets their own public facing page that they can send to anyone or post anywhere. You have full control over the colors, logos, and more of this page.`,
  },
];

export default function onboarding() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sellerRequestData, setArtistRequestData] = React.useState(null);
  const [profileData, setArtistData] = React.useState(null);
  const [isStripeOnboarded, setIsStripeOnboarded] = React.useState(false);
  const [onBoardUrl, setOnBoardUrl] = React.useState("");



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getData = async () => {
    const onboardCheckRequest = await fetch('/api/artist/onboarded', { method: "GET" });
    const onboardCheckResponse = await onboardCheckRequest.json();
    setIsStripeOnboarded(onboardCheckResponse["onboarded"]);
    const onboardUrlRequest = await fetch('/api/artist/onboardurl', { method: "GET" });
    const onboardUrlResponse = await onboardUrlRequest.json();
    setOnBoardUrl(onboardUrlResponse["onboardUrl"]);
    const response = await fetch('/api/artist/request');
    const sellerRequest = await response.json();
    setArtistRequestData(sellerRequest);
    const profileResponse = await fetch('/api/artist/profile');
    const sellerProfile = await profileResponse.json();
    setArtistData(sellerProfile);

    setTimeout(getData, 5000); // Poll every 5 seconds (adjust as needed)
  }
  React.useEffect(() => {
    getData();
  }, []);

  const requestButton = () => {
    fetch('/api/artist/newRequest').then((response) => {
      if (response.ok) {
        fetch('/api/artist/request').then((requestResponse) => {
          requestResponse.json().then((sellerRequest) => {
            setArtistRequestData(sellerRequest);
          });
        });
      }
    });
  }

  let formattedTime = ""
  if (sellerRequestData) {
    const date = new Date(sellerRequestData["requestDate"]);
    formattedTime = date.toLocaleTimeString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); // Example format  
  }

  if(activeStep==4){
    window.location.href="/dashboard"
  }

  return (
    <Card sx={{ width:"100%", padding:"2%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            {(index==0) ? (
                <StepContent>
                    <Grid container >
                        <Grid item xs={12} lg={6}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                        </Grid>
                        {(sellerRequestData && Object.keys(sellerRequestData).length>0) ? (
                            <Grid item xs={12} lg={6} sx={{paddingTop:"2%"}}>
                                <ArtistDashboardRequest/>
                            </Grid>
                        ):(
                            <Grid item xs={12} lg={6}>
                                <TextField fullWidth rows={4} multiline label="Application Message" variant="outlined" />
                            </Grid>
                        )}
                    </Grid>
                    <Box sx={{ mb: 2 ,paddingTop:"2%"}}>
                        <div>
                            {(sellerRequestData && Object.keys(sellerRequestData).length>0) ? (
                                (sellerRequestData["accepted"]) ? (
                                        <Button variant="contained" onClick={handleNext}>
                                            Continue
                                        </Button>
                                    ) : (

                                        <Button variant="contained" disabled>
                                            Request Pending
                                        </Button>                                )
                            ):
                            (

                                <Button
                                variant="contained"
                                onClick={requestButton}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Request Access
                            </Button>
                            )}
                        </div>
                    </Box>
                </StepContent>
            ): null}
            {(index==1) ? (
                <StepContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                    </Grid>
                <Box sx={{ mb: 2 }}>
                    <div>
                    {isStripeOnboarded==true ? (
                        <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Continue
                    </Button>
                    ):(

                        <Button
                        color='success'
                            variant="contained"
                            href={onBoardUrl}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            ONBOARD WITH STRIPE
                        </Button>
                    )}
                    </div>
                </Box>
                </StepContent>
            ): null}
            {(index==2) ? (
                <StepContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <EditableArtistPortfolio artistId={profileData ? profileData["id"] : null}/>
                        </Grid>
                    </Grid>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    </div>
                </Box>
                </StepContent>
            ): null}
            {(index==3) ? (
                <StepContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>

                        </Grid>
                        <Grid container sx={{paddingTop:"50px"}}>
                            <Grid item xs={12} lg={2}>
                            </Grid>
                            <Grid item xs={12} lg={8}>
                                <Card elevation={5}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center"}}>
                                                <Typography variant="h5" gutterBottom>
                                                   Artist Name
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center", paddingTop:"2%"}}>

                                                <Typography variant="h6" gutterBottom>
                                                   Biography
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center"}}>

                                                <Typography variant="body1" gutterBottom>
                                                    TAwehtwaehrewaoioirewaoihroiewahroiewahriewaohroiewahroiweahroiewahrhweaoirhewaiorhewaoirhewaoirhewaoirhweah
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center", paddingTop:"2%"}}>
                                                <Typography variant="h6" gutterBottom>
                                                   Portfolio
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center"}}>
                                                <ArtistPortfolio artistId={profileData ? profileData["id"] : null}/>
                                            </Grid>                                                <Divider/>           
                                            <Divider/>     
                                            <Grid item xs={12} lg={12} sx={{textAlign:"center", paddingTop:"2%"}}>
                                                <Typography variant="h6" gutterBottom>
                                                   Requests
                                                </Typography>
                                            </Grid>
                                            <Grid container sx={{textAlign:"center"}}>
                                                <Grid item xs={12} lg={6} sx={{textAlign:"center", paddingTop:"2%"}}>
                                                   
                                                    <TextField fullWidth disabled multiline rows={8} sx={{padding:"2%"}} label="Request Guidelines" value="These are the terms of your requests.">
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} lg={6} sx={{textAlign:"center", paddingTop:"2%"}}>
                                                   
                                                   <TextField fullWidth multiline rows={4} sx={{padding:"2%"}} label="Your Request Terms">
                                                   </TextField>
                                                    
                                                    <CurrencyTextField
                                                        label="Offer Amount"
                                                        variant="standard"
                                                        value={0}
                                                        currencySymbol="USD "
                                                        //minimumValue="0"
                                                        outputFormat="string"
                                                        
                                                        decimalCharacter="."
                                                        digitGroupSeparator=","/>
                                                   <Button color="primary" variant="contained" sx={{paddingTop:"2%"}}>Submit</Button>
                                                </Grid>
                                            </Grid>        
                                            <Divider/>           

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} lg={2}>
                            </Grid>
                        </Grid>
                    </Grid>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    </div>
                </Box>
                </StepContent>
            ): null}
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Card>
  );
}