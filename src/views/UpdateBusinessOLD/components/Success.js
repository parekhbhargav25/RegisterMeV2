import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//import { Alert } from "@material-ui/lab";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  //Added with stepper
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Success = () => {

  const classes = useStyles(); 

  return (
    <div style={{ maxHeight: 2000 }}>
    <Fragment>
      {/* <Alert severity="success" align="center"> */}
      <Typography variant="h3" align="center">
        Thank you!
      </Typography>
      <Typography variant="h5" component="p" align="center" style={{ marginTop: 20 }}>
        Your updates have been saved
        <br></br>
        <Button
        style={{ marginTop: 20 }}
        // style={{ marginLeft: 210, marginTop: 20 }}
        variant="contained"
        color="secondary"
        size="large"
        href="/home"
      >
        Back to home
      </Button>
      </Typography>

      {/* </Alert> */}
    </Fragment>
    </div> 
  );
};

export default Success;
