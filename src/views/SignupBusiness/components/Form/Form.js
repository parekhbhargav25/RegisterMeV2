import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import validate from "validate.js";

//Imports for stepper
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

//Library for Authenticaion API
import { Auth } from "aws-amplify";
//Libray and resources for uploading business profile image
import { Storage } from "aws-amplify";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.
import * as mutations from "../../../../graphql/mutations";

//imports for checkbox
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import emailjs from 'emailjs-com';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  // image: {
  //   height: 160,
  //   width: 177,
  // },
}));

function getSteps() {
  return [
    "Create your business account",
    "Verify your account",
    "Tell us about your business",
  ];
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 300,
    },
  },
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
    },
  },
};

const verificationSchema = {
  verificationCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 20,
    },
  },
};

const businessInfoSchema = {
  businessName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  businessAddress: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  city: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  province: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 120,
    },
  },
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 6,
    },
  },
};

const Form = (props) => {
  const { history} = props;
  const classes = useStyles();
  //variables for stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageValue, setImageValue] = React.useState("");
  const steps = getSteps();
  const [imageUrl, setImageUrl] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  //Set opening to 9:00 AM
  const [openingTime, setOpeningTime] = React.useState(new Date().setHours(9));
  //Set closing to 5:00 PM
  const [closingTime, setClosingTime] = React.useState(new Date().setHours(18));

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [verificationCodeState, setVerificationCodeState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [businessInfoState, setBusinessInfoState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [servicesState, setServicesState] = React.useState({
    checkedHaircut: false,
    checkedNail: false,
    checkedSpa: false,
    checkedHairwash: false,
  });

  const [daysOpenState, setDaysOpenState] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [openHoursState, setOpenHoursState] = React.useState({
    openingTime: new Date().setHours(9,0),
    closingTime: new Date().setHours(18,0),
  });

  const handleCheckboxChange = (event) => {
    setServicesState({
      ...servicesState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOpenDayChange = (event) => {
    setDaysOpenState({
      ...daysOpenState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOpenHourChange = (event) => {
    console.log(event);
    setOpenHoursState({
      ...openHoursState,
      openingTime: event,
    });
  };

  const handleClosingHourChange = (event) => {
    console.log(event);
    setOpenHoursState({
      ...openHoursState,
      closingTime: event,
    });
  };

  const businessDetails = {
    businessProfileID: currentUser,
    businessName: businessInfoState.values.businessName,
    businessAddress: businessInfoState.values.businessAddress,
    businessImg: imageValue,
    phoneNumber: businessInfoState.values.phoneNumber,
    businessEmail: formState.values.email,
    city: businessInfoState.values.city,
    province: businessInfoState.values.province,
    postalCode: businessInfoState.values.postalCode,
    services: JSON.stringify(servicesState),
    dayOpen: JSON.stringify(daysOpenState),
    workingHours: openHoursState,
  };

  React.useEffect(() => {
    const errors = validate(verificationCodeState.values, verificationSchema);
    setVerificationCodeState((verificationCodeState) => ({
      ...verificationCodeState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [verificationCodeState.values]);

  React.useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(() => {
    const errors = validate(businessInfoState.values, businessInfoSchema);
    setBusinessInfoState((businessInfoState) => ({
      ...businessInfoState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [businessInfoState.values]);

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleCodeChange = (event) => {
    event.persist();
    setVerificationCodeState((verificationCodeState) => ({
      ...verificationCodeState,
      values: {
        ...verificationCodeState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...verificationCodeState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBusinessInfoChange = (event) => {
    event.persist();
    setBusinessInfoState((businessInfoState) => ({
      ...businessInfoState,
      values: {
        ...businessInfoState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...businessInfoState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const hasVerificationError = (field) =>
    verificationCodeState.touched[field] && verificationCodeState.errors[field]
      ? true
      : false;

  const hasBusinessInfoError = (field) =>
    businessInfoState.touched[field] && businessInfoState.errors[field]
      ? true
      : false;

  async function signUp(_email, _password, _firstName, _lastName) {
    try {
      var user = await Auth.signUp({
        username: _email,
        password: _password,
        attributes: {
          email: _email,
          given_name: _firstName,
          family_name: _lastName,
        },
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setCurrentUser(user?.userSub);
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  }

  async function confirmSignUp(_username, _code) {
    try {
      await Auth.confirmSignUp(_username, _code);
      signIn();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      alert("Error confirming Account: " + error.message);
    }
  }

  var templateParams = {
    from_name: "RegisterMe",
    to_name: businessDetails.businessName,
    to_email: businessDetails.businessEmail,
    message: "This is a confirmation message for your registered business profile." ,
  }

  async function saveObject() {
    console.log(businessDetails);
    businessDetails.workingHours.openingTime = moment(
      businessDetails.workingHours.openingTime
    ).format("h:mm a");
    businessDetails.workingHours.closingTime = moment(
      businessDetails.workingHours.closingTime
    ).format("h:mm a");
    var temp = JSON.stringify(businessDetails.workingHours);
    businessDetails.workingHours = temp;
    try {
      await API.graphql(
        graphqlOperation(mutations.createBusinessProfile, {
          input: businessDetails,
        })
      );
      emailjs.send('registerme_service', 'cancel_appointment', templateParams, 'user_mgDqT0alR38xWhHX9yiYA')
      history.push("/");
      //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  async function signIn() {
    try {
      await Auth.signIn(formState.values.email, formState.values.password);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function getImageUrl(imageName) {
    var image;
    try {
      image = await Storage.get(imageName);
      setImageUrl(image);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      if (formState.isValid) {
        signUp(
          formState.values.email,
          formState.values.password,
          formState.values.firstName,
          formState.values.lastName
        );
      } else {
        setFormState((formState) => ({
          ...formState,
          touched: {
            ...formState.touched,
            ...formState.errors,
          },
        }));
      }
    }
    if (activeStep === 1) {
      if (verificationCodeState.isValid) {
        confirmSignUp(
          formState.values.email,
          verificationCodeState.values.verificationCode
        );
      } else {
        setVerificationCodeState((verificationCodeState) => ({
          ...verificationCodeState,
          touched: {
            ...verificationCodeState.touched,
            ...verificationCodeState.errors,
          },
        }));
      }
    }
    if (activeStep === 2) {
      console.log(businessInfoState);
      if (businessInfoState.isValid) {
        saveObject();
      } else {
        setBusinessInfoState((businessInfoState) => ({
          ...businessInfoState,
          touched: {
            ...businessInfoState.touched,
            ...businessInfoState.errors,
          },
        }));
      }
    }
  };

  // console.log(servicesState);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function onImageChange(e) {
    const file = e.target.files[0];
    Storage.put(file.name, file, { contentType: "image/png" })
      .then((result) => handleImageChange(file.name))
      .catch((err) => console.log(err));
  }

  const handleImageChange = (e) => {
    setImageValue(e);
    getImageUrl(e);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {activeStep === 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    placeholder="First name"
                    label="First name *"
                    variant="outlined"
                    size="medium"
                    name="firstName"
                    fullWidth
                    helperText={
                      hasError("firstName")
                        ? formState.errors.firstName[0]
                        : null
                    }
                    error={hasError("firstName")}
                    onChange={handleChange}
                    type="firstName"
                    value={formState.values.firstName || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Last name"
                    label="Last name *"
                    variant="outlined"
                    size="medium"
                    name="lastName"
                    fullWidth
                    helperText={
                      hasError("lastName") ? formState.errors.lastName[0] : null
                    }
                    error={hasError("lastName")}
                    onChange={handleChange}
                    type="lastName"
                    value={formState.values.lastName || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="E-mail"
                    label="E-mail *"
                    variant="outlined"
                    size="medium"
                    name="email"
                    fullWidth
                    helperText={
                      hasError("email") ? formState.errors.email[0] : null
                    }
                    error={hasError("email")}
                    onChange={handleChange}
                    type="email"
                    value={formState.values.email || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Password"
                    label="Password *"
                    variant="outlined"
                    size="medium"
                    name="password"
                    fullWidth
                    helperText={
                      hasError("password") ? formState.errors.password[0] : null
                    }
                    error={hasError("password")}
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <i>
                    <Typography variant="subtitle2">
                      Fields that are marked with * sign are required.
                    </Typography>
                  </i>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
            {activeStep === 1 ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Verification Code"
                    label="Verification Code *"
                    variant="outlined"
                    size="medium"
                    name="verificationCode"
                    fullWidth
                    helperText={
                      hasVerificationError("verificationCode")
                        ? verificationCodeState.errors.verificationCode[0]
                        : null
                    }
                    error={hasVerificationError("verificationCode")}
                    onChange={handleCodeChange}
                    type="verificationCode"
                    value={verificationCodeState.values.verificationCode || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <i>
                    <Typography variant="subtitle2">
                      Fields that are marked with * sign are required.
                    </Typography>
                  </i>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
            {activeStep === 2 ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    General Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="default"
                    component="label"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Salon Profile Image
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onImageChange}
                    />
                  </Button>
                  <Card
                    className={classes.media}
                    style={
                      imageUrl === ""
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                  >
                    <CardMedia
                      component="img"
                      className={classes.image}
                      image={imageUrl}
                      alt="Image of salon"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Business Name"
                    label="Business Name *"
                    variant="outlined"
                    size="medium"
                    name="businessName"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("businessName")
                        ? businessInfoState.errors.businessName[0]
                        : null
                    }
                    error={hasBusinessInfoError("businessName")}
                    onChange={handleBusinessInfoChange}
                    type="businessName"
                    value={businessInfoState.values.businessName || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Business Address"
                    label="Business Address *"
                    variant="outlined"
                    size="medium"
                    name="businessAddress"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("businessAddress")
                        ? businessInfoState.errors.businessAddress[0]
                        : null
                    }
                    error={hasBusinessInfoError("businessAddress")}
                    onChange={handleBusinessInfoChange}
                    type="businessAddress"
                    value={businessInfoState.values.businessAddress || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="City"
                    label="City *"
                    variant="outlined"
                    size="medium"
                    name="city"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("city")
                        ? businessInfoState.errors.city[0]
                        : null
                    }
                    error={hasBusinessInfoError("city")}
                    onChange={handleBusinessInfoChange}
                    type="city"
                    value={businessInfoState.values.city || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Province"
                    label="Province *"
                    variant="outlined"
                    size="medium"
                    name="province"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("province")
                        ? businessInfoState.errors.province[0]
                        : null
                    }
                    error={hasBusinessInfoError("province")}
                    onChange={handleBusinessInfoChange}
                    type="province"
                    value={businessInfoState.values.province || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Postal Code"
                    label="Postal Code *"
                    variant="outlined"
                    size="medium"
                    name="postalCode"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("postalCode")
                        ? businessInfoState.errors.postalCode[0]
                        : null
                    }
                    error={hasBusinessInfoError("postalCode")}
                    onChange={handleBusinessInfoChange}
                    type="postalCode"
                    value={businessInfoState.values.postalCode || ""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Phone Number"
                    label="Phone Number *"
                    variant="outlined"
                    size="medium"
                    name="phoneNumber"
                    fullWidth
                    helperText={
                      hasBusinessInfoError("phoneNumber")
                        ? businessInfoState.errors.phoneNumber[0]
                        : null
                    }
                    error={hasBusinessInfoError("phoneNumber")}
                    onChange={handleBusinessInfoChange}
                    type="phoneNumber"
                    value={businessInfoState.values.phoneNumber || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    Services Offered
                  </Typography>
                  <FormGroup row>
                  <FormControlLabel
                      control={
                        <Checkbox
                          checked={servicesState.checkedSpa}
                          onChange={handleCheckboxChange}
                          name="checkedSpa"
                        />
                      }
                      label="Spa Treatment"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={servicesState.checkedHairwash}
                          onChange={handleCheckboxChange}
                          name="checkedHairwash"
                        />
                      }
                      label="Hair Wash"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={servicesState.checkedHaircut}
                          onChange={handleCheckboxChange}
                          name="checkedHaircut"
                        />
                      }
                      label="Hair Cut"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={servicesState.checkedNail}
                          onChange={handleCheckboxChange}
                          name="checkedNail"
                        />
                      }
                      label="Nail Service"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="textPrimary">
                    Days Open
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.monday}
                          onChange={handleOpenDayChange}
                          name="monday"
                        />
                      }
                      label="Monday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.tuesday}
                          onChange={handleOpenDayChange}
                          name="tuesday"
                        />
                      }
                      label="Tuesday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.wednesday}
                          onChange={handleOpenDayChange}
                          name="wednesday"
                        />
                      }
                      label="Wednesday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.thursday}
                          onChange={handleOpenDayChange}
                          name="thursday"
                        />
                      }
                      label="Thursday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.friday}
                          onChange={handleOpenDayChange}
                          name="friday"
                        />
                      }
                      label="Friday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.saturday}
                          onChange={handleOpenDayChange}
                          name="saturday"
                        />
                      }
                      label="Saturday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={daysOpenState.sunday}
                          onChange={handleOpenDayChange}
                          name="sunday"
                        />
                      }
                      label="Sunday"
                    />
                  </FormGroup>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="open-time-picker"
                        label="Opening Time"
                        name="_openingTime"
                        value={openHoursState.openingTime}
                        onChange={handleOpenHourChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />

                      <KeyboardTimePicker
                        margin="normal"
                        id="closing-time-picker"
                        label="Closing Time"
                        name="_closingTime"
                        value={openHoursState.closingTime}
                        onChange={handleClosingHourChange}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <i>
                    <Typography variant="subtitle2">
                      Fields that are marked with * sign are required.
                    </Typography>
                  </i>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Form);
