//THis is where you import useEffect(), and useState()
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Section } from '../../components/organisms';
import { Hero } from './components';

const useStyles = makeStyles(theme => ({

  root: {},

}));

const Message = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Section>
        <Hero/>
      </Section>
    </div>
  );
};

export default Message;
