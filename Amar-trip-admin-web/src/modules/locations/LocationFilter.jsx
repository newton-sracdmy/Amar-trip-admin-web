import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { fetchDistricts, fetchUpazilas, fetchUnions } from './actions';
import { clearUpazilas, clearUnions} from './reducer'
const LocationFilter = ({ onLocationChange }) => {
  const dispatch = useDispatch();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedUnion, setSelectedUnion] = useState('');

  const { 
    districts,
    upazilas,
    unions,
    status,
    isLoading
  } = useSelector(state => state.locationReducer);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDistricts());
    }
  }, [dispatch, status]);

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedUpazila('');
    setSelectedUnion('');
    
    if (districtId) {
      dispatch(fetchUpazilas(districtId));
    } else {
      dispatch(clearUpazilas());
    }
    
    onLocationChange({
      district: districtId,
      upazila: '',
      union: ''
    });
  };

  const handleUpazilaChange = (event) => {
    const upazilaId = event.target.value;
    setSelectedUpazila(upazilaId);
    setSelectedUnion('');
    
    if (upazilaId) {
      dispatch(fetchUnions(upazilaId));
    } else {
      dispatch(clearUnions());
    }
    
    onLocationChange({
      district: selectedDistrict,
      upazila: upazilaId,
      union: ''
    });
  };

  const handleUnionChange = (event) => {
    const unionId = event.target.value;
   
    setSelectedUnion(unionId);
    
    onLocationChange({
      district: selectedDistrict,
      upazila: selectedUpazila,
      union: unionId
    });
  };

  return (
    <Box display="flex" gap={2}>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel>District</InputLabel>
        <Select
          value={selectedDistrict}
          label="District"
          onChange={handleDistrictChange}
          disabled={districts.loading}
        >
          <MenuItem value="">All Districts</MenuItem>
          {districts.data.map((district) => (
            <MenuItem key={district._id} value={district._id}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small" disabled={!selectedDistrict || upazilas.loading}>
        <InputLabel>Upazila</InputLabel>
        <Select
          value={selectedUpazila}
          label="Upazila"
          onChange={handleUpazilaChange}
        >
          <MenuItem value="">All Upazilas</MenuItem>
          {upazilas.data.map((upazila) => (
            <MenuItem key={upazila._id} value={upazila._id}>
              {upazila.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small" disabled={!selectedUpazila || unions.loading}>
        <InputLabel>Union</InputLabel>
        <Select
          value={selectedUnion}
          label="Union"
          onChange={handleUnionChange}
        >
          <MenuItem value="">All Unions</MenuItem>
          {unions.data.map((union) => (
            <MenuItem key={union._id} value={union._id}>
              {union.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LocationFilter;
