import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { CreditCard, Lock, MoneyRounded } from '@mui/icons-material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const items = [
  {
    icon: <VisibilityOffIcon />,
    title: 'Refund Policy/Artist Protection',
    description:
      'Payments are made upfront with no refunds. No delivery dates or unwanted communication with the artist. Any chargebacks can be disputed with evidence.',
  },
  {
    icon: <CreditCard />,
    title: 'Multiple Payment Platforms',
    description:
      'We support credit cards, google pay, and apple pay. More payment providers are coming soon. These are subject to change! All transactions on the platform show up as "Request.Box Request".',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Skeb-like System',
    description:
      'Requests are made with a message, reference material, and amount of money. Artists can accept or decline the request.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Payout Management',
    description:
      'Manage information about how you recieve your payments and view statistics about them in a user friendly dashboard',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable support',
    description:
      'Get support directly from the developers and other staff members in the community discord.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Small Business',
    description:
      'Software and its community is developed and maintained by its developer and founder.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Explore why our product stands out: we keep the artist in mind at all times, and we are always looking for ways to improve the platform.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
