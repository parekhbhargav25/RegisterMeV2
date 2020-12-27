import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const SuccessForm = () => {
  return (
    <Fragment>
      <Typography variant="h2" align="center">
        Thank you!
      </Typography>
      <Typography component="p" align="center" style={{ marginTop: 40 }}>
        You will get an email with further instructions
      </Typography>
    </Fragment>
  );
};

export default SuccessForm;
