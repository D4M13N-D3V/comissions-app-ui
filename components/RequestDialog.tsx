import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { AssignmentLateOutlined, AssignmentTurnedInOutlined, Check, Download, PriceCheck, PriceCheckOutlined, Refresh, ShoppingCartCheckout } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function RequestDialog() {
    
  
  return (<Dialog
    fullWidth={true}
    maxWidth={"lg"}
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Request submitted on {formattedTime ?? ''}</DialogTitle>
    <DialogContent>
      <Grid container spacing={3} sx={{paddingTop:"1%"}}>
          <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                      <TextField
                          multiline={true}
                          rows={10}
                          fullWidth
                          label="Request Message"
                          value={params.row.message}
                          disabled
                      />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Card>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12} md={12}>
                          </Grid>
                          <Grid item xs={12} md={12}>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Grid container>
                          <Grid item xs={12} md={3}>
                            <Tooltip arrow title="Pay for this request.">
                              <IconButton onClick={handlePay} disabled={params.row.accepted && params.row.paid || params.row.declined} color="success"><ShoppingCartCheckoutIcon/></IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Tooltip arrow title="Download all assets.">
                              <IconButton disabled={!params.row.completed} color="secondary"><Download/></IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={12}>
                            {(!params.row.declined && !params.row.accepted && !params.row.paid && !params.row.completed ? (
                              <Chip icon={<Refresh />} label="Pending" variant="filled" color="secondary" />
                            ):null)}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(params.row.declined ? (
                              <Chip icon={<AssignmentLateOutlined />} label="Declined" variant="filled" color="error" />
                            ):null)}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(params.row.accepted ? (
                              <Chip icon={<AssignmentTurnedInOutlined />} label="Accepted" variant="filled" color="info" />
                            ):null)}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(params.row.paid && params.row.acccepted ? (
                              <Chip label="Paid" variant="filled" color="success" />
                            ):null)}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(params.row.paid==false && params.row.accepted ? (
                              <Chip icon={<PriceCheckOutlined />} label="Pending Payment" variant="filled" color="warning" />
                            ):null)}
                          </Grid>
                          <Grid item xs={12} md={12}>
                            {(params.row.completed ? (
                              <Chip disabled={!params.row.completed} icon={<Check />} label="Completed" variant="filled" color="success" />
                            ):null)}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{textAlign:"center"}}>
                    <Tooltip arrow title="Rate this request.">
                      <Rating
                      sx={{paddingTop:"1%"}}
                      size='large'
                        // name="simple-controlled"
                        // value={value}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </Tooltip>  
                    <Tooltip arrow title="Write a review for this request..">
                      <TextField size="small" rows={4} multiline />
                    </Tooltip>  
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Card>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12} md={12}>
                          </Grid>
                          <Grid item xs={12} md={12}>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  );
}