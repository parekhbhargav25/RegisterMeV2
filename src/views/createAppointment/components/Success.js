import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";

const Success = () => {
  return (
    <div style={{ maxHeight: 2000 }}>
    <Fragment>
      {/* <Alert severity="success" align="center"> */}
      <Typography variant="h2" align="center">
        Thank you!
      </Typography>
      <Typography variant="h5" component="p" align="center" style={{ marginTop: 20 }}>
        For booking with us
        <br></br>
        <Button
        style={{ marginTop: 20 }}
        // style={{ marginLeft: 210, marginTop: 20 }}
        variant="contained"
        color="secondary"
        size="large"
        href="/home"
      >
        Go home
      </Button>
      </Typography>

      {/* </Alert> */}
    </Fragment>
    </div> 
  );
};

export default Success;
