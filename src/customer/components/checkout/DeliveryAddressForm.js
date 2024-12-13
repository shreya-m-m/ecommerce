import { Box, Button, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../state/Order/Action';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);
    const token = localStorage.getItem('token');

    // Assuming user addresses are stored in the Redux store
    const userAddresses = auth.user?.address;

    const [addressType, setAddressType] = useState('Home');
    const [formData, setFormData] = useState({
        firstname: auth.user?.firstname,
        lastname: auth.user?.lastname,
        phone_number: auth.user?.phone_number,
        zipcode: '',
        streetname: '',
        city: '',
        state: '',
        addressType: 'Home',
    });

    const [selectedAddress, setSelectedAddress] = useState(null); // To store the selected address for form population

    const handleAddressTypeChange = (event) => {
        setAddressType(event.target.value);
        setFormData((prev) => ({
            ...prev,
            addressType: event.target.value,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Check if the address already exists
    const checkIfAddressExists = (newAddress) => {
        return userAddresses.some(
            (address) =>
                address.firstname === newAddress.firstname &&
                address.lastname === newAddress.lastname &&
                address.phone_number === newAddress.phone_number &&
                address.zipcode === newAddress.zipcode &&
                address.streetname === newAddress.streetname &&
                address.city === newAddress.city &&
                address.state === newAddress.state &&
                address.addressType === newAddress.addressType
        );
    };

    const handleDeliverHere = () =>{

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const address = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone_number: formData.phone_number,
            zipcode: formData.zipcode,
            streetname: formData.streetname,
            city: formData.city,
            state: formData.state,
            addressType: formData.addressType,
        };

        // Check if the address already exists
        if (checkIfAddressExists(address)) {
            console.log("Address already exists.");
            // Optionally, show a message to the user or handle accordingly
        } else {
            const orderData = { address, navigate };
            dispatch(createOrder(orderData)); // Add the new address
            console.log("Submitted address:", orderData);
        }
    };

    const handleReset = () => {
        setFormData({
            firstname: '',
            lastname: '',
            phone_number: '',
            zipcode: '',
            streetname: '',
            city: '',
            state: '',
            addressType: 'Home',
        });
    };

    // Handle address selection for delivery
    const handleSelectAddress = (address) => {
        setSelectedAddress(address); // Set the selected address for form population
        // setFormData({
        //     firstname: address.firstname,
        //     lastname: address.lastname,
        //     phone_number: address.phone_number,
        //     zipcode: address.zipcode,
        //     streetname: address.streetname,
        //     city: address.city,
        //     state: address.state,
        //     addressType: address.addressType,
        // });
        const orderData = { address, navigate };
        dispatch(createOrder(orderData));
        
    };

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={5} className="border rounded-e-md shadow-md h-[30rem] overflow-y-scroll">
                    <div className="p-5 py-7 border-b cursor-pointer">
                        {/* Check if the user has addresses and display them */}
                        {auth?.user?.address && auth.user.address.length > 0 ? (
                            auth.user.address.map((address) => (
                                <div key={address.address_id}> {/* Use address_id as the key */}
                                    <AddressCard address={address} />
                                    <Button
                                        sx={{ mt: 2, bgcolor: "#4A5D23" }}
                                        size="large"
                                        variant="contained"
                                        onClick={() => handleSelectAddress(address)} // Populate the form with selected address
                                    >
                                        Deliver Here
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Typography variant="h6">No addresses found</Typography>
                        )}
                    </div>
                </Grid>

                <Grid item xs={12} lg={7}>
                    <Box className="border rounded-s-md shadow-md p-5">
                        <Typography variant="h6" gutterBottom>
                            Add Address Details
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstname"
                                        name="firstname"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={formData?.firstname}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastname"
                                        name="lastname"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="family-name"
                                        value={formData?.lastname}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phone_number"
                                        name="phone_number"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="tel"
                                        value={formData?.phone_number}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zipcode"
                                        name="zipcode"
                                        label="Zip Code"
                                        fullWidth
                                        autoComplete="postal-code"
                                        value={formData?.zipcode}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="streetname"
                                        name="streetname"
                                        label="Street Name"
                                        fullWidth
                                        value={formData?.streetname}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        value={formData?.city}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State"
                                        fullWidth
                                        value={formData?.state}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" className="text-left">
                                        Address Type
                                    </Typography>
                                    <RadioGroup
                                        aria-label="address-type"
                                        name="addressType"
                                        value={formData?.addressType}
                                        onChange={handleAddressTypeChange}
                                        row
                                    >
                                        <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                        <FormControlLabel value="Work" control={<Radio />} label="Work" />
                                        <FormControlLabel value="Others" control={<Radio />} label="Others" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Make as default Address"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="space-between">
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default DeliveryAddressForm;
