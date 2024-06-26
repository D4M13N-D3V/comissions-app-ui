import { useUser,withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { CardHeader, Grid, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import Button from '@mui/material/Button';
import { OpenInNew } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const Payout = () => {
  const {user, isLoading} = useUser();
  const [loading, setLoading] = useState(true);
  const [payoutData, setPayoutData] = useState(null);
  const getData = async () => {
    var payoutResponse = await fetch('/api/artist/payout');
    var payoutData = await payoutResponse.json();
    setPayoutData(payoutData);
    setLoading(false);
  } 
  useEffect(() => {
      getData()
  }, []);
  return (
    <>
    {(loading) ? (
        <Box sx={{textAlign:"center", paddingTop:"20%"}}>
            <CircularProgress />
        </Box>
    ):(

    <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
        <Card>
            <CardHeader title="Payout Settings" action ={<Tooltip title="Open Stripe dashboard"><IconButton  href={payoutData ? payoutData["payoutUrl"] : ""} target="_blank"   color="info"><OpenInNew/></IconButton></Tooltip>}/>
            <CardContent>
                <Grid container spacing={2}>    
                    <Grid item xs={12} md={6}>
                        <CurrencyTextField fullWidth label="Current Balance" size="large" disabled variant="standard" currencySymbol="$" outputFormat="string" decimalCharacter="." digitGroupSeparator="," value={payoutData ? payoutData["balance"] : ""} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CurrencyTextField fullWidth label="Pending Balance" size="large" disabled variant="standard" currencySymbol="$" outputFormat="string" decimalCharacter="." digitGroupSeparator="," value={payoutData ? payoutData["pendingBalance"] : ""} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
</Grid>
    )}
    </>
  );
};

// Protected route, checking user authentication client-side.(CSR)
export default withPageAuthRequired(Payout);
