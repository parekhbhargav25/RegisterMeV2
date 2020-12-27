import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

//API and graphqlOperations are the libraries we use to connect to the database
import { API, graphqlOperation } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.
import * as mutations from "../../../../graphql/mutations";
//Import all query scripts
import * as queries from "../../../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const Form = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedTime, setSelectedTime] = React.useState();
  const [appointmentData, setAppointmentData] = React.useState([]);

  const appointmentDetails = {
    appointment_date: selectedDate,
    appointment_time: selectedTime,
  };

  function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    // const steps = getSteps();

    const [formState, setFormState] = React.useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    });

    useEffect(() => {
      getDataFromDB();
    }, []);

    const formatDateTime = (event) => {
      appointmentDetails.appointment_date = moment(
        appointmentDetails.appointment_date
      ).format("YYYY-MM-DD");
      appointmentDetails.appointment_time = moment(
        appointmentDetails.appointment_time
      ).format("hh:mm:ss");
      console.log(appointmentDetails.appointment_date);
      console.log(appointmentDetails.appointment_time);
      saveObject();
    };

    async function saveObject() {
      await API.graphql(
        graphqlOperation(mutations.createAppointment, {
          input: appointmentDetails,
        })
      );
    }

    function printData() {
      console.log(appointmentData);
    }

    async function getDataFromDB() {
      const allTestData = await API.graphql(
        graphqlOperation(queries.listTestDatas)
      );
      setAppointmentData(allTestData.data.listTestDatas.items);
    }
    const handleSubmit = (event) => {
      event.preventDefault();

      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const handleReset = () => {
        setActiveStep(0);
      };

      return (
        <div className={classes.root}>
          <form
            name="password-reset-form"
            method="post"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    // onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedTime}
                    // onChange={handleTimeChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={formatDateTime}
                >
                  Send
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={printData}
                >
                  Console Log Data
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    };
  }
};

export default Form;
