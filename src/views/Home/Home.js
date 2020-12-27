import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section } from "../../components/organisms";
import { Hero } from "./components";
import { ProductHowItWorks } from "./components";
import { OurTeam } from "./components"
// import { About } from "./components";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScopedCssBaseline>
        <Hero />

       
      </ScopedCssBaseline>
      <ProductHowItWorks />
      <OurTeam />
    </div>
  );
};

export default Home;
