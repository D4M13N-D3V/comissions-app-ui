import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/router';
import { Rating } from '@mui/material';
import dayjs from 'dayjs';

import CurrencyTextField from '@lupus-ai/mui-currency-textfield';
import { DateField } from '@mui/x-date-pickers';

export default function Reviews({artistId}) {
    const router = useRouter();
    const columns = [
        { field: 'requestId', headerName: 'ID', flex: 0.1},
        { field: 'message', headerName: 'Review', flex: 0.5},
        { field: 'rating', headerName: 'Rating', flex: 0.2, renderCell: (params) => {
            return <Rating value={params.row.rating} readOnly />;
        }}
    ];
  const [isLoading, setIsLoading] = React.useState(true);
  const [reviewCount, setReviewCount] = React.useState(null);  
  const [reviewData, setReviewData] = React.useState({});  
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });


  const getReviews = async () => {
    setIsLoading(true);
    const response = await fetch('/api/discovery/artist/'+artistId+'/reviews', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    setReviewData(data);
    setIsLoading(false);
  }
  const getReviewsCount = async () => {
    const response = await fetch('/api/discovery/artist/'+artistId+'/reviewscount', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    setReviewCount(data);
    setRowCountState((prevRowCountState) =>
      data !== undefined
        ? data
        : prevRowCountState,
    );
    return data;
  } 

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(0);
  React.useEffect(() => {
    getReviews();
     getReviewsCount();
  }, [reviewCount, setRowCountState,paginationModel]);

  return (
    
    <div style={{ height: '100%', width: '100%' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataGrid
      getRowId={(row) => row.requestId}
        rows={reviewData}
        columns={columns}
        rowCount={rowCountState}
        loading={isLoading}
        pageSizeOptions={[15]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
        </LocalizationProvider>
    </div>
  );
}