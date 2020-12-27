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

//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.
import * as mutations from "../../../../graphql/mutations";
//email.js
import emailjs from 'emailjs-com';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
}));

function getSteps() {
  return [
    "Create your account",
    "Verify your account",
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


const Form = (props) => {
  const { history} = props;
  const classes = useStyles();
  //variables for stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();
 
  const [currentUser, setCurrentUser] = React.useState("");

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

  const [messageDelivery, setMessageDelivery] = React.useState({
    email: false,
    profile: false,
  });
  

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

  const handleCheckboxChange = (event) => {
    setMessageDelivery({
      ...messageDelivery,
      [event.target.name]: event.target.checked,
    });
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

  const customerDetails = {
    customerProfileID: currentUser,
    firstName: formState.values.firstName,
    lastName: formState.values.lastName,
    email: formState.values.email,
    messageDelivery: JSON.stringify(messageDelivery)
  };

  
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const hasVerificationError = (field) =>
    verificationCodeState.touched[field] && verificationCodeState.errors[field]
      ? true
      : false;

  async function signUp(_email, _password, _firstName, _lastName) {
    console.log("Here");
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
      saveObject();
      signIn();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      alert("Error confirming Account: " + error.message);
    }
  }

  async function signIn() {
    try {
      await Auth.signIn(formState.values.email, formState.values.password);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  var templateParams = {
    from_name: "RegisterMe",
    to_name: customerDetails.firstName,
    to_email: customerDetails.email,
    message: "This is a confirmation message for your registered customer profile." ,
  }

  async function saveObject() {
    console.log(customerDetails);
    try {
      await API.graphql(
        graphqlOperation(mutations.createCustomerProfile, {
          input: customerDetails,
        })
      );
      emailjs.send('registerme_service', 'cancel_appointment', templateParams, 'user_mgDqT0alR38xWhHX9yiYA')
      history.push("/");
      
      //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.log("Error: " + error.message);
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
  };

  // console.log(servicesState);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
                  <Typography variant="h6" color="textPrimary">
                    Message Delivery
                  </Typography>
                  <FormGroup row>
                  <FormControlLabel
                      control={
                        <Checkbox
                          checked={messageDelivery.email}
                          onChange={handleCheckboxChange}
                          name="email"
                        />
                      }
                      label="Email"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={messageDelivery.profile}
                          onChange={handleCheckboxChange}
                          name="profile"
                        />
                      }
                      label="Profile"
                    />
                  </FormGroup>
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


// import React from "react";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import { Typography, Grid, Button, TextField } from "@material-ui/core";
// import validate from "validate.js";

// //Imports for stepper
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";

// //Library for Authenticaion API
// import { Auth } from "aws-amplify";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return [
//     "Create your account",
//     "Verify your account",
//   ];
// }

// const schema = {
//   email: {
//     presence: { allowEmpty: false, message: "is required" },
//     email: true,
//     length: {
//       maximum: 300,
//     },
//   },
//   firstName: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       maximum: 120,
//     },
//   },
//   lastName: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       maximum: 120,
//     },
//   },
//   password: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       minimum: 6,
//     },
//   },
// };

// const verificationSchema = {
//   verificationCode: {
//     presence: { allowEmpty: false, message: "is required" },
//     length: {
//       maximum: 20,
//     },
//   },
// };


// const Form = (props) => {
//   const classes = useStyles();
//   //variables for stepper
//   const [activeStep, setActiveStep] = React.useState(0);

//   const steps = getSteps();
 
//   const [currentUser, setCurrentUser] = React.useState("");

//   const [formState, setFormState] = React.useState({
//     isValid: false,
//     values: {},
//     touched: {},
//     errors: {},
//   });

//   const [verificationCodeState, setVerificationCodeState] = React.useState({
//     isValid: false,
//     values: {},
//     touched: {},
//     errors: {},
//   });

//   React.useEffect(() => {
//     const errors = validate(verificationCodeState.values, verificationSchema);
//     setVerificationCodeState((verificationCodeState) => ({
//       ...verificationCodeState,
//       isValid: errors ? false : true,
//       errors: errors || {},
//     }));
//   }, [verificationCodeState.values]);

//   React.useEffect(() => {
//     const errors = validate(formState.values, schema);
//     setFormState((formState) => ({
//       ...formState,
//       isValid: errors ? false : true,
//       errors: errors || {},
//     }));
//   }, [formState.values]);


//   const handleChange = (event) => {
//     event.persist();
//     setFormState((formState) => ({
//       ...formState,
//       values: {
//         ...formState.values,
//         [event.target.name]:
//           event.target.type === "checkbox"
//             ? event.target.checked
//             : event.target.value,
//       },
//       touched: {
//         ...formState.touched,
//         [event.target.name]: true,
//       },
//     }));
//   };

//   const handleCodeChange = (event) => {
//     event.persist();
//     setVerificationCodeState((verificationCodeState) => ({
//       ...verificationCodeState,
//       values: {
//         ...verificationCodeState.values,
//         [event.target.name]:
//           event.target.type === "checkbox"
//             ? event.target.checked
//             : event.target.value,
//       },
//       touched: {
//         ...verificationCodeState.touched,
//         [event.target.name]: true,
//       },
//     }));
//   };

  
//   const hasError = (field) =>
//     formState.touched[field] && formState.errors[field] ? true : false;

//   const hasVerificationError = (field) =>
//     verificationCodeState.touched[field] && verificationCodeState.errors[field]
//       ? true
//       : false;

//   async function signUp(_email, _password, _firstName, _lastName) {
//     try {
//       var user = await Auth.signUp({
//         username: _email,
//         password: _password,
//         attributes: {
//           email: _email,
//           given_name: _firstName,
//           family_name: _lastName,
//         },
//       });
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setCurrentUser(user?.userSub);
//     } catch (error) {
//       alert("Error signing up: " + error.message);
//     }
//   }

//   async function confirmSignUp(_username, _code) {
//     try {
//       await Auth.confirmSignUp(_username, _code);
//       signIn();
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     } catch (error) {
//       alert("Error confirming Account: " + error.message);
//     }
//   }

//   async function signIn() {
//     try {
//       await Auth.signIn(formState.values.email, formState.values.password);
//     } catch (error) {
//       console.log("error signing in", error);
//     }
//   }


//   const handleNext = () => {
//     // setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     if (activeStep === 0) {
//       if (formState.isValid) {
//         signUp(
//           formState.values.email,
//           formState.values.password,
//           formState.values.firstName,
//           formState.values.lastName
//         );
//       } else {
//         setFormState((formState) => ({
//           ...formState,
//           touched: {
//             ...formState.touched,
//             ...formState.errors,
//           },
//         }));
//       }
//     }
//     if (activeStep === 1) {
//       if (verificationCodeState.isValid) {
//         confirmSignUp(
//           formState.values.email,
//           verificationCodeState.values.verificationCode
//         );
//       } else {
//         setVerificationCodeState((verificationCodeState) => ({
//           ...verificationCodeState,
//           touched: {
//             ...verificationCodeState.touched,
//             ...verificationCodeState.errors,
//           },
//         }));
//       }
//     }
//   };

//   // console.log(servicesState);

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div className={classes.root}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed
//             </Typography>
//             <Button onClick={handleReset}>Reset</Button>
//           </div>
//         ) : (
//           <div>
//             {activeStep === 0 ? (
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="First name"
//                     label="First name *"
//                     variant="outlined"
//                     size="medium"
//                     name="firstName"
//                     fullWidth
//                     helperText={
//                       hasError("firstName")
//                         ? formState.errors.firstName[0]
//                         : null
//                     }
//                     error={hasError("firstName")}
//                     onChange={handleChange}
//                     type="firstName"
//                     value={formState.values.firstName || ""}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="Last name"
//                     label="Last name *"
//                     variant="outlined"
//                     size="medium"
//                     name="lastName"
//                     fullWidth
//                     helperText={
//                       hasError("lastName") ? formState.errors.lastName[0] : null
//                     }
//                     error={hasError("lastName")}
//                     onChange={handleChange}
//                     type="lastName"
//                     value={formState.values.lastName || ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="E-mail"
//                     label="E-mail *"
//                     variant="outlined"
//                     size="medium"
//                     name="email"
//                     fullWidth
//                     helperText={
//                       hasError("email") ? formState.errors.email[0] : null
//                     }
//                     error={hasError("email")}
//                     onChange={handleChange}
//                     type="email"
//                     value={formState.values.email || ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="Password"
//                     label="Password *"
//                     variant="outlined"
//                     size="medium"
//                     name="password"
//                     fullWidth
//                     helperText={
//                       hasError("password") ? formState.errors.password[0] : null
//                     }
//                     error={hasError("password")}
//                     onChange={handleChange}
//                     type="password"
//                     value={formState.values.password || ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <i>
//                     <Typography variant="subtitle2">
//                       Fields that are marked with * sign are required.
//                     </Typography>
//                   </i>
//                 </Grid>
//               </Grid>
//             ) : (
//               <div></div>
//             )}
//             {activeStep === 1 ? (
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="Verification Code"
//                     label="Verification Code *"
//                     variant="outlined"
//                     size="medium"
//                     name="verificationCode"
//                     fullWidth
//                     helperText={
//                       hasVerificationError("verificationCode")
//                         ? verificationCodeState.errors.verificationCode[0]
//                         : null
//                     }
//                     error={hasVerificationError("verificationCode")}
//                     onChange={handleCodeChange}
//                     type="verificationCode"
//                     value={verificationCodeState.values.verificationCode || ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <i>
//                     <Typography variant="subtitle2">
//                       Fields that are marked with * sign are required.
//                     </Typography>
//                   </i>
//                 </Grid>
//               </Grid>
//             ) : (
//               <div></div>
//             )}
//             <div>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Button
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     className={classes.backButton}
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleNext}
//                   >
//                     {activeStep === steps.length - 1 ? "Finish" : "Next"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Form.propTypes = {
//   history: PropTypes.object,
// };

// export default withRouter(Form);
