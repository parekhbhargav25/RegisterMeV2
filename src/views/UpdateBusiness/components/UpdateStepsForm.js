import React, { useState, Fragment, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import UpdateFirstStep from "./UpdateFirstStep";
import UpdateSecondStep from "./UpdateSecondStep";
import ConfirmUpdate from "./ConfirmUpdate";
import Success from "./Success";

import validate from "validate.js";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";

import {listBusinessProfiles} from  "../../../graphql/queries"; 
//For uploading business image to profile
import { Storage } from "aws-amplify"; 
import { Auth } from 'aws-amplify';


//Acceptable image types
const imgType1 = RegExp(/^[.PNG]$/i);
const imgType2 = RegExp(/^[.JPG]$/i);
const imgType3 = RegExp(/^[.JPEG]$/i);
const imgType4 = RegExp(/^[.BMP]$/i);

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
const labels = ["Update Business Contact", "Update Appointment Controls", "Confirm your Update"];

var closingDateForTimePicker;

const businessInfoSchema = {
  //NB: presence check removed, since doesn't have 
  //    to make a change on each step
  businessName: {
    length: { 
      minimum: 3,
      maximum: 120,
    }
  },
  phoneNumber: {
    length: { 
      minimum: 10,
      maximum: 10,
    }
  },
  businessAddress: {
    length: { 
      minimum: 10,
      maximum: 120,
    }
  },
  city: {
    length: { minimum: 3,}
  },
  province: {
    length: { minimum: 3,}
  },
  postalCode: {
    length: { 
      minimum: 6,
      maximum: 6,
    }
  },/*
  services: {
    presence: { allowEmpty: false, message: "At least 1 is required"}
  }, */
}



// ----------------------------------------
// ------ UpdateStepsForm entry point -----
// ----------------------------------------
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

  console.log("UpdateStepsForm - passed 'data': ", props);


  //For Time fields: ** Need to change date format saved to DB **
  var tempOpenHour;
  var tempOpenMinute;
  var tempCloseHour;
  var tempCloseMinute;
  
  var updatedProfileData;
  
  
  //Example of expected date format as at Oct 2020 - closingTime: "6:00 pm"
  // if( props.data.workingHours.openingTime !== null 
  //   && props.data.workingHours.openingTime !== "" ){
  //   //Convert string date info to array
  //   var openingDateAsArray = props.data.workingHours.openingTime.split('');
  //   console.log("openingDateAsArray", openingDateAsArray);

  //   //Parse for hour & min values
  //   var hourDelimiterPosition = openingDateAsArray.indexOf(":");
  //   var minuteDelimiterPosition = openingDateAsArray.indexOf(" ");
  //   var hourPart = "";
  //   for(var x=0; x<hourDelimiterPosition; x++){
  //     hourPart += openingDateAsArray[x];
  //   }
  //   var minutePart = "";
  //   for(var x=hourDelimiterPosition+1; x<minuteDelimiterPosition; x++){
  //     minutePart += openingDateAsArray[x];
  //   }
  //   //convert hour & date string to numbers
  //   tempOpenHour = parseInt(hourPart, 10);
  //   tempOpenMinute = parseInt(minutePart, 10);

  //   //If is 'AM' - checking for 'A' in 2nd to last position of array
  //   if(openingDateAsArray[openingDateAsArray.length-2].toUpperCase() === 'P'){
  //     tempOpenHour += 12; //Picker requires 24-hr clock time for PM
  //   } 
  // }
  // else {
  //   //Set as 10 AM
  //   tempOpenHour = 10; tempOpenMinute = 0;
  // }  


  //Example of expected date format as at Oct 2020 - closingTime: "6:00 pm"
  // if( props.data.workingHours.openingTime !== null 
  //   && props.data.workingHours.openingTime !== "" ){
  //   //Convert string date info to array
  //   var closingDateAsArray = props.data.workingHours.closingTime.split('');
  //   console.log("closingDateAsArray", closingDateAsArray);

  //   //Parse for hour & min values
  //   var hourDelimiterPosition = closingDateAsArray.indexOf(":");
  //   var minuteDelimiterPosition = closingDateAsArray.indexOf(" ");
  //   var hourPart = "";
  //   for(var x=0; x<hourDelimiterPosition; x++){
  //     hourPart += closingDateAsArray[x];
  //   }
  //   var minutePart = "";
  //   for(var x=hourDelimiterPosition+1; x<minuteDelimiterPosition; x++){
  //     minutePart += closingDateAsArray[x];
  //   }
  //   //convert hour & date string to numbers
  //   tempCloseHour = parseInt(hourPart, 10);
  //   tempCloseMinute = parseInt(minutePart, 10);
    
  //   //If is 'AM' - checking for 'A' in 2nd to last position of array
  //   if(closingDateAsArray[closingDateAsArray.length-2].toUpperCase() === 'P'){
  //     tempCloseHour += 12; //Picker requires 24-hr clock time for PM
  //   } 
  // }
  // else {         
  //   //Set as 6 PM
  //   tempCloseHour = 18; tempCloseMinute = 0;
  // }


  const [step1BusinesInfoState, setStep1BusinesInfoState] = React.useState({
    isValid: false,
    values: { data },
    touched: {},
    errors: {},
  });
  console.log("what's in step1BusinesInfoState? ",step1BusinesInfoState);

  const [servicesState, setServicesState] = React.useState({
    isValid: false,
    values: { data },
    touched: {},
    errors: false,
  });

  //Step 2 - needed for fields changed:
  const [daysOpenState, setDaysOpenState] = React.useState({
    isValid: false,
    values: { data },
    touched: {},
    errors: false,
  });

  //Step 2: For Time fields: ** Need to change date format saved to DB **
  const [openingTimeState, setOpeningTimeState] = React.useState({  
    openingTime: new Date().setHours(tempOpenHour, tempOpenMinute),
    bkupOpeningTime: new Date().setHours(tempOpenHour, tempOpenMinute), // to check if change made
  });

  const [closingTimeState, setClosingTimeState] = React.useState({ 
    closingTime: new Date().setHours(tempCloseHour, tempCloseMinute),
    bkupClosingTime: new Date().setHours(tempCloseHour, tempCloseMinute), // to check if change made
  });

  
  const [currentUser, setCurrentUser] = React.useState("");

  const [imageURL, setImageURL ] = React.useState("");
  const [imageValue, setImageValue ] = React.useState("");
  
  
  React.useEffect( () => {
     const errors = validate(step1BusinesInfoState.values, businessInfoSchema); 
     setStep1BusinesInfoState( (step1BusinesInfoState) => ({
       ...step1BusinesInfoState,
       isValid: errors ? false : true,
       errors: errors || {},
     }));
     setServicesState( (servicesState) => ({
       ...servicesState,
       isValid: errors ? false : true,
       errors: errors || {},
     }));
     setDaysOpenState( (daysOpenState) => ({
       ...daysOpenState,
       isValid: errors ? false : true,
       errors: errors || {},
     }));
    }, [step1BusinesInfoState.values], [servicesState.values], [daysOpenState.values]);


  //CHANGE HANDLERS:
  const handleBusinessInfoChange = (event) => {
    event.persist();
    setStep1BusinesInfoState((step1BusinesInfoState) => ({
      ...step1BusinesInfoState,
      values: {
        ...step1BusinesInfoState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...step1BusinesInfoState.touched,
        [event.target.name]: true,
      }
    }));
  };

  const hasBusinessInfoError = (field) =>
  step1BusinesInfoState.touched[field] && 
  step1BusinesInfoState.errors[field]
  ? true
  : false;

  const handleServicesChange = (event) => {
    event.persist();
    setServicesState( (servicesState) => ({
      ...servicesState,
      values: {
        ...servicesState.values,
        [event.target.name]: 
        event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...servicesState.touched,
        [event.target.name]: true,
      }
    }));
  };

  const handleOpenDaysChange = (event) => {
    event.persist();
    setDaysOpenState( (daysOpenState) => ({
      ...daysOpenState,
      values: {
        ...daysOpenState.values,
        [event.target.name]: 
        event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...daysOpenState.touched,
        [event.target.name]: true,
      }
    }));
  };
 
  const handleOpeningTimeChange = (input) => {
    setOpeningTimeState({
      ...openingTimeState,
      openingTime: input,
    });
  };

  const handleClosingTimeChange = (input) => {
    setClosingTimeState({
      ...closingTimeState,
      closingTime: input,
      //new_closingTime: testArray,
      //(eg. of _i.format("h:mm a") => gives unchanged time e.g. "6:00 pm"
    });
  };

  function onImageChange(e) {
    const file = e.target.files[0];
    Storage.put(file.name, file, { contentType: "image/png" })
      .then((result) => handleImageChange(file.name))
      .catch((err) => console.log(err));
  }

  const handleImageChange = (e) => {
    setImageValue(e);
    getImageURL(e);
  };

  async function getImageURL(imageName) {
    var image;    
    try {
      image = await Storage.get(imageName);
      setImageURL(image); 
    } catch (error) {
      console.log(error);
    }
  }
  // Handle fields change  
  const handleChange = (input) => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value,
    });
  

    // Handle errors
    const formErrors = { ...fieldError };
    const lengthValidate3 = value.length >= 3;
    const lengthValidate6 = value.length >= 6;
    const lengthValidate10 = value.length >= 10;
    const lengthValidatePhone = value.length == 10;
    const lengthValidatePostalCode = value.length == 6;

    switch (input) {
        case "businessName":
          if(step1BusinesInfoState.touched.businessName){
              formErrors.businessName = lengthValidate3
              ? "Minimum 3 characters required"
              : "";

              console.log("CHANGED businessName: ", value);//DEBUG
              console.log("Original businessName: ",
              step1BusinesInfoState.values.data.businessName);//DEBUG

              var changed =
              (value != step1BusinesInfoState.values.data.businessName)
              ? true 
              : false;
              
              console.log("Changed? :",changed);//DEBUG
              step1BusinesInfoState.values.changeMade = 
              (changed && lengthValidate3);
            }
          break;
        case "businessAddress":
            formErrors.businessAddress = lengthValidate10
            ? "Minimum 10 characters required"
            : "";
            break;
        case "city":
        formErrors.city = lengthValidate6
            ? "Minimum 6 characters required"
            : "";
        break;
        case "postalCode":
        formErrors.postalCode = lengthValidate6
            ? "6 characters required"
            : "";
        break;
        case "province":
            formErrors.province = lengthValidatePostalCode
            ? "Minimum 6 characters required"
            : "";
            break;
        case "phoneNumber":
        formErrors.phoneNumber = lengthValidatePhone
            ? "10 characters required"
            : "";
        break;
        /*
        case "businessImg":
            formErrors.businessImg = imgTypeValidate
            ? ""
            : "Upload a valid image to represent your business";
            break;  */
        case "dayOpen":
            formErrors.dayOpen = 
            (formErrors.dayOpen.friday === false
            && formErrors.dayOpen.monday === false
            && formErrors.dayOpen.saturday === false
            && formErrors.dayOpen.sunday === false
            && formErrors.dayOpen.thursday === false
            && formErrors.dayOpen.tuesday === false
            && formErrors.dayOpen.wednesday === false )
            ? "Your 'Days Open' data is required"
            : "";
            //***Debug
            break;
        case "services":
            formErrors.services = 
            (formErrors.services.checkedHaircut === false
            && formErrors.services.checkedHairwash === false
            && formErrors.services.checkedNail === false
            && formErrors.services.checkedSpa === false )
                ? "Your 'Services' data is required"
                : "";
                console.log("Services error? ", formErrors.services);
                //***Debug
            break;
        case "workingHours":
            formErrors.workingHours =
            (formErrors.workingHours.closingTime == null
            && formErrors.workingHours.openingTime == null )
            ? "Your 'Working Hours' data is required"
            : "";
            //***Debug
            break;
        default:
            break;
    }

    // set error hook
    // Object.values(formErrors).forEach((error) =>
    //   error.length > 0 ? setIsError(true) : setIsError(false)
    // );
    // set errors hook
    setFieldError({
      ...formErrors,
    });
  };

  //sets up the updatedProfileData object for Confirm and save
  // function setupDataToConfirm() { 
  //   updatedProfileData = {
  //     id: step1BusinesInfoState.values.data.id,
  //     businessProfileID: step1BusinesInfoState.values.data.businessProfileID, //needed by graphql function
  //     businessName:   
  //       (step1BusinesInfoState.touched.businessName === true )
  //       ? step1BusinesInfoState.values.businessName
  //       : step1BusinesInfoState.values.data.businessName, 
  //     businessAddress: 
  //       (step1BusinesInfoState.touched.businessAddress === true )
  //       ? step1BusinesInfoState.values.businessAddress
  //       : step1BusinesInfoState.values.data.businessAddress,
  //     businessImg: 
  //       ( imageValue || step1BusinesInfoState.values.data.businessImg ),
  //     phoneNumber: 
  //       (step1BusinesInfoState.touched.phoneNumber === true )
  //       ? step1BusinesInfoState.values.phoneNumber
  //       : step1BusinesInfoState.values.data.phoneNumber,
  //     businessEmail: step1BusinesInfoState.values.data.businessEmail,
  //     city: 
  //       (step1BusinesInfoState.touched.city === true )
  //       ? step1BusinesInfoState.values.city
  //       : step1BusinesInfoState.values.data.city,
  //     province: 
  //     (step1BusinesInfoState.touched.province === true )
  //     ? step1BusinesInfoState.values.province
  //     : step1BusinesInfoState.values.data.province, 
  //     postalCode: 
  //       (step1BusinesInfoState.touched.postalCode === true )
  //       ? step1BusinesInfoState.values.postalCode
  //       : step1BusinesInfoState.values.data.postalCode,
  //     services: JSON.stringify({  
  //         checkedHaircut: (servicesState.touched.checkedHaircut === true )
  //           ? servicesState.values.checkedHaircut
  //           : servicesState.values.data.services.checkedHaircut,
  //         checkedHairwash:(servicesState.touched.checkedHairwash === true )
  //           ? servicesState.values.checkedHairwash
  //           : servicesState.values.data.services.checkedHairwash,
  //         checkedNail: (servicesState.touched.checkedNail === true )
  //           ? servicesState.values.checkedNail
  //           : servicesState.values.data.services.checkedNail,
  //         checkedSpa:(servicesState.touched.checkedSpa === true )
  //           ? servicesState.values.checkedSpa
  //           : servicesState.values.data.services.checkedSpa ,
  //       }),
  //     dayOpen: JSON.stringify({ 
  //         friday: (daysOpenState.touched.friday === true )
  //           ? daysOpenState.values.friday
  //           : daysOpenState.values.data.dayOpen.friday,
  //         monday: (daysOpenState.touched.monday === true )
  //           ? daysOpenState.values.monday
  //           : daysOpenState.values.data.dayOpen.monday,
  //         saturday: (daysOpenState.touched.saturday === true )
  //           ? daysOpenState.values.saturday
  //           : daysOpenState.values.data.dayOpen.saturday,
  //         sunday: (daysOpenState.touched.sunday === true )
  //         ? daysOpenState.values.sunday
  //           : daysOpenState.values.data.dayOpen.sunday,
  //           thursday: (daysOpenState.touched.thursday === true )
  //           ? daysOpenState.values.thursday
  //           : daysOpenState.values.data.dayOpen.thursday,
  //         tuesday: (daysOpenState.touched.tuesday === true )
  //           ? daysOpenState.values.tuesday
  //           : daysOpenState.values.data.dayOpen.tuesday,
  //         wednesday: (daysOpenState.touched.wednesday === true )
  //           ? daysOpenState.values.wednesday
  //           : daysOpenState.values.data.dayOpen.wednesday
  //       }), 
  //     workingHours: {
  //         closingTime: 
  //           moment( closingTimeState.closingTime ).format("h:mm a"), 
  //         openingTime: 
  //           moment( openingTimeState.openingTime ).format("h:mm a"),      
  //       },
  //   };
  // } 


  // Proceed to next step
  const handleNext = () => {
    if (currentStep === 0) { 
      if (step1BusinesInfoState.isValid) {
        //saveObject();
      } else {
        setStep1BusinesInfoState((step1BusinesInfoState) => ({
          ...step1BusinesInfoState,
          touched: {
            ...step1BusinesInfoState.touched,
            ...step1BusinesInfoState.errors,
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
    const userData = await API.graphql(graphqlOperation(listBusinessProfiles));
    // setUserContext({ userId: userId, uData: currentUser } );
    set_B_UserData(userData.data.listBusinessProfiles.items);
  }

  // Go back to prev step
  const handleBack = () => setCurrentStep(currentStep - 1);
  // Provide form for each step
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <UpdateFirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            step1BusinesInfoState={step1BusinesInfoState}
            hasBusinessInfoError={hasBusinessInfoError}
            handleBusinessInfoChange={handleBusinessInfoChange}
            servicesState = {servicesState} 
            handleServicesChange = {handleServicesChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
            Udata = {DBusinesData}
          />
        );
      case 1:
        return (
          <UpdateSecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            step1BusinesInfoState={step1BusinesInfoState}
            servicesState = {servicesState} 
            daysOpenState={daysOpenState}
            handleOpenDaysChange={handleOpenDaysChange}
            openingTimeState={openingTimeState}
            closingTimeState={closingTimeState}
            handleOpeningTimeChange={handleOpeningTimeChange}
            handleClosingTimeChange={handleClosingTimeChange}
            imageValue={imageValue}
            imageURL={imageURL}
            onImageChange={onImageChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
            Udata = {DBusinesData}
          />
        );
      case 2:
        // setupDataToConfirm(); //sets up the updatedProfileData for Confirm and save
        return (
          <ConfirmUpdate
            handleNext={handleNext}
            handleBack={handleBack}
            step1BusinesInfoState={step1BusinesInfoState}
            servicesState = {servicesState} 
            daysOpenState={daysOpenState}
            openingTimeState={openingTimeState}
            closingTimeState={closingTimeState}
            imageValue={imageValue}
            imageURL={imageURL}
            updatedProfileData={updatedProfileData}
            values={fields}
            // id={data.id}
            Udata = {DBusinesData}
          />
        );
        case 3:
          console.log("*** Going to Success form now ***");
          return (
            <Success
              handleNext={handleNext}
              handleBack={handleBack}
              step1BusinesInfoState={step1BusinesInfoState}
              daysOpenState={daysOpenState}
              openingTimeState={openingTimeState}
              closingTimeState={closingTimeState}
              values={fields}
              // id={data.id}
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
