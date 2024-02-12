import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/layout";
import { Grid, Button, Typography, TextField, Box } from "@mui/material";

const Settings = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} loading={isLoading}>
      <Grid container spacing={2} sx={{padding:4}}>
        <Grid container   sx={{textAlign:"center"}}>
          <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
            <Button color="primary" variant="contained" href="../">
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}  sx={{textAlign:"center"}}>
            <Typography variant="h4">
              Settings
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}  sx={{textAlign:"center"}}>
            <Button color="secondary" variant="contained" href="../">
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField variant="filled" fullWidth label="Display Name" value={user?.email} />
          <Box sx={{padding:2}} />
          <TextField variant="outlined" fullWidth multiline rows={4} label="Biography" value={user?.email} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Settings;
