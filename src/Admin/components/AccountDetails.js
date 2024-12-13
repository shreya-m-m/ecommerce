import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../state/Auth/Action';

const initialData = {
  firstname: '',
  lastname: '',
  email: '',
  phone_number: '',
  address: [
    { streetname: '', city: '', state: '', zipcode: '' },
  ],
};

const AccountDetails = () => {
  const [editUser, setEditUser] = useState(initialData);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); // To track selected address
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (auth.user) {
      setEditUser({
        firstname: auth.user.firstname || '',
        lastname: auth.user.lastname || '',
        email: auth.user.email || '',
        phone_number: auth.user.phone_number || '',
        address: [...(auth.user.address || [])], // Clone the address array
      });
    }
  }, [auth.user]);

  const handleSaveChanges = async () => {
    const { address, avatar, ...userWithoutAddress } = editUser; // Exclude address from the payload
    console.log('Updated User Sent to API: ', userWithoutAddress);

  
    try {
      const data = await dispatch(updateUser(auth.user?.user_id, userWithoutAddress));
      console.log('Response from API:', data);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('There was an issue saving your changes. Please try again later.');
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddressIndex(event.target.value);
  };
  const handleFileInputChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;

    if (files && files.length !== 0) {
      const selectedFile = files[0];
      if (selectedFile.size > 800 * 1024) {
        alert('File size should not exceed 800KB.');
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(selectedFile.type)) {
        alert('Invalid file type. Allowed: JPG, GIF, PNG.');
        return;
      }

      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png');
  };


  return (
    <Card>
      <CardContent className="mbe-5">
        <div className="flex max-sm:flex-col items-center gap-6">
          <img height={100} width={100} className="rounded" src={imgSrc} alt="Profile" />
          <div className="flex flex-grow flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button component="label" size="small" variant="contained">
                Upload New Photo
                <input hidden type="file" accept="image/png, image/jpeg" onChange={handleFileInputChange} />
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF, or PNG. Max size of 800KB</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Account Details
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={editUser.firstname}
                onChange={(e) => setEditUser((prev) => ({ ...prev, firstname: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={editUser.lastname}
                onChange={(e) => setEditUser((prev) => ({ ...prev, lastname: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={editUser.email}
                onChange={(e) => setEditUser((prev) => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={editUser.phone_number}
                onChange={(e) => setEditUser((prev) => ({ ...prev, phone_number: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Select
                fullWidth
                value={selectedAddressIndex}
                onChange={handleAddressChange}
              >
                {editUser.address.map((add, index) => (
                  <MenuItem key={index} value={index}>
                    {`${add.streetname}, ${add.city}, ${add.state} ${add.zipcode}`}
                  </MenuItem>
                ))}
              </Select>
              {/* {editUser.address[selectedAddressIndex] && (
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Street Name"
                      value={editUser.address[selectedAddressIndex].streetname || ''}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={editUser.address[selectedAddressIndex].city || ''}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={editUser.address[selectedAddressIndex].state || ''}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      value={editUser.address[selectedAddressIndex].zipcode || ''}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              )} */}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2} mt={3}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
