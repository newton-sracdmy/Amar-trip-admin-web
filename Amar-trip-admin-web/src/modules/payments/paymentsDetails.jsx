import React, { useEffect } from 'react';
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
  Paper,
  Chip,
  Divider
} from '@mui/material';
import {
  Person,
  CreditCard,
  ConfirmationNumber,
  DirectionsCar,
  History,
  AccessTime
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPaymentDataById } from './action';

const PaymentDetails = () => {

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      paid: 'success',
      pending: 'warning',
      cancelled: 'error',
      completed: 'success',
      active: 'success',
      sold: 'info',
      VALID: 'success'
    };
    return statusColors[status?.toLowerCase()] || 'default';
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const payments = useSelector((state) => state.paymentsReducer) || {};
  const data = payments?.paymentById || [];

 useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getPaymentDataById(id));
            } catch (error) {
                console.error('Error fetching ride Details:', error);
            }
        };
        fetchData();
    }, [dispatch, id]); 
    

  const InfoRow = ({ label, value, chip, multiline }) => (
    <TableRow>
      <TableCell component="th" scope="row" style={{ fontWeight: 'bold', width: '40%' }}>
        {label}
      </TableCell>
      <TableCell>
        {chip ? (
          <Chip label={value || 'N/A'} color={getStatusColor(value)} />
        ) : multiline ? (
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : (value || 'N/A')}
          </Box>
        ) : (
          value || 'N/A'
        )}
      </TableCell>
    </TableRow>
  );

  const SectionCard = ({ title, icon, children }) => (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              {children}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <SectionCard title="System Information" icon={<History color="primary" />}>
        <InfoRow label="Payment ID" value={data._id} />
        <InfoRow label="Invoice Number" value={data.invoiceNumber} />
        <InfoRow label="Amount" value={`${data.amount} BDT`} />
        <InfoRow label="Status" value={data.status} chip />
        <InfoRow label="Created At" value={formatDate(data.createdAt)} />
        <InfoRow label="Updated At" value={formatDate(data.updatedAt)} />
        <InfoRow label="Version" value={data.__v} />
      </SectionCard>

      <SectionCard title="User Information" icon={<Person color="primary" />}>
        <InfoRow label="User ID" value={data.user._id} />
        <InfoRow label="Name" value={data.user.name} />
        <InfoRow label="Phone" value={data.user.phone} />
        <InfoRow label="Type" value={data.user.type} />
        <InfoRow label="Status" value={data.user.status} chip />
        <InfoRow label="Trip Count" value={data.user.tripCount} />
        <InfoRow label="Cancellation Count" value={data.user.cancellationCount} />
        <InfoRow label="Rating" value={data.user.rating} />
        <InfoRow label="Block Until" value={formatDate(data.user.blockUntil)} />
        <InfoRow label="Last Seen" value={formatDate(data.user.lastSeen)} />
        <InfoRow label="Created At" value={formatDate(data.user.createdAt)} />
        <InfoRow label="Updated At" value={formatDate(data.user.updatedAt)} />
        <InfoRow label="Version" value={data.user.__v} />
      </SectionCard>

      <SectionCard title="Transaction Details" icon={<CreditCard color="primary" />}>
        <InfoRow label="Transaction Status" value={data.transactionDetails.status} chip />
        <InfoRow label="Transaction Date" value={data.transactionDetails.tran_date} />
        <InfoRow label="Transaction ID" value={data.transactionDetails.tran_id} />
        <InfoRow label="Validation ID" value={data.transactionDetails.val_id} />
        <InfoRow label="Amount" value={`${data.transactionDetails.amount} ${data.transactionDetails.currency}`} />
        <InfoRow label="Store Amount" value={data.transactionDetails.store_amount} />
        <InfoRow label="Bank Transaction ID" value={data.transactionDetails.bank_tran_id} />
        <InfoRow label="Card Type" value={data.transactionDetails.card_type} />
        <InfoRow label="Card Number" value={data.transactionDetails.card_no} />
        <InfoRow label="Card Issuer" value={data.transactionDetails.card_issuer} />
        <InfoRow label="Card Brand" value={data.transactionDetails.card_brand} />
        <InfoRow label="Card Category" value={data.transactionDetails.card_category} />
        <InfoRow label="Card Sub Brand" value={data.transactionDetails.card_sub_brand} />
        <InfoRow label="Card Issuer Country" value={data.transactionDetails.card_issuer_country} />
        <InfoRow label="Card Issuer Country Code" value={data.transactionDetails.card_issuer_country_code} />
        <InfoRow label="Currency Type" value={data.transactionDetails.currency_type} />
        <InfoRow label="Currency Amount" value={data.transactionDetails.currency_amount} />
        <InfoRow label="Currency Rate" value={data.transactionDetails.currency_rate} />
        <InfoRow label="Base Fair" value={data.transactionDetails.base_fair} />
        <InfoRow label="EMI Installment" value={data.transactionDetails.emi_instalment} />
        <InfoRow label="EMI Amount" value={data.transactionDetails.emi_amount} />
        <InfoRow label="EMI Description" value={data.transactionDetails.emi_description} />
        <InfoRow label="EMI Issuer" value={data.transactionDetails.emi_issuer} />
        <InfoRow label="Account Details" value={data.transactionDetails.account_details} />
        <InfoRow label="Risk Title" value={data.transactionDetails.risk_title} />
        <InfoRow label="Risk Level" value={data.transactionDetails.risk_level} />
        <InfoRow label="Discount Percentage" value={data.transactionDetails.discount_percentage} />
        <InfoRow label="Discount Amount" value={data.transactionDetails.discount_amount} />
        <InfoRow label="Discount Remarks" value={data.transactionDetails.discount_remarks} />
        <InfoRow label="API Connect" value={data.transactionDetails.APIConnect} />
        <InfoRow label="Validated On" value={data.transactionDetails.validated_on} />
        <InfoRow label="GW Version" value={data.transactionDetails.gw_version} />
        <InfoRow label="Offer Available" value={data.transactionDetails.offer_avail} />
        <InfoRow label="Card Reference ID" value={data.transactionDetails.card_ref_id} />
        <InfoRow label="Is Tokenize Success" value={data.transactionDetails.isTokeizeSuccess} />
        <InfoRow label="Campaign Code" value={data.transactionDetails.campaign_code} />
      </SectionCard>

      {data.ticket && (
        <SectionCard title="Ticket Information" icon={<ConfirmationNumber color="primary" />}>
          <InfoRow label="Ticket ID" value={data.ticket._id} />
          <InfoRow label="PNR" value={data.ticket.pnr} />
          <InfoRow label="Seat" value={data.ticket.seat} />
          <InfoRow label="Fare" value={`${data.ticket.fare} BDT`} />
          <InfoRow label="Status" value={data.ticket.status} chip />
          <InfoRow label="Created By" value={data.ticket.createdBy} />
          <InfoRow label="Expired At" value={formatDate(data.ticket.expiredAt)} />
          <InfoRow label="Created At" value={formatDate(data.ticket.createdAt)} />
          <InfoRow label="Updated At" value={formatDate(data.ticket.updatedAt)} />
          <InfoRow label="Version" value={data.ticket.__v} />

          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                Coach Details
              </Typography>
            </TableCell>
          </TableRow>
          <InfoRow label="Coach ID" value={data.ticket.coach._id} />
          <InfoRow label="Name" value={data.ticket.coach.name} />
          <InfoRow label="Company" value={data.ticket.coach.company} />
          <InfoRow label="Logo" value={data.ticket.coach.logo} />
          <InfoRow label="Coach Number" value={data.ticket.coach.coachNumber} />
          <InfoRow label="Type" value={data.ticket.coach.type} />
          <InfoRow label="Status" value={data.ticket.coach.status} chip />
          <InfoRow label="From" value={data.ticket.coach.from} />
          <InfoRow label="To" value={data.ticket.coach.to} />
          <InfoRow label="Departure Point" value={data.ticket.coach.departurePoint} />
          <InfoRow label="Date" value={formatDate(data.ticket.coach.date)} />
          <InfoRow label="Time" value={data.ticket.coach.time} />
          <InfoRow label="Fare" value={`${data.ticket.coach.fare} BDT`} />
          <InfoRow label="Manager Number" value={data.ticket.coach.managerNumber} />
          <InfoRow label="Created By" value={data.ticket.coach.createdBy} />
          <InfoRow label="Expired At" value={formatDate(data.ticket.coach.expiredAt)} />
          <InfoRow label="Created At" value={formatDate(data.ticket.coach.createdAt)} />
          <InfoRow label="Updated At" value={formatDate(data.ticket.coach.updatedAt)} />
          <InfoRow label="Version" value={data.ticket.coach.__v} />
        </SectionCard>
      )}

      {data.ride && (
        <SectionCard title="Ride Information" icon={<DirectionsCar color="primary" />}>
          <InfoRow label="Ride ID" value={data.ride._id} />
          <InfoRow label="Booking Number" value={data.ride.bookingNumber} />
          <InfoRow label="Ride Request" value={data.ride.rideRequest} />
          <InfoRow label="User ID" value={data.ride.user} />
          <InfoRow label="Driver ID" value={data.ride.driver} />
          <InfoRow label="Vehicle ID" value={data.ride.vehicle} />
          <InfoRow label="Car Type" value={data.ride.carType} />
          <InfoRow label="Round Trip" value={data.ride.isRoundTrip ? 'Yes' : 'No'} />
          <InfoRow label="Status" value={data.ride.status} chip />
          <InfoRow label="Created At" value={formatDate(data.ride.createdAt)} />
          <InfoRow label="Updated At" value={formatDate(data.ride.updatedAt)} />
          <InfoRow label="Version" value={data.ride.__v} />

          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                Fare Details
              </Typography>
            </TableCell>
          </TableRow>
          <InfoRow label="Base Fare" value={`${data.ride.fare.baseFare} BDT`} />
          <InfoRow label="Service Charge (Passenger)" value={`${data.ride.fare.serviceChargePassenger} BDT`} />
          <InfoRow label="Service Charge (Driver)" value={`${data.ride.fare.serviceChargeDriver} BDT`} />
          <InfoRow label="Total Fare" value={`${data.ride.fare.totalFare} BDT`} />

          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                Pickup Location
              </Typography>
            </TableCell>
          </TableRow>
          <InfoRow label="District" value={data.ride.pickup.district} />
          <InfoRow label="Upazila" value={data.ride.pickup.upazila} />
          <InfoRow label="Union" value={data.ride.pickup.union} />
          <InfoRow label="Coordinates" value={data.ride.pickup.long_lat.join(', ')} />
          <InfoRow label="Location ID" value={data.ride.pickup._id} />

          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                Destination
              </Typography>
            </TableCell>
          </TableRow>
          <InfoRow label="District" value={data.ride.destination.district} />
          <InfoRow label="Upazila" value={data.ride.destination.upazila} />
          <InfoRow label="Union" value={data.ride.destination.union} />
          <InfoRow label="Coordinates" value={data.ride.destination.long_lat.join(', ')} />
          <InfoRow label="Location ID" value={data.ride.destination._id} />

          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                Status History
              </Typography>
            </TableCell>
          </TableRow>
          {data.ride.statusHistories.map((history, index) => (
            <React.Fragment key={history._id}>
              <InfoRow 
                label={`Status ${index + 1}`} 
                value={history.status} 
                chip 
              />
              <InfoRow 
                label={`Timestamp ${index + 1}`} 
                value={formatDate(history.timestamp)} 
              />
            </React.Fragment>
          ))}
        </SectionCard>
      )}
    </Box>
  );
};

export default PaymentDetails;