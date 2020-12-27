import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section } from '../../components/organisms';
//Import the libraries to access the DB
import { API, graphqlOperation, Storage } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.

//Import all query scripts
import * as queries from "../../graphql/queries";

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

  useEffect(()=>{
    getDataFromDB();
  },[]);

  async function getDataFromDB(){
    const allAppointmentData = await API.graphql(graphqlOperation(queries.listAppointments));
    setAppointmentData(allAppointmentData.data.listAppointments.items);
  }

  return (
    <div className={classes.root}>
      <Section>
        <Appointment data={appointmentData}/>
      </Section>
    </div>
  )
 
};

export default BusinessViewAppointment;
