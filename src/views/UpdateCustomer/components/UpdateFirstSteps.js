import React, { useState, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
  Grid, 
  Button, 
  TextField, 
  FormGroup,
  FormControlLabel, 
  Checkbox 
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const checkboxItems = [
  { 
    id: 1,
    name: "emailOption",
    value: "email",
    label: 'Send messages to my email',
  },
  {
    id: 2,
    name: "profileOption", 
    value: "profile",
    label: 'Save messages to profile',
  }    
];


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  //Added with stepper
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

//FIRST STEP ENTRY POINT:
const UpdateFirstSteps = (props) => {  
  const { 
    handleNext,
    handleChange, //may remove after fix "messageDelivery" checkbox validation
    fieldError, //may remove after fix "messageDelivery" checkbox validation
    isError,
    step1CustomerInfoState,
    hasCustomerInfoError,
    handleCustomerInfoChange,
    messageDeliveryState, 
    hasMessageDeliveryError,
    handleMessageDeliveryChange,
    Udata
  } = props;
  
  console.log("ERRORS??? ", isError); // *DEBUG*
  const {id12} = useParams();
console.log(id12);

console.log(Udata);

  // {Udata.filter(profile => profile.businessProfileID == id12).map(filteredPerson => (

  return (
    <Fragment>
      {Udata.filter(profile => profile.customerProfileID == id12).map(filteredPerson => (
      <Grid container spacing={2} noValidate>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="First name"
            label="First name *"
            variant="outlined"
            size="small"
            name="firstName"
            type="firstName"
            value={ step1CustomerInfoState.values.firstName || step1CustomerInfoState.values.data.firstName }
            helperText={ hasCustomerInfoError("firstName")
              ? step1CustomerInfoState.errors.firstName[0]
              : null
            }
            error={hasCustomerInfoError("firstName")}
            onChange={ handleCustomerInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Last name"
            label="Last name *"
            variant="outlined"
            size="small"
            name="lastName"
            type="lastName" 
            value={ step1CustomerInfoState.values.lastName || step1CustomerInfoState.values.data.lastName }
            helperText={ hasCustomerInfoError("lastName")
              ? step1CustomerInfoState.errors.lastName[0]
              : null
            }
            error={hasCustomerInfoError("lastName")}
            onChange={ handleCustomerInfoChange }
          />
        </Grid>

        <Grid item xs={12}>
          <div class="form-group messageDelivery-checked">
            <label class="control-label" for="messageDelivery-checked"><i>
              Your Message Delivery options: *
              </i></label>
          </div> 
          <FormGroup row >
          <FormControlLabel control={<Checkbox 
            id={checkboxItems[0].id}
            name={checkboxItems[0].name}  
            checked = { (messageDeliveryState.touched.emailOption === true)
              ? messageDeliveryState.values.emailOption
              : messageDeliveryState.values.data.messageDelivery.email }
            color="primary" 
            onChange={handleMessageDeliveryChange}
            helperText={ hasMessageDeliveryError("messageDelivery")
              ? messageDeliveryState.errors.messageDelivery[0]
              : null
            }
            error={hasMessageDeliveryError("messageDelivery")}

            />} 
          label={checkboxItems[0].label} 
          />            
          <FormControlLabel control={<Checkbox 
            id={checkboxItems[1].id}
            name={checkboxItems[1].name} 
            checked = { (messageDeliveryState.touched.profileOption === true)
              ? messageDeliveryState.values.profileOption
              : messageDeliveryState.values.data.messageDelivery.profile }
            color="primary" 
            onChange={handleMessageDeliveryChange}
            helperText={ hasMessageDeliveryError("messageDelivery")
              ? messageDeliveryState.errors.messageDelivery[0]
              : null
            }
            error={hasMessageDeliveryError("messageDelivery")}
            />} 
          label={checkboxItems[1].label} 
          />           
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <i>
            <Typography variant="subtitle2" color="primary">
              Fields that are marked with * sign are required.
            </Typography>
          </i>
        </Grid>

      </Grid>
      ))} 
          <div
            style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={( (Object.keys(step1CustomerInfoState.touched).length === 0) 
                      && (Object.keys(messageDeliveryState.touched).length === 0) )
              || ( (Object.keys(step1CustomerInfoState.touched).length > 0) 
                  && !step1CustomerInfoState.isValid ) }
            >
              Next
            </Button>
          </div>
    </Fragment>
  );
};

export default UpdateFirstSteps;
