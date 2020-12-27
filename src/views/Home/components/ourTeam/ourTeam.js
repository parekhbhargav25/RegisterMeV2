import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import Button from "./Button";
import Typography from "./Typography";
import Image from "./productCurvyLines.png";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Bhargav from "./Bhargav.jpg";
import Tatika from "./Tatika.jpg";
import Ming from "./Ming.jpg";
import Nish from "./Nishu.jpg"


const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#37474f",
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
  large: {
    width: theme.spacing(23),
    height: theme.spacing(25),
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
    maxHeight: 1900,
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
          // alt="curvy lines"
        /> */}
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Meet Our Team
        </Typography>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
              <Avatar alt="Remy Sharp" src={Tatika} className={classes.large} />
                  <Typography variant="h5" align="center">
                    Tatika Anderson

                    <Divider/>

                  </Typography>
                  <Typography variant="h6" color = "secondary" align="center">
                    Project Lead/Developer
                  </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Avatar alt="Remy Sharp" src={Ming} className={classes.large} />

                <Typography variant="h5" align="center">
                  Ming Hao Wang

                  <Divider/>

                </Typography>
                <Typography variant="h6" color = "secondary" align="center">
                  Lead Developer
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <Avatar alt="Remy Sharp" src={Bhargav} className={classes.large} />

                <Typography variant="h5" align="center">
                  Bhargav Parekh

                  <Divider/>

                </Typography>
                <Typography variant="h6" color = "secondary" align="center">
                  Developer
                </Typography>
              </div>
            </Grid>
            
            <Grid item xs={6} spacing={2} >
              <div className={classes.item}>
              <Avatar alt="Remy Sharp" src={Nish} className={classes.large} />
              <Typography variant="h5" align="center">
                  Nishu

                  <Divider/>

                </Typography>
                <Typography variant="h6" color = "secondary" align="center">
                  Developer
                </Typography>
              </div>
            </Grid>

            <Grid item xs={6} spacing={2}>
              <div className={classes.item}>
              <Avatar alt="Remy Sharp" src="https://www.flaticon.com/svg/static/icons/svg/2444/2444526.svg" className={classes.large} />
              <Typography variant="h5" align="center">
                  Ivan Huang

                  <Divider/>
                  
                </Typography>
                <Typography variant="h6" color = "secondary" align="center">
                  Developer
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
