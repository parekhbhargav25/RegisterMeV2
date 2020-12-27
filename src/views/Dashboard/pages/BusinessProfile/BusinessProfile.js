import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section } from '../../../../components/organisms';

import { API, graphqlOperation, Storage } from "aws-amplify";

import { listCustomerProfiles, getCustomerProfile} from "../../../../graphql/queries";
import { updateBusinessProfile } from '../../../../graphql/mutations';
import { Auth } from 'aws-amplify';
import { Profile } from "./components";

const useStyles = makeStyles(theme => ({
  root: {},
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const BusinessProfile = () => {
  const classes = useStyles();
  const [ProfileData, setUserContext] = useState([]);
  const [ProfileData2, setUserData] = useState([]);

  //----------------
  // const [specificData, setUserDataAgain] = useState([]);
  // console.log(specificData);


  useEffect(()=>{
    getDataFromDB();
    getDataFromDB1();
    // getSpecificProfile();
  },[]);



  async function getDataFromDB(){
    const currentUser = await Auth.currentAuthenticatedUser();
      const userId = await currentUser.signInUserSession.accessToken.payload.sub;
      console.log(currentUser);
      const user_email = currentUser.attributes.email;
      const first_name = currentUser.attributes.given_name;
      const last_name = currentUser.attributes.family_name;
      // console.log(user_email + ' ' + first_name + ' ' + last_name  )
      // get user data from AppSync
      // const userData = await API.graphql(graphqlOperation(getCustomerProfile, { id: userId }));
      setUserContext({ userId: userId, userEmail: user_email, userFname: first_name, userLname: last_name,  uData: currentUser } );
      // setUserData(userData.data.listCustomerProfiles.items);
  }




  async function getDataFromDB1(){
    const currentUser = await Auth.currentAuthenticatedUser();
      const userId = await currentUser.signInUserSession.accessToken.payload.sub;
      console.log(userId);
      // get user data from AppSync
      const userData = await API.graphql(graphqlOperation(listCustomerProfiles));
      // setUserContext({ userId: userId, uData: currentUser } );
      setUserData(userData.data.listCustomerProfiles.items);
  }

  // async function getSpecificProfile(){
  //   const currentUser = await Auth.currentAuthenticatedUser();
  //     const userId = await currentUser.signInUserSession.accessToken.payload.sub;
  //     console.log(userId);
  //     // get user data from AppSync
  //     const userData = await API.graphql(graphqlOperation(getCustomerProfile, { customerProfileID: userId }));
  //     // setUserContext({ userId: userId, uData: currentUser } );
  //     setUserDataAgain(userData.data.listCustomerProfiles.items);
  // }

  return (
    <div className={classes.root}>
      <Section>
        <Profile data={ProfileData2} data1={ProfileData}/>
      </Section>
    </div>
  )
 
};

export default BusinessProfile;
