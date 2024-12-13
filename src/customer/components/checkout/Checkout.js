import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'; 
import ReceiptIcon from '@mui/icons-material/Receipt'; 
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import { useLocation } from 'react-router-dom';
import DeliverryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Details','Order Summary','Payment'];

// Define custom icons for each step
const stepIcons = {
  1: <AccountCircleOutlinedIcon />,
  2: <DeliveryDiningIcon />,
  3: <ReceiptIcon />,
  4: <CurrencyRupeeIcon />,
  
};

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = querySearch.get("step");

  React.useEffect(() => {
    if (step) {
      const stepNumber = parseInt(step, 10); // Convert step from string to number
      if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber < steps.length) {
        setActiveStep(stepNumber);
      }
    }
  }, [step]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const StepIcon = (props) => {
    const { icon, completed } = props;

    // If the step is completed, return a custom completed icon
    if (completed) {
      return <CheckCircleIcon color="success" />;
    }

    // Return the corresponding step icon based on the step number
    return stepIcons[icon];
  };

  return (
    <div className='px-10 lg:px-20 mt-5'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  StepIconComponent={(props) => <StepIcon {...props} icon={index + 1} />}
                  {...labelProps}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              
            </Box>
            <div className='mt-10'>
              {activeStep==2?<DeliverryAddressForm />:<OrderSummary/>}
              
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
