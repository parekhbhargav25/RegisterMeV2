import React, { useState, Fragment,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import UpdateFirstSteps from "./UpdateFirstSteps";
import ConfirmUpdate from "./ConfirmUpdate";
import Success from "./Success";


import validate from "validate.js";
import { API, graphqlOperation } from "aws-amplify";

import {listCustomerProfiles} from  "../../../graphql/queries"; 
//For uploading business image to profile
import { Storage } from "aws-amplify"; 
import { Auth } from 'aws-amplify';

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

// Step titles
const labels = ["Update Customer Data", "Confirm your Update"];


const customerInfoSchema = {
  //NB: presence check removed, since doesn't have 
  //    to make a change on each step
  firstName: {
    length: { 
      minimum: 3,
      maximum: 120,
    }
  },
  lastName: {
    length: { 
      minimum: 3,
      maximum: 120,
    }
  },
};
 /* 
const messageDeliverySchema = {
  messageDelivery: {
    presence: { allowEmpty: false, //`${validateMessageDelivery}`, 
                message: ": At least 1 is required"}
  },
}; */


//Form entry point
const UpdateStepsForm = (props) => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);

  const { data } = props; 
  
  const [fields, setFields] = useState({ data });

  // Copy fields as they all have the same name
  const [fieldError, setFieldError] = useState({
    ...fields,
  });

  const [isError, setIsError] = useState(false);

  
  //For creating finalized customer object
  var updatedProfileData;  

  const [step1CustomerInfoState, setStep1CustomerInfoState] = React.useState({
    isValid: false,
    values: { data },
    touched: {},
    errors: {},
  });
  console.log("(GENERAL) what's in step1CustomerInfoState? ",step1CustomerInfoState);

  const [messageDeliveryState, setMessageDeliveryState] = React.useState({
    isValid: false,
    values: { data },
    touched: {},
    errors: {},
  });
  console.log("(GENERAL) what's in messageDeliveryState? ",messageDeliveryState);
  console.log("(GENERAL) messageDeliveryState - touched or not? ",messageDeliveryState.touched);
  console.log("(GENERAL) check for length of touched: ", Object.keys(messageDeliveryState.touched).length);
  
  const [currentUser, setCurrentUser] = React.useState("");

  
  //For validating checkbox selection(s):
  function validateMessageDelivery() {
    var messageDeliveryIsValid = undefined;
    var errorInformation;
    
    //If none of the 2 checkboxes are touched:
    //NB: => Object.keys(objName) == array of properties of object (e.g. ["emailOption", "profileOption"])
    //    => therefore Object.keys(objName).length can tell if object (array) is empty
    if( Object.keys(messageDeliveryState.touched).length === 0 ){  //.length === 0 ){
      console.log("FUNCTION-nothing touched");

      // and option is not yet stored on profile
      if ( messageDeliveryState.values.data.messageDelivery.email === false 
        && messageDeliveryState.values.data.messageDelivery.profile === false ){
          messageDeliveryIsValid = false;
      }
    }
    //if 1 or more checkbox has been touched:
    else {
      console.log("(FUNCTION-What is touched?? ", messageDeliveryState.touched);// **DEBUG
      console.log("(FUNCTION-What is in DB?? ", messageDeliveryState.values.data.messageDelivery);// **DEBUG
 
      //--If both checkboxes touched - then check if they are both set to false
      if( Object.keys(messageDeliveryState.touched).length === 2){
          console.log("FUNCTION-both touched")
          if( messageDeliveryState.touched.emailOption == false && messageDeliveryState.touched.profileOption == false ) 
            messageDeliveryIsValid = false;          
        } 
      else
      {
        console.log("FUNCTION- 1 touched")
        if( Object.keys(messageDeliveryState.touched)[0] === "emailOption" && messageDeliveryState.touched.emailOption == false ){
          //check that profile is not also false 
          if( messageDeliveryState.values.data.messageDelivery.profile == false ) 
              messageDeliveryIsValid = false;
        }
            
        if( Object.keys(messageDeliveryState.touched)[0] === "profileOption" && messageDeliveryState.touched.profileOption == false ) {
          //check that email is not also false
            if( messageDeliveryState.values.data.messageDelivery.email == false ) 
              messageDeliveryIsValid = false;
        }
        
      } // end both checked if/else   
    }  
    //package data for return
    if( messageDeliveryIsValid !== undefined ){
      errorInformation = {
            messageDelivery: [ 
            "Message delivery: At least 1 is required"
          ]
        };
      console.log("My function - errorInformation", errorInformation);
      return errorInformation;
    }
    else{
      console.log("My function - messageDeliveryIsValid", messageDeliveryIsValid);
      return messageDeliveryIsValid;
    }
  }


  React.useEffect( () => {
     const errors = validate(step1CustomerInfoState.values, customerInfoSchema); 
     //const errors2 = validateMessageDelivery();
     console.log("what is in errors? ", errors);
     //console.log("what is in errors2? ", errors2);
     setStep1CustomerInfoState( (step1CustomerInfoState) => ({
       ...step1CustomerInfoState,
       isValid: errors ? false : true,
       errors: errors || {},
     }));
     //setMessageDeliveryState( (messageDeliveryState) => ({
       //...messageDeliveryState,
       //isValid: errors2 ? false : true,
       //errors: errors2 || {},
     //}));
    }, [step1CustomerInfoState.values]//, [messageDeliveryState.values]
  );


  //CHANGE HANDLERS:
  const handleCustomerInfoChange = (event) => {
    event.persist();
    setStep1CustomerInfoState((step1CustomerInfoState) => ({
      ...step1CustomerInfoState,
      values: {
        ...step1CustomerInfoState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...step1CustomerInfoState.touched,
        [event.target.name]: true,
      }
    }));
  };

  const hasCustomerInfoError = (field) =>
  step1CustomerInfoState.touched[field] && 
  step1CustomerInfoState.errors[field]
  ? true
  : false;

  const handleMessageDeliveryChange = (event) => {
    event.persist();
    setMessageDeliveryState( (messageDeliveryState) => ({
      ...messageDeliveryState,
      values: {
        ...messageDeliveryState.values,
        [event.target.name]: 
        event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...messageDeliveryState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasMessageDeliveryError = (field) =>
  messageDeliveryState.touched[field] && 
  messageDeliveryState.errors[field]
  ? true
  : false;

  // Handle fields change  
  const handleChange = (input) => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value,
    });
  

    // Handle errors
    const formErrors = { ...fieldError };

    // set error hook
    Object.values(formErrors).forEach((error) =>
      error.length > 0
      ? setIsError(true) 
      : setIsError(false)
    );
    // set errors hook
    setFieldError({
      ...formErrors,
    });
  };

  //sets up the updatedProfileData object for Confirm and save
  function setupDataToConfirm() { 
    updatedProfileData = {//needed by graphql function
      id: step1CustomerInfoState.values.data.id,
      customerProfileID: step1CustomerInfoState.values.data.customerProfileID, 
      firstName:   
        (step1CustomerInfoState.touched.firstName === true )
        ? step1CustomerInfoState.values.firstName
        : step1CustomerInfoState.values.data.firstName, 
      lastName: 
        (step1CustomerInfoState.touched.lastName === true )
        ? step1CustomerInfoState.values.lastName
        : step1CustomerInfoState.values.data.lastName,
      email: step1CustomerInfoState.values.data.email,
      messageDelivery: JSON.stringify( {  
          email: (messageDeliveryState.touched.emailOption === true )
            ? messageDeliveryState.values.emailOption
            : messageDeliveryState.values.data.messageDelivery.email,
          profile:(messageDeliveryState.touched.profileOption === true )
            ? messageDeliveryState.values.profileOption
            : messageDeliveryState.values.data.messageDelivery.profile
        } ), 
    };
    
  } 


  // Proceed to next step
  const handleNext = () => {
    if (currentStep === 0) { 
      if (step1CustomerInfoState.isValid) {
        //saveObject();
      } else {
        setStep1CustomerInfoState((step1CustomerInfoState) => ({
          ...step1CustomerInfoState,
          touched: {
            ...step1CustomerInfoState.touched,
            ...step1CustomerInfoState.errors,
          },
        }));
      }
    }
    setCurrentStep(currentStep + 1);
  };



  const [DBusinesData, set_B_UserData] = useState([]);


  useEffect(() => {
    getBDataFromDB();
  }, []);

  async function getBDataFromDB() {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = await currentUser.signInUserSession.accessToken.payload.sub;
    console.log(userId);
    // get user data from AppSync
    const userData = await API.graphql(graphqlOperation(listCustomerProfiles));
    // setUserContext({ userId: userId, uData: currentUser } );
    set_B_UserData(userData.data.listCustomerProfiles.items);
  }
  // Go back to prev step
  const handleBack = () => setCurrentStep(currentStep - 1);
  // Provide form for each step
  const handleSteps = (step) => {
    switch (step) {      
      case 0:
        return (
          <UpdateFirstSteps
            handleNext={handleNext}
            handleChange={handleChange}
            step1CustomerInfoState={step1CustomerInfoState}
            hasCustomerInfoError={hasCustomerInfoError}
            handleCustomerInfoChange={handleCustomerInfoChange}
            messageDeliveryState = {messageDeliveryState} 
            hasMessageDeliveryError={hasMessageDeliveryError}
            handleMessageDeliveryChange = {handleMessageDeliveryChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
            Udata = {DBusinesData}
          />
        );
      case 1:
        setupDataToConfirm(); //sets up the updatedProfileData for Confirm and save
        return (
          <ConfirmUpdate
            handleNext={handleNext}
            handleBack={handleBack}
            updatedProfileData={updatedProfileData}
            values={fields}
            id={data.id}
            Udata = {DBusinesData}
          />
        );
      case 2:
        return (
          <Success
            handleNext={handleNext}
            handleBack={handleBack}
            values={fields}
            id={data.id}
          />
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

export default UpdateStepsForm;
