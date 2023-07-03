import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  TextField, 
  makeStyles,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import { getAddresses, updateAddresses } from '../services/getAddresses';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '400px',
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: '8px',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  select: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  snackbar: {
    minWidth: '250px',
    marginLeft: '-125px',
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: '2px',
    padding: '16px',
    position: 'fixed',
    zIndex: '1',
    left: '50%',
    bottom: '30px',
  },
  show: {
    display: 'block', // Show the snackbar when needed
    animation: 'fadein 0.5s, fadeout 0.5s 2.5s',
  },
  '@keyframes fadein': {
    from: { top: '0', opacity: '0' },
    to: { top: '30px', opacity: '1' },
  },
  '@keyframes fadeout': {
    from: { top: '30px', opacity: '1' },
    to: { top: '0', opacity: '0' },
  },
}));

const CreateOrder = (email) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zip: '',
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message
  const location = useLocation();
  const { product, quantity } = location.state;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await getAddresses(email);
        setSavedAddresses(addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAddresses = [...savedAddresses, formData];
      setSavedAddresses(updatedAddresses);
      updateAddresses(email, updatedAddresses);
      setFormData({
        name: '',
        contact: '',
        street: '',
        city: '',
        state: '',
        landmark: '',
        zip: '',
      });
  
      setSelectedAddress(formData);
      setIsAddressSelected(true);
    } catch (error) {}
  };
  
  const handleNext = () => {
    if (activeStep === 1 && !isAddressSelected) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmOrder = () => {
    console.log('Placing order...');
    navigate('/products');
    setShowSuccessMessage(true);
    setTimeout(handleCloseSnackbar, 3000);
  };

  const handleCloseSnackbar = () => {
    setShowSuccessMessage(false);
  };

  const steps = ['Product Details', 'Address Details', 'Order Details'];

  const getStepContent = (step) => {
    const totalPrice = product.price * quantity;
    switch (step) {
      case 0:
        return (
          <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '0 0 300px', marginRight: '20px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '10px' }}>
                    {product.name}
                  </Typography>
                </div>
                <Typography variant="body1">Quantity: {quantity}</Typography>
                <Typography variant="body1">Category: {product.category.join(', ')}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="h6" gutterBottom style={{ color: 'red' }}>
                  ₹{totalPrice}
                </Typography>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={classes.container}>
            <Typography variant="h5" gutterBottom>
              Select Address
            </Typography>
            <Select
              value={selectedAddress}
              variant="outlined"
              className={classes.select}
              fullWidth
              onChange={(e) => {
                setSelectedAddress(e.target.value)
                setIsAddressSelected(!!e.target.value);
              }}
              renderValue={(selected) => {
                if (selected) {
                  const address = savedAddresses.find((a) => a === selected);
                  return (
                    <React.Fragment>
                      {address.street}, {address.city}, {address.state} - {address.zip}
                    </React.Fragment>
                  );
                } else {
                  return 'Select an address';
                }
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {savedAddresses.map((address, index) => (
                <MenuItem key={index} value={address}>
                  {address.street}, {address.city}, {address.state} - {address.zip}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h5" className={classes.signUpText}>
              Add Address
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Street"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="City"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="State"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Landmark"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Zip Code"
              variant="outlined"
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
              className={classes.textField}
              fullWidth
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleAddressSubmit}
              >
                SAVE ADDRESS
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={classes.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1">Quantity: {quantity}</Typography>
              <Typography variant="body1">Category: {product.category.join(', ')}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="body1" style={{ color: 'red' }}>
                Total Price: ₹{totalPrice}
              </Typography>
            </div>
            <div style={{ flex: '0 0 50%', marginLeft: '10px' }}>
              <Typography variant="h5" gutterBottom>
                Address Details
              </Typography>
              {isAddressSelected && (
                <div>
                  <Typography variant="body1">{selectedAddress.name}</Typography>
                  <Typography variant="body1">{selectedAddress.contact}</Typography>
                  <Typography variant="body1">{selectedAddress.street}</Typography>
                  <Typography variant="body1">{selectedAddress.city}</Typography>
                  <Typography variant="body1">{selectedAddress.state}</Typography>
                  <Typography variant="body1">{selectedAddress.landmark}</Typography>
                  <Typography variant="body1">{selectedAddress.zip}</Typography>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      );
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <div className={classes.buttonContainer}>
        {activeStep !== 0 && (
          <Button variant="outlined" color="primary" onClick={handleBack} className={classes.button}>
            Back
          </Button>
        )}
        {activeStep === 2 ? (
          <Button variant="contained" color="primary" onClick={handleConfirmOrder} className={classes.button}>
            Confirm Order
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
            Next
          </Button>
        )}
      </div>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Order placed successfully!"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        className={`${classes.snackbar} ${showSuccessMessage ? classes.show : ''}`}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default CreateOrder;
