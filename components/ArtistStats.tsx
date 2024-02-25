// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// ** Types
import { ThemeColor } from '../core/layouts/types'
import { Person } from '@mui/icons-material'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const salesData: DataType[] = [
  {
    stats: '0',
    title: 'Pending',
    color: 'secondary',
    icon: <Person sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0',
    title: 'Accepted',
    color: 'info',
    icon: <CompareArrowsIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0',
    color: 'error',
    title: 'Declined',
    icon: <CompareArrowsIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0',
    color: 'success',
    title: 'Completed',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const ArtistStats = ({profileData, stats}) => {
  return (
    <Card>
      <CardHeader
        title='Artist Statistics'
        subheader={
          <>
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              You have earned ${stats["revenue"]}
            </Box>{' '}
            😎 from {stats["paidRequests"]} requests.
          </Typography>
          <Typography variant='body2'>
              You have <b>{stats["pendingRequests"]}</b> pending requests.
          </Typography>
          </>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `error.main`
                }}
              >
                <Person sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Declined</Typography>
                <Typography variant='h6'>{stats["declinedRequests"]}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `info.main`
                }}
              >
                <Person sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Accepted</Typography>
                <Typography variant='h6'>{stats["acceptedRequests"]}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.light`
                }}
              >
                <Person sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Paid For</Typography>
                <Typography variant='h6'>{stats["completedRequests"]}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.dark`
                }}
              >
                <Person sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Completed</Typography>
                <Typography variant='h6'>{stats["completedRequests"]}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArtistStats
