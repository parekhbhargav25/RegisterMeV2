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
import { Auth } from 'aws-amplify';

import UpdateStepsForm from "./components/UpdateStepsForm";

import { API, graphqlOperation } from "aws-amplify";

import {listBusinessProfiles} from  "../../graphql/queries";  

import * as mutations from "../../graphql/mutations";

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



const UpdateBusiness = (props) => {
  
  const { className, userid,  } = props;
  const classes = useStyles(); 

  var currentProfileID = useParams(); 
  console.log("User profileID received: ", currentProfileID.id12); 
  
  var businessProfile1; 
  const [loggedInProfile, setLoggedInProfile] = React.useState({
    businessProfile: {},
  });
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

  console.log(DBusinesData);

  async function extractLoggedInProfile(profilesData){
       const profilesArray = profilesData.data.listBusinessProfiles.items;
       console.log("Profile profilesArray[0] from DB- query result ... dayOpen: ", profilesArray[0].dayOpen);
     const singleArrayElement = profilesArray.filter( profile => profile.businessProfileID === currentProfileID.id12 )[0];
     console.log("After FILTERED for matching profile: ", singleArrayElement);
   
     var dayOpenTemp = JSON.parse(singleArrayElement.dayOpen);
     var servicesTemp = JSON.parse(singleArrayElement.services); 
     var workingHoursTemp = JSON.parse(singleArrayElement.workingHours);
   
     singleArrayElement.dayOpen = dayOpenTemp;
     singleArrayElement.services = servicesTemp;
     singleArrayElement.workingHours = workingHoursTemp;
     console.log("After PARSED sub-objects of matching profile: ", singleArrayElement);
   
     businessProfile1 = singleArrayElement;
    console.log("businessProfile1 - query result: ", businessProfile1);
  }
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
          <UpdateStepsForm data={businessProfile1}/>
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

UpdateBusiness.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UpdateBusiness;
