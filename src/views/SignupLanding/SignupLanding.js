import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section} from "../../components/organisms";

import { AccountType } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const SignupLanding = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Section>
        <AccountType />
      </Section>
    </div>
  );
};

export default SignupLanding;
