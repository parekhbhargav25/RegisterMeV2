import React, { Fragment } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,  
  Divider,
  Button, 
  Grid 
} from '@material-ui/core';

//Library for Authenticaion API
import { Auth } from "aws-amplify";


//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";

//The mutation file contains all of the code for CRUD operations.
import { createMessages } from "../../../graphql/mutations";
import * as mutations from "../../../graphql/mutations";

import moment from "moment";

//Needed for dispatching the custom email
import emailjs from 'emailjs-com';  


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
  descriptionListIcon: {
    marginBottom: theme.spacing(2),
  },
  marginTop: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    },
  },
}));




// ----------------------------------------
// -------- ConfirmUpdate component -------
// ----------------------------------------
const ConfirmUpdate = (props) => {
  const { 
    handleNext,
    handleBack,
    step1BusinesInfoState,
    servicesState,
    daysOpenState,
    openingTimeState,
    closingTimeState,
    newImageFileName,
    image_chg_success,
    imageValue,
    imageURL,
    updatedProfileData,
    data,
    className, 
    ...rest
  } = props; 
 
  const classes = useStyles();  


  const formatted_phoneNumber = "(" + 
    updatedProfileData.phoneNumber.substring(0,3) + ") " +
    updatedProfileData.phoneNumber.substring(3,6) + "-" +
    updatedProfileData.phoneNumber.substring(6);  
  

  // Email body for successful notification to customer
  const customEmailTemplateParams = {
    from_name: "RegisterMe",
    to_name: "",
    to_email: "",
    message: "You have updated your RegisterMe profile."
  }; 
  
  //Other paramters for emailjs call
  const emailService_id = 'registerme_service';
  const emailTemplate_id = 'updateBusiness_profile';
  const staticUserIDForEmailService = 'user_mgDqT0alR38xWhHX9yiYA';


  const confirmChange = () => {
    saveChangedObject();
    handleNext(); //message
  };

  async function saveChangedObject(){
    var tempVar = JSON.stringify(updatedProfileData.workingHours);
    updatedProfileData.workingHours = tempVar;
    try{
      console.log("*** Finalised object: ", updatedProfileData); 
      await API.graphql(
        graphqlOperation(mutations.updateBusinessProfile, {
          input: updatedProfileData,
        })
      );
    }
    catch(err) {
      console.log("Error saving changes: ", err);
    }
    doNotifications();
  }


  //Create and trigger custom email notification
  async function doNotifications(){
    saveMessageToDb();

    //set up & dispatch email notification to business - (no checks for business)
    customEmailTemplateParams.to_name = updatedProfileData.businessName;
    customEmailTemplateParams.to_email = updatedProfileData.businessEmail;

    try{
      console.log("*** Email parameters: ", customEmailTemplateParams); 
      emailjs.send( emailService_id, emailTemplate_id, customEmailTemplateParams, staticUserIDForEmailService);
    }
    catch(err){
      console.log("Error sending email: ", err);
    }
  }

  //Create notification message in DB
  async function saveMessageToDb(){
    const newMessage = {
      //id: updatedProfileData.id,
      Message: customEmailTemplateParams.message,
      ProfileID: updatedProfileData.businessProfileID
    };
    const tempMsgObj = newMessage;
    try{
      console.log("*** Message being save to DB: ", newMessage); 
      await API.graphql(
        graphqlOperation(createMessages, {
          input: tempMsgObj,
        })
      );
    }
    catch(err) {
      console.log("Error saving message to DB: ", err);
    }
  }


  return (
    <Fragment>      
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Business name" 
            secondary={updatedProfileData.businessName}
          />
        </ListItem>
        <Divider />
    
        <ListItem>
          <ListItemText
            primary="Business address" 
            secondary={updatedProfileData.businessAddress}
          />
        </ListItem>
        <Divider />
      
        <ListItem>
          <ListItemText
            primary="City" 
            secondary={updatedProfileData.city}
          />
        </ListItem>  
        <Divider />
      
        <ListItem>
          <ListItemText
            primary="Province" 
            secondary={updatedProfileData.province}
          />
        </ListItem>  
        <Divider />
      
        <ListItem>
          <ListItemText
            primary="Postal Code" 
            secondary={updatedProfileData.postalCode}
          />
        </ListItem>  
        <Divider />
      
        <ListItem>
          <ListItemText
            primary="Phone number" 
            secondary={formatted_phoneNumber}
          />
        </ListItem>  
        <Divider />
      
      <ListItem>
        <ListItemText
          primary="Services" 
          secondary={
            ((JSON.parse(updatedProfileData.services).checkedHaircut === true) ? "Haircut   |  " : "") + 
            ((JSON.parse(updatedProfileData.services).checkedHairwash === true) ? "Hair wash   |  " : "") + 
            ((JSON.parse(updatedProfileData.services).checkedNail === true) ? "Nail   |  " : "") + 
            ((JSON.parse(updatedProfileData.services).checkedSpa === true) ? "Spa" : "")
          }
               
        />
      </ListItem>  
      <Divider />
      
      <ListItem>
        <ListItemText
          primary="Open Days" 
          secondary={
            ((JSON.parse(updatedProfileData.dayOpen).monday === true) ? "Monday   |  " : "") +
            ((JSON.parse(updatedProfileData.dayOpen).tuesday === true) ? "Tuesday   |  " : "") +
            ((JSON.parse(updatedProfileData.dayOpen).wednesday === true) ? "Wednesday   |  " : "") +
            ((JSON.parse(updatedProfileData.dayOpen).thursday === true) ? "Thursday   |  " : "") + 
            ((JSON.parse(updatedProfileData.dayOpen).friday === true) ? "Friday   |  " : "") + 
            ((JSON.parse(updatedProfileData.dayOpen).saturday === true) ? "Saturday   |  " : "") + 
            ((JSON.parse(updatedProfileData.dayOpen).sunday === true) ? "Sunday" : "")
          }
        />
      </ListItem>  
      <Divider />
      
      <ListItem>
        <ListItemText
          primary="Open Times" 
          secondary={
            "Open:   " + (updatedProfileData.workingHours.openingTime)  + "    |  " +
            "Close: " + (updatedProfileData.workingHours.closingTime)  
              }
               
        />
      </ListItem>  
      <Divider />
      
      <ListItem>
        <ListItemText
          primary="Business Icon File" 
          secondary={ updatedProfileData.businessImg }
               
        />
      </ListItem>
      
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={confirmChange}
          style={{ marginRight: 20 }}
        >
          Confirm & Continue
        </Button>
      </div>
    </Fragment>
  );
};

export default ConfirmUpdate;
