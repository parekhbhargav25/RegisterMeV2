import {
  DashboardRounded,
  InputRounded,
  TitleRounded,
  StarRounded,
  TableChartRounded
} from '@material-ui/icons'

import UpdateIcon from '@material-ui/icons/Update';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
// import { Auth } from 'aws-amplify';
// import React, { useState, useEffect } from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { useParams } from 'react-router-dom';



// async function postData() { 
//   const apiName = 'MyApiName';
//   const path = '/path';
//   const myInit = await Auth.currentAuthenticatedUser();
//   console.log(path);

//   return (apiName, path, myInit);
// }


  // -------------------------------------------------------------------------------------------
 
  //  const updateUser = async (user1) => {
  //     try {
  //       let user = await Auth.currentAuthenticatedUser()
  //       const userId = await user.signInUserSession.accessToken.payload.sub;
  //       user1 = userId;
  //       console.log(user1)
  //     } catch {
  //       console.log('there was an error')
  //     }
  // ------------------------------------------------------------------------------------------------------
      
    // updateUser();  
  

// const userInfo = Auth.currentAuthenticatedUser().then();
// console.log (userInfo);

// const id2= window.topicText

// const [ProfileData, setUserContext] = useState(0);

// useEffect(()=>{
//   getDataFromDB();
// },[]);

// async function getDataFromDB(){
//   const currentUser = await Auth.currentAuthenticatedUser();
//     const userId = await currentUser.signInUserSession.accessToken.payload.sub;
//     console.log(currentUser.attributes.given_name);
//     const user_email = currentUser.attributes.email;
//     const first_name = currentUser.attributes.given_name;
//     const last_name = currentUser.attributes.family_name;
//     // console.log(user_email + ' ' + first_name + ' ' + last_name  )
//     // get user data from AppSync
//     // const userData = await API.graphql(graphqlOperation(getCustomerProfile, { id: userId }));
//     setUserContext({ userId: userId, userEmail: user_email, userFname: first_name, userLname: last_name,  uData: currentUser } );
//     // setUserData(userData.data.listCustomerProfiles.items);
// }

// const schema =  account/notifications/


export default [
  {
    to: '/',
    label: 'Dashboard',
    icon: DashboardRounded
  },
  // {
  //   label: 'Forms',
  //   icon: InputRounded,
  //   multiple: true,
  //   name: 'account/forms',
  //   options: [
  //     {
  //       to: 'account/forms/regular-form',
  //       label: 'Regular Form',
  //       title: 'Regular Form',
  //       icon: StarRounded
  //     },
  //     {
  //       to: 'account/forms/formik-form',
  //       label: 'Formik Form',
  //       title: 'Formik Form',
  //       icon: StarRounded
  //     }
  //   ]
  // },
  {
    label: 'View Appointments',
    icon: UpdateIcon,
    to: 'account/business_View/',
    // multiple: true,
    name: 'business_View',
  },
  {
    label: 'Your Profile',
    icon: AccountCircleIcon,
    to: 'account/business_Profile/',
    // multiple: true,
    name: 'business_Profile',
  },
  {
    label: 'Your Notofications',
    icon: MessageIcon,
    to: 'account/notifications/',
    // multiple: true,
    name: 'profile_Messages',
  },
]
// }

// export default updateUser;