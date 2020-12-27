// import React, { useState, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useState, useEffect } from "react";
import { 
  Typography, 
  Grid, 
  Button, 
  TextField, 
  FormGroup,
  FormControlLabel, 
  Checkbox 
} from '@material-ui/core';
import * as queries from "../../../graphql/queries";
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from "aws-amplify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

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
    Udata
  } = props;

  const {id12} = useParams();
console.log(id12);

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
      <div>
      {Udata.filter(profile => profile.businessProfileID == id12).map(filteredPerson => (
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
            defaultValue={ filteredPerson.businessName}
            // helperText={ hasBusinessInfoError("businessName")
            //   ? step1BusinesInfoState.errors.businessName[0]
            //   : null
            // }
            // error={hasBusinessInfoError("businessName")}
            onChange={handleChange("bName")}
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
            defaultValue={ filteredPerson.phoneNumber}
            helperText={ hasBusinessInfoError("phoneNumber")
              ? step1BusinesInfoState.errors.phoneNumber[0]
              : null
            }
            error={hasBusinessInfoError("phoneNumber")}
            // onChange={ handleBusinessInfoChange }
            onChange={handleChange("Pnumber")}
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
            defaultValue={ filteredPerson.businessAddress}
            helperText={ hasBusinessInfoError("businessAddress")
              ? step1BusinesInfoState.errors.businessAddress[0]
              : null
            }
            error={hasBusinessInfoError("businessAddress")}
            // onChange={ handleBusinessInfoChange }
            onChange={handleChange("bAddress")}
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
            defaultValue={ filteredPerson.city }
            helperText={ hasBusinessInfoError("city")
              ? step1BusinesInfoState.errors.city[0]
              : null
            }
            error={hasBusinessInfoError("city")}
            // onChange={ handleBusinessInfoChange }
            onChange={handleChange("bCity")}
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
            defaultValue={ filteredPerson.province }
            helperText={ hasBusinessInfoError("province")
              ? step1BusinesInfoState.errors.province[0]
              : null
            }
            error={hasBusinessInfoError("province")}
            // onChange={ handleBusinessInfoChange }
            onChange={handleChange("bProvince")}
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
            defaultValue={ filteredPerson.postalCode}
            helperText={ hasBusinessInfoError("postalCode")
              ? step1BusinesInfoState.errors.postalCode[0]
              : null
            }
            error={hasBusinessInfoError("postalCode")}
            // onChange={ handleBusinessInfoChange }
            onChange={handleChange("bPostal")}
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
            checked = {(JSON.parse(filteredPerson.services)).checkedHaircut}
            // checked = { (servicesState.touched.checkedHaircut === true)
            //   ? servicesState.values.checkedHaircut
            //   : servicesState.values.data.services.checkedHaircut }
            color="primary" 
            // onChange={handleServicesChange}
            onChange={handleChange("bHaircut")}
            error={fieldError.checkedHaircut !== true}
            />} 
          label={servicesCheckboxItems[0].label} 
          />            
           <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[1].id}
            name={servicesCheckboxItems[1].name} 
            checked = {(JSON.parse(filteredPerson.services)).checkedHairwash}
            // checked = { (servicesState.touched.checkedHairwash === true)
            //   ? servicesState.values.checkedHairwash
            //   : servicesState.values.data.services.checkedHairwash }
            color="primary" 
            // onChange={handleServicesChange}
            onChange={handleChange("bWash")}
            error={fieldError.checkedHairwash !== true}
            />} 
          label={servicesCheckboxItems[1].label} 
          />           
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[2].id}
            name={servicesCheckboxItems[2].name} 
            checked = {(JSON.parse(filteredPerson.services)).checkedNail}
            // checked = { (servicesState.touched.checkedNail === true)
            //   ? servicesState.values.checkedNail
            //   : servicesState.values.data.services.checkedNail }
            color="primary" 
            // onChange={handleServicesChange}
            onChange={handleChange("bNails")}
            error={fieldError.checkedNail !== true}
            />} 
          label={servicesCheckboxItems[2].label} 
          />           
          <FormControlLabel control={<Checkbox 
            id={servicesCheckboxItems[3].id}
            name={servicesCheckboxItems[3].name} 
            checked = {(JSON.parse(filteredPerson.services)).checkedSpa}
            // checked = { (servicesState.touched.checkedSpa === true)
            //   ? servicesState.values.checkedSpa
            //   : servicesState.values.data.services.checkedSpa }
            color="primary" 
            // onChange={handleServicesChange}
            onChange={handleChange("bSpa")}
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
      ))}
      <Button
              variant="contained"
              color="primary"
              disabled={disableNextBtn()}
              onClick={handleNext}
            >
              Next
            </Button>
      </div>
          
  );
};

export default UpdateFirstStep;
