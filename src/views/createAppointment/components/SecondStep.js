import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Confirm from "./Confirm"

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
//Imports for calendar
import { getDay } from 'date-fns'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import moment from 'moment'

import * as queries from "../../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import { listAppointments } from "../../../graphql/queries";

const modifiersClassNames = {
  highlight: '-highlight'
}


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// Destructure props
const SecondStep = ({
  businessInfo,
  handleNext,
  handleBack,
  handleChange,
  values: { phone, city, time, note, date, appodatatime },
  filedError,
  isError,
}) => {
  // console.log(phone, )
  const classes = useStyles();
  const [apptDate, setApptDate] = useState();
  const [apptTime, setApptTime] = useState();
  const [allButtons, setAllButtons] = useState();
  const [dayClosed, setDayClosed] = useState(0);
  const [formattedDate, setFormattedDate] = useState();
  const [allAppointments, setAllAppointments] = useState([]);

  /**
   * Modifier for calendar. 
   */
  const modifiers = {
    disabled: date => getDay(date) === dayClosed,
  }

  /**
   * Functions called on page load
   */
  useEffect(() => {
    setDaysClosed();
    getDataFromDB();
  }, [dayClosed]);

  let content = [];
  let appointments = [];
  let buttons;

  /**
   * Fetch all exisiting appointments from the DB.
   */
  async function getDataFromDB() {
    const allAppts = await API.graphql(
      graphqlOperation(queries.listAppointments)
    );
    let tmp = allAppts.data.listAppointments.items;
    filterAppointments(tmp);
  }

  /**
   * Filter all appointments.
   * Push the ones with the current business ID to the array "appointments"
   */
  function filterAppointments(tmp) {
    console.log(businessInfo.location.state.businessProfileID);
    
    for (let i = 0; i < tmp.length; i++) {
      //console.log(tmp[i].BusinessID);
      if (tmp[i].BusinessID.replace(/['"]+/g, '') === businessInfo.location.state.businessProfileID) {
        appointments.push(tmp[i]);
        console.log("Found matching ID");
      }
    }
    setAllAppointments(appointments);
  }

  
  /**
   * Checks which day the business is closed. 
   * Stores the value to the variable "dayClosed".
   */
  function setDaysClosed() {
    let daysOpen = JSON.parse(businessInfo.location.state.dayOpen);
    console.log(daysOpen);
    for (const day in daysOpen) {
      if (daysOpen[day] === false) {
        switch (day) {
          case "monday":
            setDayClosed(1);
            break;
          case "tuesday":
            setDayClosed(2);
            break;
          case "wednesday":
            setDayClosed(3);
            break;
          case "thursday":
            setDayClosed(4);
            break;
          case "friday":
            setDayClosed(5);
            break;
          case "saturday":
            setDayClosed(6);
            break;
          case "sunday":
            setDayClosed(7);
            break;
          default:
            setDayClosed(0);
        }
      }
    }
  }

  /**
   * Handles on click for calendar.
   * Coverts selected date to a friendly format.
   * Call "calculateApptTimes" to generate buttons with times. 
   */
  function onDateChange(event) {
    let temp = format(event, 'yyyy-MM-dd', { locale: enGB })
    setApptDate(event);
    setFormattedDate(temp);
    calculateApptTimes(temp);
  }

  /**
   * Dynamically generates buttons for appointment times.
   * If an appointment already exists on the selected date, the time slot will be skipped. 
   */
  function calculateApptTimes(temp) {
    console.log(temp);
    console.log(allAppointments);
    let invalidTimes = [];
    for (let i = 0; i < allAppointments.length; i++) {
      if (allAppointments[i].Date.replace(/['"]+/g, '') === temp) {
        //console.log(parseInt(allAppointments[i].Time.split(":")[0]));
        invalidTimes.push(parseInt(allAppointments[i].Time.split(":")[0]));
      }
    }
    let startingTime = JSON.parse(businessInfo.location.state.workingHours).openingTime;
    let closingTime = JSON.parse(businessInfo.location.state.workingHours).closingTime;
    startingTime = parseInt(startingTime[0]);
    closingTime = parseInt(closingTime[0]) + 12;
    let numButtons = (closingTime - startingTime);
    let time = startingTime;
    for (let i = 0; i < numButtons; i++) {
      let temp;
      let tempTime;
      if (invalidTimes.includes(time)) {
        time++;
        continue;
      } else {
        if (time >= 12) {
          if (time == 12) {
            temp = time.toString() + ":00" + " PM";
          } else {
            tempTime = time - 12;
            temp = tempTime.toString() + ":00" + " PM";
          }
        } else {
          temp = time.toString() + ":00" + " AM";
        }
        content.push(temp);
        time++;
      }
    }
    buttons = content.map((but) => (
      <Grid item xs={3}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onTimeChange}
          value={but}
        >
          {but}
        </Button>
      </Grid>
    ))
    setAllButtons(buttons);
  }

  /**
   * Handles on click for time slot.
   * Changes the button variant to indicate the selected time slot.
   */
  function onTimeChange(event) {
    buttons = content.map((but) => (
      <Grid item xs={3}>
        <Button
          variant={but === event.currentTarget.value ? "contained" : "outlined"}
          color="primary"
          onClick={onTimeChange}
          value={but}
        >
          {but}
        </Button>
      </Grid>
    ))
    setAllButtons(buttons);
    let temp = event.currentTarget.value;
    let test = temp.split(' ')[1];
    temp = parseInt(temp.split(':')[0]);
    if (test === 'PM') {
      temp += 12;
    }
    let aptTime = new Date().setHours(temp, 0, 0);
    aptTime = moment(aptTime).format('HH:mm:ss');
    setApptTime(aptTime);
  }
  
  /**
   * Appointment date and time to pass to next component are here
   */
  //console.log("Selected appointment date is: " + formattedDate);
  //console.log("Selected appointment time is: " + apptTime);
  // console.log(city);
  //const isEmpty = date.length > 0 && city.length > 0;
   const date2 = formattedDate + ' ' + apptTime;
  //console.log(date2)
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DatePickerCalendar
            type="Date"
            // name = "date"
            date={apptDate}
            onDateChange={onDateChange}
            // onChange={handleChange("date")}
            locale={enGB}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
          />
        </Grid>
        {allButtons}
        
        <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="date"
              placeholder="Your date and time"
              onChange={handleChange("appodatatime")}
              value={date2}
              readOnly
              margin="normal"
              required
            />
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              id="one"
              name="city"
              placeholder="Enter your city"
              defaultValue={city}
              onChange={handleChange("city")}
              margin="normal"
              error={filedError.city !== ""}
              helperText={filedError.city !== "" ? `${filedError.city}` : ""}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone number"
            id="four"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            defaultValue={phone}
            onChange={handleChange("phone")}
            margin="normal"
            error={filedError.phone !== ""}
            helperText={filedError.phone !== "" ? `${filedError.phone}` : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Note to us"
            placeholder="Things we should know about you"
            defaultValue={note}
            onChange={handleChange("note")}
            multiline
            fullWidth
            rows={4}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          //disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default SecondStep;
