import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "./Button";
import Typography from "./Typography";
import Image from "./productCurvyLines.png";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(10),
  },
  number: {
    fontSize: 30,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  image: {
    height: 100,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  curvyLines: {
    pointerEvents: "none",
    // position: "absolute",
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

const styles2 = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    fadeDuration: 0,
    minHeight: 700,
    maxHeight: 1200,
    // position: "relative",
  },
};

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root} style={styles2.paperContainer}>
      <Container className={classes.container}>
        {/* <img
          src="./productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                {/* <div className={classes.number}>1.</div> */}
                <a href="/salons">
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/2332/2332427.svg"
                    href="/salons"
                    alt="suitcase"
                    className={classes.image}
                  />
                </a>
                <Typography variant="h5" align="center">
                  Find a Salon and Check-In Online
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                {/* <div className={classes.number}>2.</div> */}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/1247/1247407.svg"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Arrive at the salon on time. There may be a short wait when you arrive.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                {/* <div className={classes.number}>3.</div> */}
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3017/3017381.svg"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Please put on your mask. You will not be allowed to enter the
                  salon without a mask.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

        <Button
          color="primary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/signup"
        >
          Get started
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
