//Added import statements for useEffect and useState
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import StepForm from "./components/StepForm";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = (theme) => ({
  appBar: {
    position: "relative",
    paddingRight: 10,
    paddingLeft: 10,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  },
});

const newAppointment = (props) => {
  //added destruction of properties
  const { className, userid, state, classes,...rest } = props;
  console.log(props);
  return (
    <div className="App">
      <CssBaseline />
      <main className={classes.layout}>
        <Typography variant="h4" align="center" style={{ marginTop: 30 }}>
          {props.location.state.businessName}
        </Typography>
        <Typography
          variant="subtitle2"
          align="center"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Book Appointment
        </Typography>
        {/* <Typography
          variant="subtitle2"
          align="center"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          business ID: {props.location.state.id}
        </Typography>
        <Typography
          variant="subtitle2"
          align="center"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          customer ID: {props.location.userid}
        </Typography> */}
        <Paper className={classes.paper}>
          <StepForm data={props}/>
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
      </main>
    </div>
  );
};

newAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(newAppointment);