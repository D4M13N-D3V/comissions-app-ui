// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ListIcon from '@mui/icons-material/List';
// ** Type import
import { VerticalNavItemsType } from '../../core/layouts/types'
import { BankTransfer, Cart, Clipboard, PageFirst, StarOutline } from 'mdi-material-ui'
import { DocumentScanner, FileOpen, OpenInBrowser, Settings, WebAsset } from '@mui/icons-material'
import { useState, useEffect } from 'react'

const navigation = (): VerticalNavItemsType => {
  const [isStripeOnboarded, setIsStripeOnboarded] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);

  const getData = async () => {
    
    const onboardCheckRequest = await fetch('/api/artist/onboarded', { method: "GET" });
    const onboardCheckResponse = await onboardCheckRequest.json();
    setIsStripeOnboarded(onboardCheckResponse["onboarded"]);
    
    const artistProfileRequest = await fetch('/api/artist/profile', { method: "GET" });
    const artistProfileResponse = await artistProfileRequest.json();
    setProfileData(artistProfileResponse);  
    
    const userRequest = await fetch('/api/me', { method: "GET" });
    const userResponse = await userRequest.json();
    setUserData(userResponse);  
    ////console.log(roleResponse)
  }

  useEffect(() => {
    getData();
  }, []);

  var result = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Admin'
    },
    {
      title: 'Artist Requests',
      icon: Clipboard,
      path: '/dashboard/admin/requests'
    },
    {
      sectionTitle: 'General'
    },
    {
      title: 'Account Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
    {
      title: 'Your Requests',
      icon: ListIcon,
      path: '/dashboard/requests'
    }
  ];

  if (isStripeOnboarded) {
    result.push(
      {
        sectionTitle: 'Artist'
      },
      {
        title: 'Request Reviews',
        icon: StarOutline,
        path: '/dashboard/artist/reviews'
      },
      {
        title: 'Incoming Requests',
        icon: ListIcon,
        path: '/dashboard/artist/requests'
      },
      {
        title: 'Payments/Payouts',
        icon: BankTransfer,
        path: '/dashboard/artist/payout'
      },
      {
        title: 'Artist Settings',
        icon: Settings,
        path: '/dashboard/artist/artistsettings'
      },
      {
        title: 'Page Settings',
        icon: WebAsset,
        path: '/dashboard/artist/pagesettings'
      },
      {
        title: 'Your Page',
        icon: OpenInBrowser,
        path: '/box/' + (userData ? userData["displayName"] : "")
      }
    );
  }

  return result;
}

export default navigation;

