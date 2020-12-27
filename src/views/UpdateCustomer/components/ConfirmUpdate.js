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

//Library for Authentication API
import { Auth } from "aws-amplify";


//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";

//The mutation file contains all of the code for CRUD operations.
import { createMessages } from "../../../graphql/mutations";
import * as mutations from "../../../graphql/mutations";

//import { updateCustomerProfile } from "../../../graphql/mutations";

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


// Destructure props
const ConfirmUpdate = (props) => {
  const { 
    handleNext,
    handleBack,
    updatedProfileData,
    data,
    className, 
    ...rest
  } = props; 
 
  const classes = useStyles();  

  console.log("UPDATE-PROFILE-DATA readied?? ",updatedProfileData); // *DEBUG*
  
  // Email body for successful notification to customer
  const customEmailTemplateParams = {
    from_name: "RegisterMe",
    to_name: "",
    to_email: "",
    message: "You have updated your RegisterMe profile."
  }; 
  
  //Other paramters for emailjs call
  const emailService_id = 'registerme_service';
  const emailTemplate_id = 'updateBusiness_profile'; //template is the same
  const staticUserIDForEmailService = 'user_mgDqT0alR38xWhHX9yiYA';

  const profileWithoutMessageDelivery = {
    id: updatedProfileData.id, 
    email: updatedProfileData.email,
    firstName: updatedProfileData.firstName,  
    lastName: updatedProfileData.lastName, 
    customerProfileID: updatedProfileData.customerProfileID,
  };  
  //console.log("profileWithoutMessageDelivery readied?? ",profileWithoutMessageDelivery); // *DEBUG*
  console.log("With MessageDelivery readied?? ",updatedProfileData); // *DEBUG*


  const confirmChange = () => {
    saveChangedObject();
    handleNext();  //message
  };

  async function saveChangedObject(){   
    try{
      console.log("**** Finalised object: ", updatedProfileData); //profileWithoutMessageDelivery);
      await API.graphql(
        graphqlOperation(mutations.updateCustomerProfile, {
          input: updatedProfileData //took out messageDelivery
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

    //set up & dispatch email notification to customer - (no checks for business)
    customEmailTemplateParams.to_name = updatedProfileData.firstName;
    customEmailTemplateParams.to_email = updatedProfileData.email;

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
      ProfileID: updatedProfileData.customerProfileID
    }; 
    
    try{
      console.log("*** Message being save to DB: ", newMessage); 
      await API.graphql(
        graphqlOperation(mutations.createMessages, {
          input: newMessage,
        })
      );
    }
    catch(err) {
      console.log("Error saving message to DB: ", err);
    }
  }


  // -- Render ConfirmUpdate form
  return (
    <Fragment>      
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="First name" 
            secondary={updatedProfileData.firstName}
          />
        </ListItem>
        <Divider />
      
        <ListItem>
          <ListItemText
            primary="Last name" 
            secondary={updatedProfileData.lastName}
          />
        </ListItem>  
        <Divider />
      
      <ListItem>
        <ListItemText
          primary="Message Delivery selection(s):" 
          secondary={<ul>
            <li>
            {"Send notifications to my email:  "+ ((updatedProfileData.messageDelivery.email === true) ? "YES" : "NO")} </li>
            <li> 
               {"Save messages to my profile:  "+ ((updatedProfileData.messageDelivery.profile === true) ? "YES" : "NO")}</li>
          </ul>
          }               
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
