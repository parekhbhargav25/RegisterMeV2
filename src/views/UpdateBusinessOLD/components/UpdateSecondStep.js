import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Typography, 
  Grid, 
  Button, 
  FormGroup,
  FormControlLabel, 
  Checkbox 
} from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardTimePicker, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from '@date-io/moment';

//Libray and resources for uploading business profile image
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

var test = new Date().setHours(8,21);

const daysCheckboxItems = [
  { 
    id: 1,
    name: "friday",
    value: "friday",
    label: 'Friday',
  },
  {
    id: 2,
    name: "monday", 
    value: "monday",
    label: 'Monday',
  },
  { 
    id: 3,
    name: "saturday",
    value: "saturday",
    label: 'Saturday',
  },
  {
    id: 4,
    name: "sunday", 
    value: "sunday",
    label: 'Sunday',
  },
  {
    id: 5,
    name: "thursday", 
    value: "thursday",
    label: 'Thursday',
  },
  {
    id: 6,
    name: "tuesday", 
    value: "tuesday",
    label: 'Tuesday',
  },
  {
    id: 7,
    name: "wednesday", 
    value: "wednesday",
    label: 'Wednesday',
  }    
];
const hoursItems = [
  { 
    id: 1,
    name: "closingTime",
    label: 'Closing Time',
  },
  {
    id: 2,
    name: "openingTime", 
    label: 'Opening Time',
  }    
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Destructure props
const UpdateSecondStep = (props) => {
  const { 
    handleNext,
    handleBack,
    handleChange,
    step1BusinesInfoState,
    servicesState,
    daysOpenState,
    handleOpenDaysChange,
    openingTimeState,
    closingTimeState,
    handleOpeningTimeChange,
    handleClosingTimeChange,
    imageValue,
    imageURL,
    onImageChange,
  } = props;
  
  
  const [fields, setFields] = useState(0);  
  const [fieldError, setFieldError] = useState({
    ...fields,
  }); 

  const [isError, setIsError] = useState(false);

  const classes = useStyles();
  const isEmpty = false;

  //testing:
  /*
  console.log("(GENERAL) what's in step1BusinesInfoState? ",step1BusinesInfoState);
  console.log("(GENERAL) what's in servicesState? ",servicesState);
  console.log("(GENERAL) what's in daysOpenState? ",daysOpenState);
  console.log("(GENERAL) what's in openingTimeState? ",openingTimeState);

  console.log("(GENERAL) Difference? in openingTimeState? ",openingTimeState.openingTime === openingTimeState.bkupOpeningTime);
  
  console.log("(GENERAL) check for length of step1BusinesInfoState touched: ", Object.keys(step1BusinesInfoState.touched).length);
  console.log("(GENERAL) check for length of servicesState touched: ", Object.keys(servicesState.touched).length);
  console.log("(GENERAL) check for length of daysOpenState touched: ", Object.keys(daysOpenState.touched).length);
  //console.log("(GENERAL) check for length of touched: ", Object.keys(openingTimeState.touched).length);
  */

  function disableNextBtn(){
    var changeMade = false;
    var changesAreValid;
    changeMade =
      //Check if no change made (result will be false)
      ( Object.keys(step1BusinesInfoState.touched).length === 0
        && Object.keys(servicesState.touched).length === 0
        && Object.keys(daysOpenState.touched).length === 0
        && openingTimeState.openingTime === openingTimeState.bkupOpeningTime
        && closingTimeState.closingTime === closingTimeState.bkupClosingTime   
      ) ? false : true;

      changesAreValid = changeMade;

      //change(s) made - check if valid:
      if(changesAreValid)
        {
          if (Object.keys(step1BusinesInfoState.touched).length > 0){
            changesAreValid = (step1BusinesInfoState.isValid)  ? true : false;
          }
          if (Object.keys(servicesState.touched).length > 0){
            changesAreValid = (servicesState.isValid)  ? true : false;
          }
          if (Object.keys(daysOpenState.touched).length > 0){
            changesAreValid = (daysOpenState.isValid)  ? true : false;
          }
        }

    return changeMade && changesAreValid;
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
              <i>Days Open: *</i>
            </Typography>
          <FormGroup row >          
          <FormControlLabel 
          control={
          <Checkbox
            color="primary" 
            name={daysCheckboxItems[3].name}
            checked = { (daysOpenState.touched !== null && daysOpenState.touched.sunday === true)
              ? daysOpenState.values.sunday
              : daysOpenState.values.data.dayOpen.sunday }
            onChange={handleOpenDaysChange}
            error={fieldError.sunday !== true}
            />} 
          label={daysCheckboxItems[3].label} 
          />              
          <FormControlLabel control={
          <Checkbox 
            color="primary"
            name={daysCheckboxItems[1].name} 
            checked = { (daysOpenState.touched !== null && daysOpenState.touched.monday === true)
              ? daysOpenState.values.monday
              : daysOpenState.values.data.dayOpen.monday}
            onChange={handleOpenDaysChange}
            error={fieldError.monday !== true}
            />} 
          label={daysCheckboxItems[1].label} 
          />           
          <FormControlLabel control={
          <Checkbox 
            color="primary"
            name={daysCheckboxItems[5].name} 
            checked = { (daysOpenState.touched !== null && daysOpenState.touched.tuesday === true)
              ? daysOpenState.values.tuesday
              : daysOpenState.values.data.dayOpen.tuesday}
            onChange={handleOpenDaysChange}
            error={fieldError.tuesday !== true}
            />} 
          label={daysCheckboxItems[5].label} 
          />           
          <FormControlLabel control={
          <Checkbox 
            color="primary"
            name={daysCheckboxItems[6].name} 
            checked = {(daysOpenState.touched !== null && daysOpenState.touched.wednesday === true)
              ? daysOpenState.values.wednesday
              : daysOpenState.values.data.dayOpen.wednesday}
            onChange={handleOpenDaysChange}
            error={fieldError.wednesday !== true}
            />} 
          label={daysCheckboxItems[6].label} 
          />           
          <FormControlLabel control={
          <Checkbox 
            color="primary"
            name={daysCheckboxItems[4].name} 
            checked = {(daysOpenState.touched !== null && daysOpenState.touched.thursday === true)
              ? daysOpenState.values.thursday
              : daysOpenState.values.data.dayOpen.thursday}
            onChange={handleOpenDaysChange}
            error={fieldError.thursday !== true}
            />} 
          label={daysCheckboxItems[4].label} 
          />           
          <FormControlLabel control={
          <Checkbox 
            color="primary" 
            name={daysCheckboxItems[0].name} 
            checked = { (daysOpenState.touched !== null && daysOpenState.touched.friday === true)
              ? daysOpenState.values.friday
              : daysOpenState.values.data.dayOpen.friday}
            onChange={handleOpenDaysChange}
            error={fieldError.friday !== true}
            />} 
          label={daysCheckboxItems[0].label} 
          />         
          <FormControlLabel control={
          <Checkbox 
            color="primary"
            name={daysCheckboxItems[2].name} 
            checked = { (daysOpenState.touched !== null && daysOpenState.touched.saturday === true)
              ? daysOpenState.values.saturday
              : daysOpenState.values.data.dayOpen.saturday}
            onChange={handleOpenDaysChange}
            error={fieldError.saturday !== true}
            />} 
          label={daysCheckboxItems[2].label} 
          />
          </FormGroup>

        </Grid>
 
        <Grid item xs={10} sm={5}>
          <Typography variant="h6" color="textPrimary">
              <i>Opening hours: *</i>
            </Typography>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container justify="space-around">
                <KeyboardTimePicker 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  id="2"
                  label={hoursItems[1].label}
                  name={hoursItems[1].name} 
                  value={ openingTimeState.openingTime }
                  onChange={handleOpeningTimeChange}
                  KeyboardButtonProps={{ "aria-label": "change opening time",}}
                />
                
                <KeyboardTimePicker 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  id="1"
                  label={hoursItems[0].label}
                  name={hoursItems[0].name} 
                  value={ closingTimeState.closingTime }
                  onChange={handleClosingTimeChange}
                  KeyboardButtonProps={{ "aria-label": "change closing time",}}
                />
              </Grid>
          </MuiPickersUtilsProvider>

        </Grid>
        
        <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="default"
                    component="label"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                  >
                    Change Salon Profile Image
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onImageChange}
                    />
                  </Button>
                  <Card
                    className={classes.media}
                    style={
                      imageURL === ""
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                  >
                    <CardMedia
                      component="img"
                      className={classes.image}
                      image={imageURL}
                      alt="Image of salon"
                    />
                  </Card>
                </Grid>

      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!disableNextBtn()}
          color="primary"
          onClick={handleNext}
          style={{ marginRight: 20 }}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default UpdateSecondStep;
