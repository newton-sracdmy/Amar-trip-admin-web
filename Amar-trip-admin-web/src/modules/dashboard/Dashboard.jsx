import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Container,
  Paper,
  useTheme
} from '@mui/material';
import {
  DirectionsCar,
  Person,
  CheckCircle,
  Cancel,
  RadioButtonChecked,
  RadioButtonUnchecked
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getRidesSummary } from './action';

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.ridesSummaryReducer);

  const { 
    last7DaysRideStatistics = {}, 
    ridesSummary = {}, 
    todaysRides = {} 
  } = dashboardData?.ridesSummary?.data || {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(getRidesSummary());
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const InfoCard = ({ icon: Icon, title, value, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Icon sx={{ fontSize: 40, color: color }} />
          <Box>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" color={color}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Overall Rides Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsCar sx={{ fontSize: 30, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Total Rides
                </Typography>
                <Typography variant="h5" color="primary">
                  {ridesSummary?.totalRides?.totalRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircle sx={{ fontSize: 30, color: theme.palette.success.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Completed Rides
                </Typography>
                <Typography variant="h5" color="success.main">
                  {ridesSummary?.totalRides?.completedRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={Person}
            title="Approved Drivers"
            value={ridesSummary?.approvedDrivers || 0}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard
            icon={Person}
            title="Unapproved Drivers"
            value={ridesSummary?.unapprovedDrivers || 0}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Last 7 Days Ride Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsCar sx={{ fontSize: 30, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Total Rides
                </Typography>
                <Typography variant="h5" color="primary">
                  {last7DaysRideStatistics?.totalRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircle sx={{ fontSize: 30, color: theme.palette.success.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h5" color="success.main">
                  {last7DaysRideStatistics?.completedRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsCar sx={{ fontSize: 30, color: theme.palette.info.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Running
                </Typography>
                <Typography variant="h5" color="info.main">
                  {last7DaysRideStatistics?.runningRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <Cancel sx={{ fontSize: 30, color: theme.palette.error.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Cancelled
                </Typography>
                <Typography variant="h5" color="error.main">
                  {last7DaysRideStatistics?.cancelledRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Today's Rides
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <RadioButtonChecked sx={{ fontSize: 30, color: theme.palette.success.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Active Drivers
                </Typography>
                <Typography variant="h5" color="success.main">
                  {todaysRides?.activeDrivers || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <RadioButtonUnchecked sx={{ fontSize: 30, color: theme.palette.grey[500] }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Inactive Drivers
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {todaysRides?.inactiveDrivers || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <DirectionsCar sx={{ fontSize: 30, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Total Rides
                </Typography>
                <Typography variant="h5" color="primary.main">
                  {todaysRides?.totalRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <Cancel sx={{ fontSize: 30, color: theme.palette.error.main }} />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Cancelled Rides
                </Typography>
                <Typography variant="h5" color="error.main">
                  {todaysRides?.cancelledRides || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;