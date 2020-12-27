import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Typography, Button } from "@material-ui/core";
import { SectionHeader } from "../../../../components/molecules";
import { CardBase } from "../../../../components/organisms";

const useStyles = makeStyles(() => ({
  root: {},
  fontWeightBold: {
    fontWeight: "bold",
  },
}));

const Search = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="What type of account do you need?"
        subtitle="Our platform provides an intuitive appointment booking solution to both customers and business owners"
        align="center"
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <CardBase withShadow liftUp>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                  className={classes.fontWeightBold}
                  noWrap
                >
                  I am a customer
                </Typography>
                <Typography variant="body1" color="textPrimary" noWrap>
                  Book your next salon appointment with ease
                </Typography>
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                alignItems="center"
                xs={12}
                sm={3}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="/customer/sign-up"
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <CardBase withShadow liftUp>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                  className={classes.fontWeightBold}
                  noWrap
                >
                  I am a business owner
                </Typography>
                <Typography variant="body1" color="textPrimary" noWrap>
                  Advertise your business to attract more clients
                </Typography>
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                alignItems="center"
                xs={12}
                sm={3}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/business/sign-up"
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </CardBase>
        </Grid>
      </Grid>
    </div>
  );
};

Search.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Search;
