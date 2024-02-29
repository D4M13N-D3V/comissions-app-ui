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
import ArtistDashboardRequest from './artistDashboardRequest';
import ArtistPortfolio from '../components/artistPortfolio';
import EditableArtistPortfolio from '../components/editableArtistPortfolio';
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
];

export default function Onboarding() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sellerRequestData, setArtistRequestData] = React.useState(null);
  const [profileData, setArtistData] = React.useState(null);
  const [isStripeOnboarded, setIsStripeOnboarded] = React.useState(false);
  const [onBoardUrl, setOnBoardUrl] = React.useState("");

  const [requestMessage, setRequestMessage] = React.useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleRequestMessage = (event) => {
    setRequestMessage(event.target.value);
  }

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
    setArtistData(sellerProfile); // Poll every 5 seconds (adjust as needed)
  }
  React.useEffect(() => {
    getData();

    setTimeout(getData, 30000);
  }, []);

  const requestButton = () => {
    fetch('/api/artist/newRequest', {headers:{ "Content-Header":"application/json"},method:"POST",body:JSON.stringify(requestMessage)}).then((response) => {
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

  return (
    <Card sx={{ width:"100%", padding:"2%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            {(index==0) ? (
                <StepContent>
                    <Grid container >
                        <Grid item xs={12} lg={12}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                        {(sellerRequestData && Object.keys(sellerRequestData).length>0) ? (
                            <Grid item xs={12} lg={12} sx={{paddingTop:"2%"}}>
                                <ArtistDashboardRequest/>
                            </Grid>
                        ):(
                            <Grid item xs={12} lg={12}>
                                <TextField value={requestMessage} onChange={handleRequestMessage} fullWidth rows={4} multiline label="Application Message" variant="outlined" />
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
                        <Grid item xs={12} lg={12}>
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
                        <Grid item xs={12} lg={12}>
                            <Typography>{step.description}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
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
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>We are setting up your account please wait.</Typography>
        </Paper>
      )}
    </Card>
  );
}