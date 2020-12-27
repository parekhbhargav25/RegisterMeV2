import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section } from '../../../../components/organisms';
//Import the libraries to access the DB
import { API, Auth,  graphqlOperation, Storage } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.

//Import all query scripts
import * as queries from "../../../../graphql/queries";

import { Appointment } from "./components";

const useStyles = makeStyles(theme => ({
  root: {},
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const BusinessViewAppointment = () => {
  const classes = useStyles();
  const [appointmentData, setAppointmentData] = useState([]);
  const [currentUserData, setcurrentUserData] = useState([]);
  const [Userdata, set_C_UserData] = useState([]);
  useEffect(()=>{
    getDataFromDB();
    getBDataFromDB2();
    getCustomerInfo();
    // getDataFromCurrentUser();
    // getBDataFromDB();
    // getCustomerInfo();
  },[]);
  console.log(appointmentData)

  // async function getDataFromCurrentUser(){
  //   const currentUser = await Auth.currentAuthenticatedUser();
  //     const userId = await currentUser.signInUserSession.accessToken.payload.sub;
  //     console.log(userId);
  //     const user_email = currentUser.attributes.email;
  //     const first_name = currentUser.attributes.given_name;
  //     const last_name = currentUser.attributes.family_name;
  //     // console.log(user_email + ' ' + first_name + ' ' + last_name  )
  //     // get user data from AppSync
  //     // const userData = await API.graphql(graphqlOperation(getCustomerProfile, { id: userId }));
  //     setUserData({ userId: userId, userEmail: user_email, userFname: first_name, userLname: last_name,  uData: currentUser } );
  //     // setUserData(userData.data.listCustomerProfiles.items);
  // }


  async function getDataFromDB(){
    const currentUser =  await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;
    setcurrentUserData({ userId: userId });
  }



  async function getBDataFromDB2(){
    const allAppointmentData = await API.graphql(
      graphqlOperation(queries.listAppointments)
    );
    setAppointmentData(allAppointmentData.data.listAppointments.items);
  }



  async function getCustomerInfo(){
      // get user data from AppSync
      const userData = await API.graphql(graphqlOperation(queries.listBusinessProfiles));
      // setUserContext({ userId: userId, uData: currentUser } );
      set_C_UserData(userData.data.listBusinessProfiles.items);
  }

  return (
    <div className={classes.root}>
      <Section>
        <Appointment data={appointmentData} userInfo={currentUserData} userData={Userdata}/>
      </Section>
    </div>
  )
 
};

export default BusinessViewAppointment;