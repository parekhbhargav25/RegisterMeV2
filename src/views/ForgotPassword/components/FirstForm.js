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


const FirstForm = props => {
  const {
    handleForm1Change,
    handleRequestCode,
    form1State,
    hasError1,
    userMessage,
  } = props;
  //const { history } = props;
  console.log("what's in form1State ? ", form1State);
  console.log("1st form- checking message: ", userMessage.msg);

  const classes = useStyles();  

  function disableSubmitBtn(){
    var disableButton = true;    
    if (Object.keys(form1State.touched).length > 0){
      disableButton = (!form1State.isValid);
    }
    return (disableButton); 
  }
  
  console.log("Disabled? ", disableSubmitBtn());
  
  
  return (
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleRequestCode}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p><em>{userMessage.msg}</em></p>
            <br/>
            <TextField
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              helperText={hasError1('email') ? form1State.errors.email[0] : null}
              error={hasError1('email')}
              onChange={handleForm1Change}
              type="email"
              value={form1State.values.email || ''}
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
              disabled={!(form1State.isValid)}
              fullWidth="true"
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              Remember your password?{' '}
              <LearnMoreLink 
              title="Sign in here" 
              href="/signin" 
              component="Signin"/>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

FirstForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(FirstForm);
