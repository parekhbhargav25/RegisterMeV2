import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Grid,
  Typography,
  colors,
  Divider,
} from "@material-ui/core";
import { Image, LearnMoreLink } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";
import { CardProduct } from "../../../../components/organisms";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//Importing Auth to check current user ID. 
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {},
  cardProduct: {
    borderRadius: theme.spacing(3),
  },
  courseCardPrice: {
    padding: theme.spacing(1),
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: "white",
    borderRadius: theme.spacing(1),
  },
  courseCardReviewAvatar: {
    marginLeft: theme.spacing(-2),
    border: "3px solid white",
    "&:first-child": {
      marginLeft: 0,
    },
  },
  courseCardReviewStar: {
    color: colors.yellow[800],
    marginRight: theme.spacing(1 / 2),
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const FeaturedBusinesses = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  let [user, setUser] = useState(null);
  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    //Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    ////return () => Hub.remove('auth', updateUser) // cleanup
  }, []);

  console.log(user?.attributes.sub);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title={
          <span>
            Discover your new favorite <span className="text-highlighted">salon</span>
          </span>
        }
        subtitle="Appointment booking made easy."
        fadeUp
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} data-aos="fade-up">
            <CardProduct
              className={classes.cardProduct}
              withShadow
              liftUp
              mediaContent={
                <>
                  <Image
                    {...item.image}
                    alt={item.title}
                    src={item.businessImg}
                    lazyProps={{ width: "100%", height: "100%" }}
                  />
                  <div className={classes.courseCardPrice}>
                    <i
                      className={clsx(
                        "fas fa-star",
                        classes.courseCardReviewStar
                      )}
                    />
                    <Typography
                      component="span"
                      variant="body1"
                      className={classes.fontWeight700}
                    >
                      {4.5}
                    </Typography>
                    <Typography
                      noWrap
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      className={classes.reviewCount}
                    >
                      ({10} reviews)
                    </Typography>
                  </div>
                </>
              }
              cardContent={
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      color="textPrimary"
                      align="left"
                      className={classes.fontWeight700}
                    >
                      {item.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="left"
                    >
                      {item.businessAddress} {item.city}, {item.province}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="left"
                    >
                      Opening Time: {JSON.parse(item.workingHours).openingTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="left"
                    >
                      Closing Time: {JSON.parse(item.workingHours).closingTime}
                    </Typography>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      align="left"
                      className={classes.fontWeight700}
                    >
                      Services Offered
                    </Typography>
                  </Grid>

                  {JSON.parse(item.services).checkedSpa ? (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="left"
                      >
                        Spa Treatment:{" "}
                        {<CheckCircleIcon fontSize="small" color="secondary" />}
                      </Typography>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  {JSON.parse(item.services).checkedNail ? (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="left"
                      >
                        Nail Treatment{" "}
                        {<CheckCircleIcon fontSize="small" color="secondary" />}
                      </Typography>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  {JSON.parse(item.services).checkedHairwash ? (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="left"
                      >
                        Hair wash{" "}
                        {<CheckCircleIcon fontSize="small" color="secondary" />}
                      </Typography>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  {JSON.parse(item.services).checkedHaircut ? (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="left"
                      >
                        Hair cut{" "}
                        {<CheckCircleIcon fontSize="small" color="secondary" />}
                      </Typography>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  <Grid item container justify="space-between" xs={12}>
                    <Grid item container xs={6} wrap="nowrap">
                      {/* {item.reviews.map((review, index) => (
                        <Avatar
                          key={index}
                          className={classes.courseCardReviewAvatar}
                          alt={review.authorName}
                          {...review.authorPhoto}
                        />
                      ))} */}
                    </Grid>
                  </Grid>
                  {/* <Grid
                      item
                      container
                      xs={12}
                    >
                      <i
                        className={clsx(
                          'fas fa-star',
                          classes.courseCardReviewStar,
                        )}
                      />
                      <Typography
                        component="span"
                        variant="body1"
                        className={classes.fontWeight700}
                      >
                        {4.5}
                      </Typography>
                      <Typography
                        noWrap
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        className={classes.reviewCount}
                      >
                        ({10} reviews)
                      </Typography>
                    </Grid> */}
                  <Grid item xs={12}>
                    <LearnMoreLink
                      title="Book Appointment"
                      variant="body1"
                      color="primary"
                      href={"/bookappointment"}
                      data={item}
                      userid={user}
                    />
                  </Grid>
                </Grid>
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

FeaturedBusinesses.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default FeaturedBusinesses;
