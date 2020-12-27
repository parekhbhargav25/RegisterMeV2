//Added import statements for useEffect and useState
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from '../../components/molecules';
import { Section } from '../../components/organisms';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UpdateStepsForm from "./components/UpdateStepsForm";

//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";

//Import all query scripts
import * as queries from  "../../graphql/queries";  //  "../../../../graphql/queries";

//The mutation file contains all of the code for CRUD operations.
import * as mutations from "../../graphql/mutations";  //  "../../../../graphql/mutations";


const useStyles = makeStyles(theme => ({
  root: {},
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 100,
    paddingBottom: 0,
  },
}));


// ----------------------------------------
//TEST profile data passed to this component
//Sample Business Profile
const selectedBusinessProfile = {
  __typename: "BusinessProfile",
  businessAddress: "Shop # 23, Fairview Mall", 
  businessEmail: "deberidines1@mailinator.com", 
  businessImg: "covid-hairdresser-blowdrying.png", 
  businessName: "Deberine's Hair Salon",  
  businessProfileID: "b04ec4f5-12ec-4083-bdbe-e315aa3bc777",
  city: "Toronto",  
  createdAt: "2020-10-15T23:40:01.475Z",
  dayOpen: { 
    friday: true,
    monday: true,
    saturday: true,
    sunday: false,
    thursday: true,
    tuesday: true,
    wednesday: true
  },
  id: "9a54bd0c-7d35-4a47-b054-8d0121f53437",
  phoneNumber: "6479999999",  
  postalCode: "M2J1L4",  
  province: "Ontario",  
  services: {  
    checkedHaircut: true,
    checkedHairwash: true,
    checkedNail: false,
    checkedSpa: false
  },
  updatedAt: "2020-10-15T23:40:01.475Z", 
  workingHours: { 
    closingTime: "6:00 pm",
    openingTime: "10:00 am"
  }
}; 


// ----------------------------------------
//------  UpdateBusiness Component   ------
// ----------------------------------------
const UpdateBusinessOLD = (props) => {
  
  //--Comment: added destruction of properties
  const { className, userid,  } = props;
  const classes = useStyles(); 

  //UserProfile received by component - chged from id to expect profileID
  var currentProfileID = useParams(); //object with id12 property received   
  console.log("User profileID received: ", currentProfileID.id12); //** DEBUG
  
  //To hold the retrieved userProfile
  var businessProfile1; 
  const [loggedInProfile, setLoggedInProfile] = React.useState({
    businessProfile: {},
  });

  getDataFromDB();
/*
  React.useEffect(()=>{
    getDataFromDB();
  },[]);
*/

  //Use the GraphQL query script to get the Business profile data 
  //using the id passed into the component
  async function getDataFromDB() {
    //Try putting in a promise instead:    
    await API.graphql( 
      graphqlOperation(queries.listBusinessProfiles) )
      .then(data => extractLoggedInProfile(data))
      .catch(err => console.log("Error pulling businessProfiles data: ", err))

    /*
    try{
      const profilesData = await API.graphql( graphqlOperation(queries.listBusinessProfiles) );
      console.log("Gonna extract logged in profile now");
      extractLoggedInProfile(profilesData);
      
    }
    catch(err){
      console.log("Error pulling businessProfiles data: ", err);
    } */
  } 


  async function extractLoggedInProfile(profilesData){
       //Extract the required profile from the list of profiles
       const profilesArray = profilesData.data.listBusinessProfiles.items;
       console.log("Profile profilesArray[0] from DB- query result ... dayOpen: ", profilesArray[0].dayOpen);
       //console.log("Profile profilesArray[0] from DB- query result ... dayOpen: ", profilesArray[0]?.dayOpen);
   
     //get the array element with the matching businessProfileID:
     const singleArrayElement = profilesArray.filter( profile => profile.businessProfileID === currentProfileID.id12 )[0];
     console.log("After FILTERED for matching profile: ", singleArrayElement);
   
     //parse the sub-objects within this businessProfile
     var dayOpenTemp = JSON.parse(singleArrayElement.dayOpen);
     var servicesTemp = JSON.parse(singleArrayElement.services); 
     var workingHoursTemp = JSON.parse(singleArrayElement.workingHours);
   
     //Replace the sub-objects in the profile object being used
     singleArrayElement.dayOpen = dayOpenTemp;
     singleArrayElement.services = servicesTemp;
     singleArrayElement.workingHours = workingHoursTemp;
     console.log("After PARSED sub-objects of matching profile: ", singleArrayElement);
   
     //extract the business profile object from this array element:
     businessProfile1 = singleArrayElement;
     /*setLoggedInProfile({
      ...loggedInProfile,
      businessProfile: singleArrayElement,
    }); */
    
    //loggedInProfile = singleArrayElement;
    //console.log("loggedInProfile - query result: ", loggedInProfile);
    console.log("businessProfile1 - query result: ", businessProfile1);
  }


  // --console.log("loggedInProfile - outside the extract function: ", loggedInProfile);

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Update Business Profile"
            subtitle="Make your changes and select Next/Submit."
            titleProps={{
              variant: 'h3',
            }}
          />
        <Paper className={classes.root}>
          <UpdateStepsForm data={selectedBusinessProfile}/>
        </Paper>
        <Divider style={{ marginTop: 100 }} />
        <Typography
          component="p"
          align="center"
          style={{ margin: "10px 0", fontSize: ".75rem" }}
        >
          Built with{" "}
          <span role="img" aria-label="Emojis">
            ❤️
          </span>{" "}
          by the{" "}
          <a href="/home" title="RegisterMe">
            {" "}
            RegisterMe{" "}
          </a>
          team.
        </Typography>
        </div>

      </Section>
    </div>
  );
};

UpdateBusinessOLD.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UpdateBusinessOLD;
