import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import validate from "validate.js";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Avatar from '@material-ui/core/Avatar';
import { useOktaAuth } from "@okta/okta-react";
import Typography from "../../../../../Home/components/ourTeam/Typography";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { listBusinessProfiles } from "../../../../../../graphql/queries";
import * as queries from "../../../../../../graphql/queries";
import { Image, LearnMoreLink } from "../../../../../../components/atoms";



import { API, graphqlOperation } from "aws-amplify";

import { createCustomerProfile as createCustomerProfile } from "../../../../../../graphql/mutations";
// import {getCustomerProfile}  from "../../../../../../graphql/queries";
import { Auth } from 'aws-amplify';
import { id } from "date-fns/locale";



// Auth.currentAuthenticatedUser()
//     .then(user => console.log(user))
//     .catch(err => console.log(err));


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginLeft: '430px',
    marginBottom: '20px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}));




const Profile = (props) => {
  const classes = useStyles();
  const { data1, data, state, className, ...rest } = props;
  // console.log(data1.userEmail); 
  // console.log(data1.userId);
  // console.log(data1.uData);
  console.log(data1);
  console.log(data);


  // const user_email = data1.userEmail;
  // const user_firstName = data1.userFname;
  // const user_lastName = data1.userLname;


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


  // const [formState, setFormState] = React.useState({
  //   isValid: false,
  //   values: {},
  //   touched: {},
  //   errors: {},
  // });


  // const hasError = (field) =>
  //   formState.touched[field] && formState.errors[field] ? true : false;
  const link1 = 'https://robohash.org/' + Math.random()


  var id12 = data1.userId;// customer/business Id
  var onEmail = data1.userEmail // email of authincated user

  function capitalizeNames(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Comparing email from the databse and email of the authincated user and store it in the variable 'currentCustEmail'
  const currentCustEmail = (data.filter(profile => profile.email === onEmail)
    .map(filteredPerson => (filteredPerson.email))).toString();

console.log(currentCustEmail);

  if (onEmail == currentCustEmail) {
    return (
      <div>
        {data.filter(profile => profile.customerProfileID == id12).map(filteredPerson => (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid>
                <Avatar align="center" alt="Remy Sharp" src={link1} className={classes.large} />
                <Typography variant="h5" align="center">
                  {capitalizeNames(filteredPerson.firstName.toLowerCase())} {capitalizeNames(filteredPerson.lastName.toLowerCase())}
                  <Divider />
                </Typography>
                <Typography variant="h6" color="primary" align="center">
                  Toronto, Canada
                            </Typography>
                      </Grid>
                  <TextField
                    placeholder="E-mail"
                    label="E-mail *"
                    variant="outlined"
                    size="medium"
                    name="email"
                    fullWidth
                    readOnly
                    value= {filteredPerson.email}                   
                    type="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="First name"
                    label="First name *"
                    variant="outlined"
                    size="medium"
                    name="firstname"
                    readOnly
                    fullWidth
                    value={capitalizeNames(filteredPerson.firstName.toLowerCase())}
                    type="firstName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    placeholder="Last name"
                    label="Last name *"
                    variant="outlined"
                    size="medium"
                    name="lastname"
                    readOnly
                    fullWidth
                    value={capitalizeNames(filteredPerson.lastName.toLowerCase())}
                    type="lastname"
                  />
                </Grid>

            {/* <Link className="btn btn-info" to={`/businessView/${filteredPerson.id}`}>
                      More Information
                    </Link> */}
            <Button
              style={{ marginLeft: 10 }}
              variant="contained"
              color="primary"
              href={`/update-customer/${id12}`}
            // onClick={ToDo}
            >
              update your profile
                </Button>

          </Grid>
        ))}
      </div>
    );
  }
  else {
    return (
      <div>
        {DBusinesData.filter(profile => profile.businessProfileID == id12)
          .map(profile => (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                    General Details
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  placeholder="E-mail"
                  label="E-mail"
                  variant="outlined"
                  size="medium"
                  name="email"
                  fullWidth
                  type="email"
                  value={profile.businessEmail}
                  readOnly
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  placeholder="Business Name"
                  label="Business Name"
                  variant="outlined"
                  size="medium"
                  name="businessName"
                  fullWidth
                  readOnly
                  type="businessName"
                  value={profile.businessName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  placeholder="Business Address"
                  label="Business Address"
                  variant="outlined"
                  size="medium"
                  name="businessAddress"
                  fullWidth
                  readOnly
                  type="businessAddress"
                  value={profile.businessAddress}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="City"
                  label="City"
                  variant="outlined"
                  size="medium"
                  name="city"
                  fullWidth
                  readOnly
                  type="city"
                  value={profile.city}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Province"
                  label="Province"
                  variant="outlined"
                  size="medium"
                  name="province"
                  fullWidth
                  readOnly
                  type="province"
                  value={profile.province}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Postal Code"
                  label="Postal Code"
                  variant="outlined"
                  size="medium"
                  name="postalCode"
                  fullWidth
                  readOnly
                  type="postalCode"
                  value={profile.postalCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  placeholder="Phone Number"
                  label="Phone Number"
                  variant="outlined"
                  size="medium"
                  name="phoneNumber"
                  fullWidth
                  readOnly
                  type="phoneNumber"
                  value={profile.phoneNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Days Open
                </Typography>
                {console.log("profile.dayOpen.monday")}
                {console.log(profile.dayOpen)}

                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).monday}
                        readOnly
                        name="monday"
                      />
                    }
                    label="Monday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).tuesday}
                        readOnly
                        name="tuesday"
                      />
                    }
                    label="Tuesday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).wednesday}
                        readOnly
                        name="wednesday"
                      />
                    }
                    label="Wednesday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).thursday}
                        readOnly
                        name="thursday"
                      />
                    }
                    label="Thursday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).friday}
                        readOnly
                        name="friday"
                      />
                    }
                    label="Friday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).saturday}
                        readOnly
                        name="saturday"
                      />
                    }
                    label="Saturday"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.dayOpen)).sunday}
                        readOnly
                        name="sunday"
                      />
                    }
                    label="Sunday"
                  />
                </FormGroup>
                <Divider/>
                <Divider/>
                <Divider/>
                <Divider/>
                
                <Grid container spacing={1}>
                <Grid item xs={12} >
                  <Typography variant="h5" color="primary">
                    Business Hours
                  </Typography>
                </Grid>
                  <Grid item xs={2} >
                    <Typography variant="h6" color="textPrimary">
                      Opening time
                    </Typography>
                    <TextField readOnly value={(JSON.parse(profile.workingHours)).openingTime} />
                  </Grid>

                  <Grid item xs={2} >
                    <Typography variant="h6" color="textPrimary">
                      Closing time
                    </Typography>
                     <TextField readOnly value={(JSON.parse(profile.workingHours)).closingTime} />
                  </Grid>
                </Grid>
                <Divider/>
                <Divider/>
                <Divider/>
                <Divider/>
                <Divider/>
              </Grid>


              <Grid item xs={12}>
                <Typography variant="h5" color="primary">
                  Services Selected
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.services)).checkedSpa}
                        readOnly
                        name="checkedSpa"
                      />
                    }
                    label="Spa Treatment"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.services)).checkedHairwash}
                        readOnly
                        name="checkedHairwash"
                      />
                    }
                    label="Hair Wash"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.services)).checkedHaircut}
                        readOnly
                        name="checkedHaircut"
                      />
                    }
                    label="Hair Cut"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(JSON.parse(profile.services)).checkedNail}
                        readOnly
                        name="checkedNail"
                      />
                    }
                    label="Nail Service"
                  />
                </FormGroup>
              </Grid>
              <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="primary"
                href={`/update-business/${id12}`}
              // onClick={ToDo}
              >
                update your profile
            </Button>


            </Grid>
          ))}
      </div>
    );
  }
};

Profile.propTypes = {
  history: PropTypes.object,
};


export default Profile;

// import React, { Fragment, useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Button, TextField } from "@material-ui/core";
// import validate from "validate.js";
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import queryString from 'query-string';
// import Avatar from '@material-ui/core/Avatar';
// import { useOktaAuth } from "@okta/okta-react";
// import Typography from "../../../../../Home/components/ourTeam/Typography";
// import Divider from '@material-ui/core/Divider';
// import Paper from '@material-ui/core/Paper';

// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import moment from "moment";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import { listBusinessProfiles } from "../../../../../../graphql/queries";
// import * as queries from "../../../../../../graphql/queries";
// import { Image, LearnMoreLink } from "../../../../../../components/atoms";



// import { API, graphqlOperation } from "aws-amplify";

// import { createCustomerProfile as createCustomerProfile } from "../../../../../../graphql/mutations";
// // import {getCustomerProfile}  from "../../../../../../graphql/queries";
// import { Auth } from 'aws-amplify';
// import { id } from "date-fns/locale";


// // Auth.currentAuthenticatedUser()
// //     .then(user => console.log(user))
// //     .catch(err => console.log(err));


// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   large: {
//     width: theme.spacing(25),
//     height: theme.spacing(25),
//     marginLeft: '430px',
//     marginBottom: '20px',
//     // display: 'flex',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// }));




// const Profile = (props) => {
//   const classes = useStyles();
//   const { data1, data, state, className, ...rest } = props;
//   // console.log(data1.userEmail); 
//   // console.log(data1.userId);
//   // console.log(data1.uData);
//   console.log(data1);
//   console.log(data);


//   // const user_email = data1.userEmail;
//   // const user_firstName = data1.userFname;
//   // const user_lastName = data1.userLname;


//   const [DBusinesData, set_B_UserData] = useState([]);


//   useEffect(() => {
//     getBDataFromDB();
//   }, []);

//   async function getBDataFromDB() {
//     const currentUser = await Auth.currentAuthenticatedUser();
//     const userId = await currentUser.signInUserSession.accessToken.payload.sub;
//     console.log(userId);
//     // get user data from AppSync
//     const userData = await API.graphql(graphqlOperation(listBusinessProfiles));
//     // setUserContext({ userId: userId, uData: currentUser } );
//     set_B_UserData(userData.data.listBusinessProfiles.items);
//   }

//   console.log(DBusinesData);


//   // const [formState, setFormState] = React.useState({
//   //   isValid: false,
//   //   values: {},
//   //   touched: {},
//   //   errors: {},
//   // });


//   // const hasError = (field) =>
//   //   formState.touched[field] && formState.errors[field] ? true : false;
//   const link1 = 'https://robohash.org/' + Math.random()


//   var id12 = data1.userId;// customer/business Id
//   var onEmail = data1.userEmail // email of authincated user

//   function capitalizeNames(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//   //Comparing email from the databse and email of the authincated user and store it in the variable 'currentCustEmail'
//   const currentCustEmail = (data.filter(profile => profile.email === onEmail)
//     .map(filteredPerson => (filteredPerson.email))).toString();



//   if (onEmail == currentCustEmail) {
//     return (
//       <div>
//         {data.filter(profile => profile.customerProfileID == id12).map(filteredPerson => (
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Grid>
//                 <Avatar align="center" alt="Remy Sharp" src={link1} className={classes.large} />
//                 <Typography variant="h5" align="center">
//                   {capitalizeNames(filteredPerson.firstName.toLowerCase())} {capitalizeNames(filteredPerson.lastName.toLowerCase())}
//                   <Divider />
//                 </Typography>
//                 <Typography variant="h6" color="primary" align="center">
//                   Toronto, Canada
//                             </Typography>
//                       </Grid>
//                   <TextField
//                     placeholder="E-mail"
//                     label="E-mail *"
//                     variant="outlined"
//                     size="medium"
//                     name="email"
//                     fullWidth
//                     readOnly
//                     value= {filteredPerson.email}                   
//                     type="email"
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="First name"
//                     label="First name *"
//                     variant="outlined"
//                     size="medium"
//                     name="firstname"
//                     readOnly
//                     fullWidth
//                     value={capitalizeNames(filteredPerson.firstName.toLowerCase())}
//                     type="firstName"
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="Last name"
//                     label="Last name *"
//                     variant="outlined"
//                     size="medium"
//                     name="lastname"
//                     readOnly
//                     fullWidth
//                     value={capitalizeNames(filteredPerson.lastName.toLowerCase())}
//                     type="lastname"
//                   />
//                 </Grid>

//             {/* <Link className="btn btn-info" to={`/businessView/${filteredPerson.id}`}>
//                       More Information
//                     </Link> */}
//             <Button
//               style={{ marginLeft: 10 }}
//               variant="contained"
//               color="primary"
//             //                   href = {`/account/business_Profile/${id12}`}
//             // onClick={ToDo}
//             >
//               update your profile
//                 </Button>

//           </Grid>
//         ))}
//       </div>
//     );
//   }
//   else {
//     return (
//       <div>
//         {DBusinesData.filter(profile => profile.businessProfileID == id12)
//           .map(profile => (
//             <Grid container spacing={2}>
//               {/* <Image
//                     // {...filteredPerson.image}
//                     // {...filteredBusiness.img}
//                     alt= {filteredBusiness.businessName}
//                     src={filteredBusiness.businessImg}
//                     lazyProps={{ width: "100%", height: "100%" }}
//                /> */}
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="E-mail"
//                     label="E-mail *"
//                     variant="outlined"
//                     readOnly
//                     size="medium"
//                     name="email"
//                     value= {filteredBusiness.businessEmail}                   
//                     fullWidth
//                     type="email"
//                   />
//                 </Grid>
//               </Grid>
            
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="h6" color="textPrimary">
//                     General Details
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="Business Name"
//                     label="Business Name *"
//                     variant="outlined"
//                     size="medium"
//                     name="businessName"
//                     value= {filteredBusiness.businessName}                   
//                     fullWidth
//                     type="businessName"
//                     readOnly
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     placeholder="Business Address"
//                     label="Business Address *"
//                     variant="outlined"
//                     size="medium"
//                     name="businessAddress"
//                     fullWidth
//                     value= {filteredBusiness.businessAddress}
//                     type="businessAddress"
//                     readOnly
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="City"
//                     label="City *"
//                     variant="outlined"
//                     size="medium"
//                     name="city"
//                     fullWidth
//                     value= {filteredBusiness.city}
//                     type="city"
//                     readOnly
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="Province"
//                     label="Province *"
//                     variant="outlined"
//                     size="medium"
//                     name="province"
//                     fullWidth
//                     value= {filteredBusiness.province}
//                     type="province"
//                     readOnly
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="Postal Code"
//                     label="Postal Code *"
//                     variant="outlined"
//                     size="medium"
//                     name="postalCode"
//                     fullWidth
//                     value= {filteredBusiness.postalCode}
//                     type="postalCode"
//                     readOnly
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     placeholder="Phone Number"
//                     label="Phone Number *"
//                     variant="outlined"
//                     size="medium"
//                     name="phoneNumber"
//                     fullWidth
//                     value= {filteredBusiness.phoneNumber}
//                     type="phoneNumber"
//                     readOnly
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={(JSON.parse(profile.dayOpen)).sunday}
//                         readOnly
//                         name="sunday"
//                       />
//                     }
//                     label="Sunday"
//                   />
//                 </FormGroup>

//                 <Grid container spacing={2}>
//                   <Grid item xs={4} >
//                     <Typography variant="h6" color="textPrimary">
//                       Opening time
//                 </Typography>
//                   </Grid>

//                   <Grid item xs={6} >
//                     <TextField readOnly value={(JSON.parse(profile.workingHours)).openingTime} />
//                   </Grid>
//                 </Grid>

//                 <Grid container spacing={2}>
//                   <Grid item xs={4} >
//                     <Typography variant="h6" color="textPrimary">
//                       Closing time
//                 </Typography>
//                   </Grid>

//                   <Grid item xs={6} >
//                     <TextField readOnly value={(JSON.parse(profile.workingHours)).closingTime} />
//                   </Grid>
//                 </Grid>

//                  <Grid item xs={12}>
//                   <Typography variant="h6" color="textPrimary">
//                     Services Offered
//                   </Typography>
//                   <FormGroup row>
//                   <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="checkedSpa"
//                           checked={(JSON.parse(filteredBusiness.services)).checkedSpa}
//                           readOnly
//                         />
//                       }
//                       label="Spa Treatment"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="checkedNail"
//                           checked={(JSON.parse(filteredBusiness.services)).checkedNail}
//                           readOnly
//                         />
//                       }
//                       label="Nail Service"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="checkedHairwash"
//                           checked={(JSON.parse(filteredBusiness.services)).checkedHairwash}
//                           readOnly
//                         />
//                       }
//                       label="Hair Wash"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="checkedHaircut"
//                           checked={(JSON.parse(filteredBusiness.services)).checkedHaircut}
//                           readOnly
//                         />
//                       }
//                       label="Hair Cut"
//                     />
//                   </FormGroup>
//                 </Grid> 

//                  <Grid item xs={12}>
//                   <Typography variant="h6" color="textPrimary">
//                     Days Open
//                   </Typography>
//                   <FormGroup row>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="monday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).monday}
//                         />
//                       }
//                       label="Monday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="tuesday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).tuesday}
//                         />
//                       }
//                       label="Tuesday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="wednesday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).wednesday}
//                         />
//                       }
//                       label="Wednesday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="thursday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).thursday}
//                         />
//                       }
//                       label="Thursday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="friday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).friday}
//                         />
//                       }
//                       label="Friday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="saturday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).saturday}
//                         />
//                       }
//                       label="Saturday"
//                     />
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           name="sunday"
//                           checked={(JSON.parse(filteredBusiness.dayOpen)).sunday}
//                         />
//                       }
//                       label="Sunday"
//                     />
//                   </FormGroup>
//                 </Grid>
//                 <Button
//                   style={{ marginLeft: 10 }}
//                   variant="contained"
//                   color="primary"
//                   href = {`/update-business/${id12}`}
//                   // onClick={ToDo}
//                   >
//                   update your profile
//                 </Button> 
//               </Grid>
//               <Button
//                 style={{ marginLeft: 10 }}
//                 variant="contained"
//                 color="primary"
//                 href={`/update-business/${id12}`}
//               // onClick={ToDo}
//               >
//                 update your profile
//             </Button>


//             </Grid>
//           ))}
//       </div>
//     );
//   }
// };

// Profile.propTypes = {
//   history: PropTypes.object,
// };


// export default Profile;

