import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Paper,
  Divider,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  DirectionsCar,
  Star,
  Warning,
  AccessTime,
  Person,
  Bloodtype,
  ContactPhone,
  Badge
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataById } from './action';
import { useParams } from 'react-router-dom';

const DriverDetailsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector((state) => state.usersReducer);
  const users = userData?.userDataById?.data;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getUserDataById(id));
            } catch (error) {
                console.error('Error fetching ride Details:', error);
            }
        };
        fetchData();
    }, [dispatch, id]); 

  const StatCard = ({ icon, title, value }) => (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        {icon}
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6">
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  const DocumentCard = ({ title, frontImage, backImage }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Front
            </Typography>
            <Paper variant="outlined">
              <Box
                component="img"
                src="/api/placeholder/400/250"
                alt={`${title} Front`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Back
            </Typography>
            <Paper variant="outlined">
              <Box
                component="img"
                src="/api/placeholder/400/250"
                alt={`${title} Back`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box position="relative">
                  <Avatar
                    src={users?.profileImage}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <Chip
                    label={users?.isOnline ? "Online" : "Offline"}
                    color={users?.isOnline ? "success" : "default"}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: -10,
                    }}
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {users?.name}
                </Typography>
                <Chip
                  label={users?.status?.toUpperCase()}
                  color="primary"
                  sx={{ mb: 2 }}
                />
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary={users?.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary={users?.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary={users?.address} />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Stack spacing={2}>
                <StatCard
                  icon={<DirectionsCar color="primary" />}
                  title="Total Trips"
                  value={users?.tripCount}
                />
                <StatCard
                  icon={<Warning color="error" />}
                  title="Cancellations"
                  value={users?.cancellationCount}
                />
                <StatCard
                  icon={<Star color="warning" />}
                  title="Rating"
                  value={users?.rating}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          {/* Personal Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary="Gender"
                        secondary={users?.gender}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Bloodtype />
                      </ListItemIcon>
                      <ListItemText
                        primary="Blood Group"
                        secondary={users?.blood_group}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime />
                      </ListItemIcon>
                      <ListItemText
                        primary="Experience"
                        secondary={users?.experience}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ContactPhone />
                      </ListItemIcon>
                      <ListItemText
                        primary="Emergency Contact"
                        secondary={users?.emergency_contact}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DocumentCard
                title="National ID"
                frontImage={users?.nid?.front}
                backImage={users?.nid?.back}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DocumentCard
                title="Driving License"
                frontImage={users?.driving_license?.front}
                backImage={users?.driving_license?.back}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverDetailsPage;