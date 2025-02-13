import React, { useState, useEffect } from 'react';
import {
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
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersData } from '../drivers/action';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    status: {
      active: '#4caf50',
      inactive: '#f44336',
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const StatusChip = ({ status }) => {
  const color = status === 'active' ? 'success' : 'error';
  return (
    <Chip
      label={status.toUpperCase()}
      color={color}
      size="small"
      sx={{ minWidth: 80 }}
    />
  );
};

function Passengers() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(getUsersData("passenger"));
      } catch (error) {
        setError('Failed to fetch passenger data. Please try again later.');
        console.error('Error fetching passengers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const filteredPassengers = React.useMemo(() => {
    if (!Array.isArray(passengers?.users)) return [];
    
    return passengers.users.filter(passenger => 
      (statusFilter === 'all' || passenger.status === statusFilter) &&
      (passenger.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       passenger.phone?.includes(searchQuery))
    );
  }, [passengers?.users, statusFilter, searchQuery]);

  useEffect(() => {
    if (filteredPassengers.length > 0) {
      setTotalPages(Math.ceil(filteredPassengers.length / rowsPerPage));
      setPage(1);
    }
  }, [filteredPassengers.length, rowsPerPage]);

  const getCurrentPagePassengers = () => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredPassengers.slice(startIndex, startIndex + rowsPerPage);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <StyledPaper>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <Box sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                Passengers Management
              </Typography>
              
              <Box display="flex" gap={2}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={statusFilter}
                    label="Status"
                    onChange={handleStatusFilterChange}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  size="small"
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ width: 250 }}
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

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Phone</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Email</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Rating</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Blood Group</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Emergency Contact</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Experience</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Gender</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Box display="flex" justifyContent="center" p={3}>
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : filteredPassengers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="body1" sx={{ py: 2 }}>
                          No passengers found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getCurrentPagePassengers().map((passenger) => (
                      <TableRow 
                        key={passenger.id}
                        sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                      >
                        <StyledTableCell>{passenger.name}</StyledTableCell>
                        <StyledTableCell>{passenger.phone}</StyledTableCell>
                        <StyledTableCell>{passenger.email}</StyledTableCell>
                        <StyledTableCell>
                          <StatusChip status={passenger.status} />
                        </StyledTableCell>
                        <StyledTableCell>{passenger.rating}</StyledTableCell>
                        <StyledTableCell>{passenger.blood_group}</StyledTableCell>
                        <StyledTableCell>{passenger.emergency_contact}</StyledTableCell>
                        <StyledTableCell>{passenger.experience}</StyledTableCell>
                        <StyledTableCell>{passenger.gender}</StyledTableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredPassengers.length > 0 && (
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
                    <FormControl size="small">
                      <Select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        sx={{ minWidth: 80 }}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Showing {getCurrentPagePassengers().length} of {filteredPassengers.length} passengers
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
            )}
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
}

export default Passengers;