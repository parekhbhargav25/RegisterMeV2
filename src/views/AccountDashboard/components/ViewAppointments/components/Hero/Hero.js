import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { CardBase } from '../../../../../../components/organisms';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

// Card
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// Accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

// Dialog
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.
import * as mutations from "../../../../../../graphql/mutations";

//THis is where you import useEffect(), and useState()
import React, { useEffect, useState } from "react";

//Import all query scripts
import * as queries from "../../../../../../graphql/queries";

const useStyles = makeStyles(theme => ({
  root: {},
  typed: {
    fontWeight: 'bold',
  },
  secondary: {
    color: 'white'
  },
  centered: {
    color: 'primary',
    fontWeight: 600,
    fontSize: 30
  },
  title: {
    fontWeight: 700,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    fontSize: 24
  },
  content: {
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0.5),
    fontSize: 18
  }
}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  //This is the same as properties in objects
  //First element in the array is the variable where data is stored
  //Second variable is the functi on to store data to the variable
  //React.useState() accepts the variable type, in this case an array. 
  const [appointmentData, setAppointmentData] = useState([]);

  //useEffect() is the same as componenetDidMount() in traditional React. 
  //OR onPageLoad()  in HTML
  //getDataFromDB() is the function
  useEffect(() => {
    getDataFromDB();
  }, []);


  async function getDataFromDB() {
    //Call the GraphQL script to get all data and store in allTestData 
    const allTestData = await API.graphql(
      graphqlOperation(queries.listTestDatas)
    );
    //We store the data from the DB to the variable appointmentData
    setAppointmentData(allTestData.data.listTestDatas.items);
  }

  const [activeAppointment, setActiveAppointment] = React.useState();

  const appointmentToDelete = {
    id: null,
    status: "Cancelled"
  }

  const [open, setOpen] = React.useState(false);

  const handleCancelAppointment = React.useCallback((appID) => {
    setActiveAppointment(appID);
    setOpen(true);
  }, [activeAppointment]);

  const handleReturn = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteObject();
    setOpen(false);
    setTimeout(function() {
      window.location.reload();
    }, 500);
  };

  async function deleteObject() {
    appointmentToDelete.id = activeAppointment;
    await API.graphql(
      graphqlOperation(mutations.updateTestData, {
        input: appointmentToDelete,
      })
    );
  }

  const history = useHistory();

  function bookAppointment() {
    history.push("/salons");
  }

  if (appointmentData[0] != null) {
    if (appointmentData.filter((item) => {
      return item.status == "Active"
    }).length > 0) {
      return (
        // Main grid
        <div className={clsx(classes.root, className)} {...rest}>

          <Dialog disableBackdropClick disableEscapeKeyDown aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title">
              Are you sure you want to cancel this appointment?
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleReturn} color="primary" variant="outlined" startIcon={<KeyboardReturnIcon />}>
                Return
              </Button>
              <Button onClick={handleConfirm} color="secondary" variant="contained" startIcon={<CancelIcon />}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Grid item xs={12} className={classes.searchGrid}>
            <CardBase variant="outlined" withShadow liftUp>
              <Grid container spacing={2}>

                {
                  appointmentData.filter((item) => {
                    return item.status == "Active"
                  }).map((item) =>
                    <Grid item xs={12} md={4}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            {item.businessName}
                          </Typography>
                          <CardMedia
                            component="img"
                            style={{ height: "200px", width: "100%", borderRadius: "15px" }}
                            src={item.businessImg}
                            alt="salon image"
                          />
                          <Typography gutterBottom component="h2" className={classes.content}>
                            {moment(item.dateTime).format('MMM DD, YYYY')} at {moment(item.dateTime).format('h:mm a')}
                          </Typography>
                          <Typography gutterBottom component="h2" className={classes.content}>
                            Duration: {item.duration} minute(s)
                          </Typography>
                          <Typography gutterBottom component="h2" className={classes.content}>
                            Service Type: {item.type}
                          </Typography>
                        </CardContent>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                          </AccordionSummary>
                          <AccordionDetails className={classes.title}>
                            <Typography className={classes.content}>
                              <b>Business Contact</b><br />
                              Phone: {item.businessPhone} <br />
                              Email: {item.businessEmail}
                            </Typography>
                            <Divider />
                            <Typography className={classes.content}>
                              <Button color="primary" variant="contained" onClick={() => handleCancelAppointment(item.id)}>
                                Cancel Appointment
                                </Button>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Card>
                    </Grid>
                  )
                }
              </Grid>
            </CardBase>
          </Grid>
        </div>
      );
    }
    else {
      return (
        <div>
          <Typography className={classes.centered}>
            It looks like you have no active appointments at the moment.
            <Button color="primary" variant="contained" onClick={bookAppointment}>View Available Businesses</Button>
          </Typography>
        </div>
      )
    }
  }
  else {
    return (
      <Box className={classes.content}>
        <CircularProgress size="250px" />
      </Box>
    )
  }
}



Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
