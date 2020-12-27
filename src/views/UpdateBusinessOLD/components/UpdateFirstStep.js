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

const servicesCheckboxItems = [
  { 
    id: 1,
    name: "checkedHaircut",
    value: "checkedHaircut",
    label: 'Haircut',
  },
  {
    id: 2,
    name: "checkedHairwash", 
    value: "checkedHairwash",
    label: 'Hairwash',
  },{ 
    id: 3,
    name: "checkedNail",
    value: "checkedNail",
    label: 'Nail',
  },
  {
    id: 4,
    name: "checkedSpa", 
    value: "checkedSpa",
    label: 'Spa',
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
const UpdateFirstStep = (props) => {  
  const { 
    handleNext,
    handleChange, //may remove after fix "services" checkbox validation
    fieldError, //may remove after fix "services" checkbox validation
    step1BusinesInfoState,
    hasBusinessInfoError,
    handleBusinessInfoChange,
    servicesState, 
    handleServicesChange,
  } = props;

  
  const classes = useStyles(); 

  function disableNextBtn(){
    var disableButton = false;
      //change(s) made - check if valid:
      if (Object.keys(step1BusinesInfoState.touched).length > 0){
        disableButton = (step1BusinesInfoState.isValid)  ? false : true;
          }
      else {
        if (Object.keys(servicesState.touched).length > 0){
          disableButton = (servicesState.isValid)  ? false : true;
        }
      }

    return (disableButton); 
  }


  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Business name"
            label="Business name"
            variant="outlined"
            size="small"
            name="businessName"
            type="businessName"
            value={ step1BusinesInfoState.values.businessName || step1BusinesInfoState.values.data.businessName }
            helperText={ hasBusinessInfoError("businessName")
              ? step1BusinesInfoState.errors.businessName[0]
              : null
            }
            error={hasBusinessInfoError("businessName")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="Phone Number"
            label="Phone Number"
            variant="outlined"
            size="small"
            name="phoneNumber"
            type="phoneNumber" 
            value={ step1BusinesInfoState.values.phoneNumber || step1BusinesInfoState.values.data.phoneNumber }
            helperText={ hasBusinessInfoError("phoneNumber")
              ? step1BusinesInfoState.errors.phoneNumber[0]
              : null
            }
            error={hasBusinessInfoError("phoneNumber")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Business Address"
            variant="outlined"
            size="small"
            name="businessAddress"
            placeholder="Business Address"
            type="businessAddress"
            value={ step1BusinesInfoState.values.businessAddress || step1BusinesInfoState.values.data.businessAddress }
            helperText={ hasBusinessInfoError("businessAddress")
              ? step1BusinesInfoState.errors.businessAddress[0]
              : null
            }
            error={hasBusinessInfoError("businessAddress")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            size="small"
            name="city"
            type="city"
            value={ step1BusinesInfoState.values.city || step1BusinesInfoState.values.data.city }
            helperText={ hasBusinessInfoError("city")
              ? step1BusinesInfoState.errors.city[0]
              : null
            }
            error={hasBusinessInfoError("city")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={false}
            label="Province"
            variant="outlined"
            size="small"
            name="province"
            type="province"
            value={ step1BusinesInfoState.values.province || step1BusinesInfoState.values.data.province }
            helperText={ hasBusinessInfoError("province")
              ? step1BusinesInfoState.errors.province[0]
              : null
            }
            error={hasBusinessInfoError("province")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth={false}
            label="Postal Code"
            variant="outlined"
            size="small"
            name="postalCode"
            type="postalCode"
            value={ step1BusinesInfoState.values.postalCode || step1BusinesInfoState.values.data.postalCode }
            helperText={ hasBusinessInfoError("postalCode")
              ? step1BusinesInfoState.errors.postalCode[0]
              : null
            }
            error={hasBusinessInfoError("postalCode")}
            onChange={ handleBusinessInfoChange }
          />
        </Grid>

        <Grid item xs={12}>
          <div class="form-group services-checked">
            <label class="control-label" for="services-offered-checked"><i>
              Your Services: *
              </i></label>
          </div> 
          <FormGroup row >
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[0].id}
            name={servicesCheckboxItems[0].name}  
            checked = { (servicesState.touched.checkedHaircut === true)
              ? servicesState.values.checkedHaircut
              : servicesState.values.data.services.checkedHaircut }
            color="primary" 
            onChange={handleServicesChange}
            error={fieldError.checkedHaircut !== true}
            />} 
          label={servicesCheckboxItems[0].label} 
          />            
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[1].id}
            name={servicesCheckboxItems[1].name} 
            checked = { (servicesState.touched.checkedHairwash === true)
              ? servicesState.values.checkedHairwash
              : servicesState.values.data.services.checkedHairwash }
            color="primary" 
            onChange={handleServicesChange}
            error={fieldError.checkedHairwash !== true}
            />} 
          label={servicesCheckboxItems[1].label} 
          />           
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[2].id}
            name={servicesCheckboxItems[2].name} 
            checked = { (servicesState.touched.checkedNail === true) ? servicesState.values.checkedNail : servicesState.values.data.services.checkedNail }
            color="primary" 
            onChange={handleServicesChange}
            error={fieldError.checkedNail !== true}
            />} 
          label={servicesCheckboxItems[2].label} 
          />           
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[3].id}
            name={servicesCheckboxItems[3].name} 
            checked = { (servicesState.touched.checkedSpa === true)
              ? servicesState.values.checkedSpa
              : servicesState.values.data.services.checkedSpa }
            color="primary" 
            onChange={handleServicesChange}
            error={fieldError.checkedSpa !== true}
            />} 
          label={servicesCheckboxItems[3].label} 
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
          <div
            style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled={disableNextBtn()}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
    </Fragment>
  );
};

export default UpdateFirstStep;
