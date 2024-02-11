import { UserProvider } from "@auth0/nextjs-auth0/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D3555',
    },
    secondary: {
      main: '#E5BEED'
    },
    background: {
      default: '#3D3E46',
      paper: '#FAFAFF'
    }
  },
})


export default function App({ Component, pageProps }) {
  // optionally pass the 'user' prop from pages that require server-side
  // rendering to prepopulate the 'useUser' hook.
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
