import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import {
    Person as PersonIcon,
    Receipt as ReceiptIcon,
    DirectionsCar as CarIcon,
    LocationOn as LocationIcon,
    Payments as PaymentsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRideDataById } from './action';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    '&:last-child': {
        borderRight: 0,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const RideDetailsPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const rideData = useSelector((state) => state.ridesReducer);

     const ride = rideData?.rideDataById?.data;
   


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getRideDataById(id));
            } catch (error) {
                console.error('Error fetching ride Details:', error);
            }
        };
        fetchData();
    }, [dispatch, id]); 
    
    
    if (!ride || Object.keys(ride).length === 0) {
        return null;
    }
    
        
    const SectionCard = ({ title, icon: Icon, children }) => (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Icon sx={{ fontSize: 30, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" color="textSecondary">{title}</Typography>
                </Box>
                <TableContainer>
                    {children}
                </TableContainer>
            </CardContent>
        </Card>
    );

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Ride Details</Typography>

            <SectionCard title="Booking Summary" icon={ReceiptIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Booking ID</strong></StyledTableCell>
                            <StyledTableCell>{ride.bookingNumber}</StyledTableCell>
                            <StyledTableCell><strong>Status</strong></StyledTableCell>
                            <StyledTableCell>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={ride.status}
                                    >
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="pending">Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell><strong>Date</strong></StyledTableCell>
                            <StyledTableCell>{new Date(ride.createdAt).toLocaleString()}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Fare Details" icon={PaymentsIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Base Fare: </strong></StyledTableCell>
                            <StyledTableCell>৳{ride?.fare?.baseFare}</StyledTableCell>
                            <StyledTableCell><strong>Service Charge (Passenger): </strong></StyledTableCell>
                            <StyledTableCell>৳{ride?.fare?.serviceChargePassenger}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell><strong>Service Charge (Driver): </strong></StyledTableCell>
                            <StyledTableCell>৳{ride?.fare?.serviceChargeDriver}</StyledTableCell>
                            <StyledTableCell><strong>Total Fare: </strong></StyledTableCell>
                            <StyledTableCell>৳{ride?.fare?.totalFare}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title=" Trip Details" icon={PaymentsIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Car Type: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.carType}</StyledTableCell>
                            <StyledTableCell><strong>Trip Type: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.isRoundTrip ? "Round Trip" : "One Way"}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Location Details" icon={LocationIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Pickup Location: </strong></StyledTableCell>
                            <StyledTableCell colSpan={3}>
                                {`${ride?.pickup?.union}, ${ride?.pickup ?.upazila}, ${ride?.pickup?.district}`}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell><strong>Destination: </strong></StyledTableCell>
                            <StyledTableCell colSpan={3}>
                                {`${ride?.destination?.union}, ${ride?.destination?.upazila}, ${ride?.destination?.district}`}
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Vehicle Details" icon={CarIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Vehicle: </strong></StyledTableCell>
                            <StyledTableCell>{`${ride?.vehicle?.name} ${ride?.vehicle?.type}`}</StyledTableCell>
                            <StyledTableCell><strong>Car Number: </strong></StyledTableCell>
                            <StyledTableCell>
                                {`${ride?.vehicle?.car_number?.part_1} ${ride?.vehicle?.car_number?.part_2} ${ride?.vehicle?.car_number.part_3}`}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>    
                        <StyledTableCell><strong>Model year: </strong></StyledTableCell>
                        <StyledTableCell>{`${ride?.vehicle?.model_year}`}</StyledTableCell>
                        <StyledTableCell><strong>Color: </strong></StyledTableCell>
                        <StyledTableCell>{`${ride?.vehicle?.color}`}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>

            <SectionCard title="Driver Details" icon={CarIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Driver Name: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.driver?.name}</StyledTableCell>
                            <StyledTableCell><strong>Driver Phone: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.driver?.phone}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>


            <SectionCard title="Passenger Details" icon={PersonIcon}>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell><strong>Name: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.user?.name}</StyledTableCell>
                            <StyledTableCell><strong>Phone: </strong></StyledTableCell>
                            <StyledTableCell>{ride?.user?.phone}</StyledTableCell>
                            
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </SectionCard>
        </Box>
    );
};

export default RideDetailsPage;