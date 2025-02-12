import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Chip,
  Container,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Pagination,
  CircularProgress,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getRidesData } from './action';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    status: {
      completed: '#4caf50',
      ongoing: '#2196f3',
      accepted: '#ff9800',
      cancelled: '#f44336',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 'bold',
          },
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const StatusChip = ({ status }) => {
  const getStatusColor = () => {
    const colors = {
      completed: 'success',
      ongoing: 'primary',
      accepted: 'warning',
      cancelled: 'error',
    };
    return colors[status.toLowerCase()] || 'default';
  };

  return (
    <Chip
      label={status.toUpperCase()}
      color={getStatusColor()}
      size="small"
      sx={{ minWidth: 100 }}
    />
  );
};

const Rides = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const ridesData = useSelector((state) => state.ridesReducer);
  
  const ridesArray = ridesData?.rides?.rides || [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getRidesData());
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const filteredRides = ridesArray.length > 0 ? ridesArray.filter(ride =>
    (status === 'all' || ride?.status?.toLowerCase() === status.toLowerCase()) &&
    (ride?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase() || '') ||
     ride?.driver?.name?.toLowerCase().includes(searchQuery.toLowerCase() || ''))
  ) : [];

  useEffect(() => {
    if (ridesArray.length > 0) {
      setTotalPages(Math.ceil(filteredRides.length / rowsPerPage));
      setPage(1);
    }
  }, [filteredRides.length, rowsPerPage, searchQuery, status, ridesArray.length]);

  const getCurrentPageRides = () => {
    if (!ridesArray.length) return [];
    const startIndex = (page - 1) * rowsPerPage;
    return filteredRides.slice(startIndex, startIndex + rowsPerPage);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (!ridesArray.length && !loading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <StyledPaper>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h1" fontWeight="bold">
                  Rides Management
                </Typography>
                {ridesArray.length > 0 && (
                  <Box display="flex" gap={2}>
                    <Select
                      size="small"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      displayEmpty
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="completed">COMPLETED</MenuItem>
                      <MenuItem value="accepted">ACCEPTED</MenuItem>
                      <MenuItem value="in_progress">IN_PROGRESS</MenuItem>
                      <MenuItem value="cancelled">CANCELLED</MenuItem>
                      <MenuItem value="open">OPEN</MenuItem>
                      <MenuItem value="closed">CLOSED</MenuItem>
                      <MenuItem value="passenger_payment_confirmed">PASSENGER_PAYMENT_CONFIRMED</MenuItem>
                      <MenuItem value="driver_payment_confirmed">DRIVER_PAYMENT_CONFIRMED</MenuItem>

                    </Select>
                    
                    <TextField
                      size="small"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{ width: 200 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            {ridesArray.length > 0 && (
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableHeaderCell>Customer Name</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Driver Name</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Car Type</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Total Fare(৳)</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Box display="flex" justifyContent="center" p={3}>
                              <CircularProgress />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : filteredRides.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No rides found
                          </TableCell>
                        </TableRow>
                      ) : (
                        getCurrentPageRides().map((ride) => (
                          <TableRow 
                            key={ride._id}
                            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                          >
                            <StyledTableCell>{ride.user?.name || 'N/A'}</StyledTableCell>
                            <StyledTableCell>{ride.driver?.name || 'N/A'}</StyledTableCell>
                            <StyledTableCell>{ride.carType || 'N/A'}</StyledTableCell>
                            <StyledTableCell>{ride.fare?.totalFare || 0}</StyledTableCell>
                            <StyledTableCell>
                              <StatusChip status={ride.status || 'unknown'} />
                            </StyledTableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}

            {ridesArray.length > 0 && filteredRides.length > 0 && (
              <Grid item xs={12}>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="text.secondary">
                        Rows per page:
                      </Typography>
                      <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Showing {getCurrentPageRides().length} of {filteredRides.length} rides
                    </Typography>
                  </Box>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    size="medium"
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Rides;