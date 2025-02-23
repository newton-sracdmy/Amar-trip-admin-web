import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  InputAdornment,
  ThemeProvider,
  createTheme,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { Download } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentData, getPaymentForDownload } from './action';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  padding: '16px',
});

const StyledTableHeaderCell = styled(TableCell)({
  textAlign: 'center',
  padding: '16px',
  backgroundColor: '#000000',
  color: '#fff',
  fontWeight: 'bold',
});

const StatusChip = ({ status }) => {
  const getStatusColor = () => {
    const colors = {
      paid: 'success',
      pending: 'warning',
      failed: 'error',
      refunded: 'primary',
      due: 'warning',
      cancelled: 'error',
    };
    return colors[status?.toLowerCase()] || 'default';
  };

  return <Chip label={status?.toUpperCase()} color={getStatusColor()} size="small" sx={{ minWidth: 100 }} />;
};

const PaymentListPage = () => {
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payments = useSelector((state) => state.paymentsReducer) || {};
  const paymentData = payments?.paymentsData?.payments || [];

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
        await dispatch(
          getPaymentData({
            page,
            limit: rowsPerPage,
            startDate,
            endDate,
            status: status === 'all' ? '' : status,
            search: debouncedSearchQuery,
          })
        );
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, page, rowsPerPage, startDate, endDate, status, debouncedSearchQuery]);

  useEffect(() => {
    if (payments?.paymentsData?.pagination?.totalPayments) {
      setTotalItems(payments?.paymentsData?.pagination?.totalPayments);
      setTotalPages(Math.ceil(payments?.paymentsData?.pagination?.totalPayments / rowsPerPage));
    }
  }, [payments, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();
 


  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Please select a date range.");
      return;
    }

    dispatch(getPaymentForDownload({ startDate, endDate }));
  };

  const handleDetailsClick = (paymentId) => {
    console.log("===================paymentId==========",paymentId)
    navigate(`/payments/${paymentId}`);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <StyledPaper>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h1" fontWeight="bold">
                  Payment Management
                </Typography>
            
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button
                    variant="contained" 
                    color="primary" 
                    startIcon={<Download />} 
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setPage(1);
                    }}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setPage(1);
                    }}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <Select
                    size="small"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="paid">PAID</MenuItem>
                    <MenuItem value="due">DUE</MenuItem>
                    <MenuItem value="cancelled">CANCELLED</MenuItem>
                    <MenuItem value="failed">FAILED</MenuItem>
                  </Select>
                  <TextField
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
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
                      <StyledTableHeaderCell>Invoice Number</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Ride Status</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Date</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Booking ID</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Customer Name</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Amount</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Payment Status</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Details</StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : paymentData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          No payments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paymentData.map((payment) => (
                        <TableRow 
                          key={payment.id}
                          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                        >
                          <StyledTableCell>{payment?.invoiceNumber}</StyledTableCell>
                          <StyledTableCell>{payment?.ride?.status}</StyledTableCell>
                          <StyledTableCell>{formatDate(payment?.createdAt)}</StyledTableCell>
                          <StyledTableCell>{payment?.ride?.bookingNumber}</StyledTableCell>
                          <StyledTableCell>{payment?.user?.name}</StyledTableCell>
                          <StyledTableCell>৳{payment?.amount}</StyledTableCell>
                          <StyledTableCell>
                            <StatusChip status={payment?.status} />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Tooltip title="View Details">
                              <IconButton 
                              color="primary"
                              onClick={() => handleDetailsClick(payment._id)}
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

            {paymentData.length > 0 && (
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
                        Showing {paymentData.length} of {totalItems} payments
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
  
  export default PaymentListPage;