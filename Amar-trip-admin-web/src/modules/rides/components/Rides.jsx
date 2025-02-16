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
  IconButton,
  Tooltip,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getRidesData } from './action';
import { useNavigate } from 'react-router-dom';

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
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ridesData = useSelector((state) => state.ridesReducer);
  
  const rides = ridesData?.rides?.rides || [];


  const handleDetailsClick = (rideId) => {
    navigate(`/rides/${rideId}`);
  };
  
  
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
     
    return debouncedValue;
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getRidesData({
          page,
          limit: rowsPerPage,
          status: status === 'all' ? '' : status,
          search: debouncedSearchQuery
        }));
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, page, rowsPerPage, status, debouncedSearchQuery]);
  
  useEffect(() => {
    if (ridesData?.rides?.pagination) {
      setTotalItems(ridesData.rides.pagination.totalRides);
      setTotalPages(ridesData.rides.pagination.totalPages);
    }
  }, [ridesData]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

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
                <Box display="flex" gap={2}>
                  <Select
                    size="small"
                    value={status}
                    onChange={handleStatusChange}
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
                    onChange={handleSearchChange}
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
              </Box>
            </Grid>

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
                      <StyledTableHeaderCell>Details</StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : rides.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No rides found
                        </TableCell>
                      </TableRow>
                    ) : (
                      rides.map((ride) => (
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
                          <StyledTableCell>
                            <Tooltip title="View Details">
                              <IconButton
                                color="primary"
                                onClick={() => handleDetailsClick(ride._id)}
                                size="small"
                              >
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {rides.length > 0 && (
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
                      Showing {rides.length} of {totalItems} rides
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