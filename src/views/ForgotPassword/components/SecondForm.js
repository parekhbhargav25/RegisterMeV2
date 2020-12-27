import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import { LearnMoreLink } from '../../../components/atoms';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));


const SecondForm = props => {
  const {
    handleForm2Change,
    handleSubmitSignon,
    form2State,
    authPassCode,
    hasError2,
    userMessage,
  } = props;
  //const { history } = props;
  console.log("what's in form2State ? ", form2State);
  //console.log("What's in authPasscode??? ", authPassCode); /** to check passCode against user provided code?? */

  const classes = useStyles();  
    
  return (
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmitSignon}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p><em>{userMessage.msg}</em></p>
            <br/>
            <TextField
              placeholder="Verification code"
              label="Verification code *"
              variant="outlined"
              size="medium"
              name="code"
              fullWidth
              helperText={hasError2('code') ? form2State.errors.code[0] : null}
              error={hasError2('code')}
              onChange={handleForm2Change}
              type="code"
              value={form2State.values.code || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="New password"
              label="New password *"
              variant="outlined"
              size="medium"
              name="newPassword"
              fullWidth
              helperText={hasError2('newPassword') ? form2State.errors.newPassword[0] : null}
              error={hasError2('newPassword')}
              onChange={handleForm2Change}
              type="password"
              value={form2State.values.newPassword || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="subtitle2">
                Fields that are marked with * sign are required.
              </Typography>
            </i>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!(form2State.isValid)}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

SecondForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SecondForm);
