import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import Success from "./Success";

import { Auth } from "aws-amplify";

//The mutation file contains all of the code for CRUD operations.
import { createMessages } from "../../../graphql/mutations";

//Needed for dispatching the custom email
import emailjs from 'emailjs-com';  


//Styles template:
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

// Stepper titles
const labels = ["Provide login email", "Provide code & new password", "Password changed"];

const schema1 = {
    email: {
      presence: { allowEmpty: false, message: 'is required' },
      email: true,
      length: {
        maximum: 300,
      },
    }
};
    
const schema2 = {
    code: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    newPassword: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            minimum: 8,
        },
    },
  };


//Form entry point
const StepsForm = props => {
  
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [userMessage, setUserMessage] = useState({      
    msg: "",
    showUserMsg: false,
  });

  var authPassCode;
  
  //Handling email input on 1st form
  const [form1State, setForm1State] = React.useState({
    values: {
      email: ""
    },
    isValid: true, //start as false
    touched: {},
    errors: {},
  });
  console.log("(2)Checking form1State: ", form1State);

  //Handling code and new password input on 2nd form
  const [form2State, setForm2State] = React.useState({
    values: {
      code: "",
      newPassword: ""
    },
    isValid: true, //start as false
    touched: {},
    errors: {},
  });

  //useEffect() - refreshes the app
  //Same as componentDidMount() in basic React OR onPageLoad()  in HTML
  React.useEffect(() => {
    const errors1 = validate(form1State.values, schema1);
    setForm1State(form1State => ({
      ...form1State,
      isValid: errors1 ? false : true,
      errors: errors1 || {},
    }));
  }, [form1State.values]);

  React.useEffect(() => {
    const errors2 = validate(form2State.values, schema2);
    setForm2State(form2State => ({
      ...form2State,
      isValid: errors2 ? false : true,
      errors: errors2 || {},
    }));
  }, [form2State.values]);

  
  const handleForm1Change = event => {
    event.persist();
    setForm1State(form1State => ({
      ...form1State,
      values: {
        ...form1State.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...form1State.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleForm2Change = event => {
    event.persist();
    setForm2State(form2State => ({
      ...form2State,
      values: {
        ...form2State.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...form2State.touched,
        [event.target.name]: true,
      },
    }));
  };


  //SENT (Submit) confirmation code to user's email 
  async function handleRequestCode(event){
    event.preventDefault();
    console.log("Send button clicked");
    
    //Clear out message field
    setUserMessage(userMessage => ({
        ...userMessage,
        msg: "",
        showUserMsg: false,
        }));
        
    try {
      console.log("isSendingCode: "); // *DEBUG code*
        //Amplify.Auth.resetPassword( values.email);
        await Auth.forgotPassword(form1State.values.email)
        .then(data => handleNext(data)) //console.log(data)
        .catch(err => handleSubmissionError(err)) //console.log(err));
    }
    finally{
        setForm1State(form1State => ({
            ...form1State,
            touched: {
                ...form1State.touched,
                ...form1State.errors,
            },
        }));            
    }    
  }

  // Collect confirmation code and new password from user
  async function handleSubmitSignon(event){
    event.preventDefault();
    
    //Clear out message field
    setUserMessage(userMessage => ({
        ...userMessage,
        msg: "",
        showUserMsg: false,
        }));

    // Collect confirmation code and new password, then
    await Auth.forgotPasswordSubmit(
        form1State.values.email, 
        form2State.values.code, 
        form2State.values.newPassword )
        .then(data => handleNext(data))  //go to succes for since SignIn not working
        //.then(data => signInTheUser(data))
        .catch(err => handleSubmissionError(err)) //console.log(err));
  }

  const hasError1 = (field) =>
    form1State.touched[field] && form1State.errors[field] ? true : false;

  const hasError2 = (field) =>
    form2State.touched[field] && form2State.errors[field] ? true : false;


  // Proceed to next step
  function handleNext(data) {
    setCurrentStep(currentStep + 1);
    authPassCode = data;
  }

  // Sign in user with new password
  async function signInTheUser(successData) {    
    //saveMessageToDb();  -- would need to ge the user profile
      //try{
        console.log("parms sent to SignIn: {0}, {1}", form1State.values.email, form2State.values.newPassword)
          await Auth.signIn(form1State.values.email, form2State.values.newPassword)
          .then(sendEmail()) //console.log("User signed in"))
          .catch( (err) => console.log("Error signing in",err) );
      //}
      //catch(error){
          //console.log("Error signing in", error);
      //}
      sendEmail();
  }

  const handleSubmissionError = (error) =>{
      console.log(error.code);
      switch(error.code){
          case "UserNotFoundException":
              setUserMessage(userMessage => ({
                  ...userMessage,
                  msg: "Email address does not belong to an existing user profile",
                  showUserMsg: true,
                  }));
              break;
          case "LimitExceededException":
              setUserMessage(userMessage => ({
                  ...userMessage,
                  msg: "You have exceeded your sign in attempts limit",
                  showUserMsg: true,
                  }));
              break;
          case "ExpiredCodeException":
              setUserMessage(userMessage => ({
                  ...userMessage,
                  msg: "Your passcode has expired. Please try again",
                  showUserMsg: true,
                  }));
              break;
          default:
              break;
      }
      console.log(userMessage.msg);
  }

   
  // Email body for successful notification to customer
  const customEmailTemplateParams = {
    from_name: "RegisterMe",
    to_name: "",
    to_email: "",
    message: "Your RegisterMe account password has been changed."
  }; 
  
  //Other paramters for emailjs call
  const emailService_id = 'registerme_service';
  const emailTemplate_id = 'updateBusiness_profile'; //same template used
  const staticUserIDForEmailService = 'user_mgDqT0alR38xWhHX9yiYA';

  //Send user notification of change
  async function sendEmail(){
    //set up & dispatch email notification - use first part of email (before '@')
    customEmailTemplateParams.to_name = form1State.values.email.substring( 0, (form1State.values.email).search('@'));
    customEmailTemplateParams.to_email = form1State.values.email;
    console.log("*** Email parameters: ", customEmailTemplateParams); 

    try{
      console.log("*** Email parameters: ", customEmailTemplateParams); 
      emailjs.send( emailService_id, emailTemplate_id, customEmailTemplateParams, staticUserIDForEmailService);
    }
    catch(err){
      console.log("Error sending email: ", err);
    }
  }


  // Provide form for each step
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstForm
            handleForm1Change={handleForm1Change}
            handleRequestCode={handleRequestCode}
            form1State={form1State}
            hasError1={hasError1}
            userMessage={userMessage}
          />
        );
      case 1:
        return (
        <SecondForm
          handleForm2Change={handleForm2Change}
          handleSubmitSignon={handleSubmitSignon}
          form1State={form1State}
          form2State={form2State}
          authPassCode={authPassCode}
          hasError2={hasError2}
          userMessage={userMessage}
        /> 
        );
        case 2:
          sendEmail();
          console.log("*** Going to Success form now ***");
          return (
            <Success />
          );
      default:
        break;
    }
  };

  // Handle components
  return (
    <div className ={classes.root}>

          <Stepper activeStep={currentStep}
            style={{ paddingTop: 30, paddingBottom: 50 }}
            alternativeLabel
          >
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(currentStep)}

    </div>
  );
};

export default StepsForm;