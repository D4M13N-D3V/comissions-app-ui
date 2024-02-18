import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'artist', headerName: 'Artist', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'action', headerName: 'Action', width: 180, renderCell: (params) => {
    return (<Button variant="outlined" color="primary" fullWidth>View More</Button>);
  }},
];

const rows = [
  { id: 1, artist:'Neroshi', status: 'Pending'},
];

export default function Orders() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
