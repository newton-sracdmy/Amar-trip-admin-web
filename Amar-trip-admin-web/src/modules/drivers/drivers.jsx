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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersData } from './action';

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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
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

function Drivers() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.usersReducer);
  const drivers=driversData?.users?.users;


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
        await dispatch(getUsersData({
          page,
          type: "driver",
          limit: rowsPerPage,
          isOnline: isOnline === 'all' ? '' : isOnline,
          search: debouncedSearchQuery
        }));
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, page, rowsPerPage, isOnline, debouncedSearchQuery]); 

  useEffect(() => {
    if (driversData?.users?.pagination) {
      setTotalItems(driversData?.users?.pagination.totalRides);
      setTotalPages(driversData?.users?.pagination.totalPages);
    }
  }, [drivers]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setIsOnline(event.target.value);
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
          <Box sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                Driver Management
              </Typography>
              <Box display="flex" gap={2}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    id="status-filter"
                    value={isOnline}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="true">Online</MenuItem>
                    <MenuItem value="false">Offline</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  size="small"
                  placeholder="Search by name or phone..."
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
                  ) : !drivers?.length ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No drivers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    drivers.map((driver,key) => (
                      <TableRow 
                        key={driver.id}
                        sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                      >
                        <StyledTableCell>{driver.name}</StyledTableCell>
                        <StyledTableCell>{driver.phone}</StyledTableCell>
                        <StyledTableCell>{driver.email}</StyledTableCell>
                        <StyledTableCell>
                          <StatusChip status={driver.status} />
                        </StyledTableCell>
                        <StyledTableCell>{driver.rating}</StyledTableCell>
                        <StyledTableCell>{driver.blood_group}</StyledTableCell>
                        <StyledTableCell>{driver.emergency_contact}</StyledTableCell>
                        <StyledTableCell>{driver.experience}</StyledTableCell>
                        <StyledTableCell>{driver.gender}</StyledTableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {drivers?.length > 0 && (
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
                    Showing {drivers?.length} of {totalItems} drivers
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

export default Drivers;