import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import { useParams } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  colors,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField
} from "@material-ui/core";
import { SectionHeader } from "../../../../components/molecules";
import { LearnMoreLink } from "../../../../components/atoms";
import { format } from "validate.js";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    boxShadow: "0 7px 14px 0 rgba(0, 0, 0, 0.1)",
  },
  cardMedia: {
    minHeight: 280,
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
  },
  pricingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(3),
    width: "100%",
  },
  cardCta: {
    padding: theme.spacing(1 / 2, 1),
    background: "white",
    borderRadius: theme.spacing(1 / 2),
  },
  listItem: {
    padding: 0,
  },
  AccessTimeIcon: {
    minWidth: theme.spacing(3),
    color: colors.blue[900],
  },
  TodayIcon: {
    minWidth: theme.spacing(3),
    color: colors.blue[900],
  },
  fontWeight500: {
    fontWeight: 500,
  },
  propertyList: {
    display: "flex",
  },
  pin: {
    color: `${colors.deepOrange[500]} !important`,
  },
  divider: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  appBar: {

  }
}));

const Details = (props) => {
  const { data, state, className, ...rest } = props;
  console.log(props);
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  
  var { id } = useParams();
  console.log(id);
 
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Appointments"
        subtitle="Appointment Detail"
        data-aos="fade-up"
      />


      <Grid container >
        {data.filter((item) => item.id == id)
          .map((item) => (
            <Grid item sm container>
              <ListItem>
                <ListItemText primary="First Name" secondary={item.FirstName} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Last Name" secondary={item.LastName} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary={item.Email} />
              </ListItem>
              <Divider />
              <Divider />
              <ListItem>
                <ListItemText primary="Phone Number" secondary={item.PhoneNumber} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Appointment Time" secondary={item.Time} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Appointment Date" secondary={item.Date} />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="Note" secondary={item.Note} />
              </ListItem>
              <Divider className={classes.divider} />
              <Grid container>
                <Grid item xs={12}>
                  <LearnMoreLink
                    title="Back to Appointments"
                    variant="body1"
                    color="primary"
                    href='/account/business_View/'
                  />
                </Grid>
              </Grid>

            </Grid>
          ))}
        {/* <Grid item xs={12} container justify="center" data-aos="fade-up">
            <Button variant="outlined" color="primary">
              See all list
            </Button>
          </Grid> */}
      </Grid>
    </div>
  );

  // }
  // else {
  //   return(
  //     <div>
  //       <Typography className={classes.centered} >
  //         There is not Appointment for today yet. 
  //       </Typography>

  //     </div>
  //   )
  // }

};

Details.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Details;
