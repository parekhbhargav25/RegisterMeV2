import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import Chart from '../../components/Charts/Charts'
import PageHeader from '../../components/PageLayout/PageHeader'
import PageWrapper from '../../components/PageLayout/PageWrapper'
import styles from './Dashboard.styles'
import { spark, bar, line, radialBar } from './charts'
import {ListAllBusinesses} from '../../../'
import { Auth } from 'aws-amplify';
import { API, graphqlOperation, Storage } from "aws-amplify";

import { listBusinessProfiles} from "../../../../graphql/queries";

function Dashboard({ title, classes, theme }) {

  const [ProfileData, setUserContext] = useState([]);
  const [DBusinesData, set_B_UserData] = useState([]);
  //----------------
  // const [specificData, setUserDataAgain] = useState([]);
  console.log(DBusinesData);


  useEffect(()=>{
    getDataFromDB();
    getBDataFromDB2()
    // getSpecificProfile();
  },[]);
console.log(ProfileData);

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
  async function getBDataFromDB2() {
    // get user data from AppSync
    const userData = await API.graphql(graphqlOperation(listBusinessProfiles));
    // setUserContext({ userId: userId, uData: currentUser } );
    set_B_UserData(userData.data.listBusinessProfiles.items);
  }
  const OnId = ProfileData.userId;
  console.log(OnId)

  const currentCustID = (DBusinesData.filter(profile => profile.businessProfileID == OnId)
                            .map(filteredPerson => (filteredPerson.businessProfileID))).toString();

  var mvar = 2;
  if (currentCustID === OnId) {
    return (
      <>
        <PageHeader title={title} />
        <PageWrapper>
          <div className={classes.root}>
            <Grid container spacing={24}>
              {/* <Grid item xs={12} md={8} xl={5}>
                <Paper className={classes.paper}>
                  <Chart type="bar" {...bar(theme)} />
                </Paper>
              </Grid> */}
              {/* <Grid item xs={12} md={4} xl={2}>
                <Paper className={classes.paper}>
                  <Chart type="radialBar" {...radialBar(theme)} />
                </Paper>
              </Grid> */}
              <Grid item xs={12} xl={5}>
                <Paper className={classes.paper}>
                  <Chart type="line" {...line(theme)} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </PageWrapper>
      </>
    )
}
else {
  return (
    <ListAllBusinesses/>
  )
}
}

export default withStyles(styles, { withTheme: true })(Dashboard)
