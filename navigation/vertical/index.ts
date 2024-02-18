// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from '../../core/layouts/types'
import { BankTransfer, PageFirst } from 'mdi-material-ui'
import { DocumentScanner, FileOpen, Settings } from '@mui/icons-material'
import { useState, useEffect } from 'react'

const navigation = (): VerticalNavItemsType => {
  const [isStripeOnboarded, setIsStripeOnboarded] = useState(false);

  const getData = async () => {
    const onboardCheckRequest = await fetch('/api/artist/onboarded', { method: "GET" });
    const onboardCheckResponse = await onboardCheckRequest.json();
    setIsStripeOnboarded(onboardCheckResponse["onboarded"]);
  }
  useEffect(() => {
    getData();
  }, []);

  if(isStripeOnboarded){

    return [
      {
        sectionTitle: 'General'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/dashboard'
      },
      {
        title: 'Account Settings',
        icon: Settings,
        path: '/artist/settings'
      },
      {
        sectionTitle: 'Artist'
      },
      {
        title: 'Payout Portal',
        icon: BankTransfer,
        path: '/payoutportal'
      },
      {
        title: 'Page Settings',
        icon: DocumentScanner,
        path: '/dashboard/artist/pagesettings'
      },
      {
        title: 'Preview Page',
        icon: FileOpen,
        path: '/artist/pagesettings'
      }
    ]
  }
  else{

    return [
      {
        sectionTitle: 'General'
      },
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/dashboard'
      }
    ]
  }
}

export default navigation
