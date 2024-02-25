// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';


// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from '../../../core/context/settingsContext'

// ** Components
import ModeToggler from '../../../core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '../../../core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from '../../../core/layouts/components/shared-components/NotificationDropdown'
import { useEffect, useState } from 'react'
interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [profileData, setProfileData] = useState(null);

  const getData = async () => {
    const artistProfileRequest = await fetch('/api/me', { method: "GET" });
    const artistProfileResponse = await artistProfileRequest.json();
    setProfileData(artistProfileResponse);  
  }
  
  //console.log(profileData)
  useEffect(() => {
    getData();
  }, []);  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {(profileData ? (
        <NovuProvider subscriberId={profileData["id"]} applicationIdentifier={'9SKjzgN_odAF'}>
          <PopoverNotificationCenter colorScheme={'light'}>
            {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
          </PopoverNotificationCenter>
        </NovuProvider>
        ):null)}
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
