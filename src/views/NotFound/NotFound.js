import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const NotFound = props => {
  const { history } = props;

  const classes = useStyles();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            label="404"
            title="Uh oh."
            subtitle={
              <span>
                There’s nothing here!
              </span>
            }
            titleProps={{
              variant: 'h3',
            }}
            labelProps={{
              color: 'secondary',
              className: classes.label,
              variant: 'h5',
            }}
            ctaGroup={[
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Go Back
              </Button>,
            ]}
            disableGutter
          />
        </div>
      </Section>
    </div>
  );
};

export default withRouter(NotFound);
