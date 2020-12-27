import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StepsForm } from './components';
import { SectionHeader } from '../../components/molecules';
import { Section } from '../../components/organisms';

const useStyles = makeStyles(theme => ({
  root: {},
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          
        <div>
            <img
            alt = "image of lock" 
            src="http://www.cristalwindows.co.uk/wp-content/uploads/2016/09/locked-padlock-1.png"
            width = "80"
            height = "80"
            />
          </div>
          <SectionHeader
            title="Reset Your Password"
            subtitle="Enter your email to receive a new password."
            titleProps={{
              variant: 'h3',
            }}
          />
          <StepsForm />
        </div>
      </Section>
    </div>
  );
};

export default ForgotPassword;
