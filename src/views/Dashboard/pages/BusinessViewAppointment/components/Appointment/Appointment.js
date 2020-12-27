import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import clsx from "clsx";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import {CustomerAppointment} from '../../../../../'
import { CardBase } from '../../../../../../components/organisms';


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
} from "@material-ui/core";
import { SectionHeader } from "../../../../../../components/molecules";
import { LearnMoreLink } from "../../../../../../components/atoms";
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

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

function capitalizeNames(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function today(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  
  if (dd < 10) { dd = '0' + dd;}
  if (mm < 10) { mm = '0' + mm; }
  
  today = yyyy + '-' + mm + '-' + dd ;

  return today;
}

const BusinessViewAppointment = (props) => {
  const { data,currentUserData, userInfo,userData, BusinessData, customerData, className, ...rest } = props;
  console.log(data);

  // console.log("userInfo");
  console.log(data);
  // console.log(userInfo.userId);
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const OnId = userInfo.userId;

  const currentCustID = (userData.filter(profile => profile.businessProfileID === OnId)
                            .map(filteredPerson => (filteredPerson.businessProfileID))).toString();
console.log(currentCustID);

  if (currentCustID === OnId) {
    if (data.filter((item)=>{
      return item.BusinessID == userInfo.userId;
    }).filter((item) => {
      return item.Date == today();
    })) {
      return (
        <div className={clsx(classes.root, className)} {...rest}>
          <SectionHeader
            title="Appointments"
            subtitle="Today's Appointment"
            data-aos="fade-up"
          />
          <Grid container spacing={isMd ? 4 : 2}>
            {data.filter((item)=>{
              return item.BusinessID == userInfo.userId;
            }).filter((item)=>{
              return item.Date == today();
            }).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-up">
                <Card className={classes.card}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                    align="center"
                    className={classes.fontWeight500} >
                    {capitalizeNames(item.FirstName.toLowerCase())} {capitalizeNames(item.LastName.toLowerCase())}
                  </Typography>
                  <CardContent>
                    <List disablePadding>
                      <ListItem disableGutters>
                        <AccessTimeIcon className={classes.AccessTimeIcon} />
                        {/* <ListItemText primary={"Time : 9:30 am to 10:30 am"} /> */}
                      Time: {tConvert(item.Time)}
                      </ListItem>
                    </List>
                    <List disablePadding>
                      <ListItem disableGutters>
                        <TodayIcon className={classes.TodayIcon} />
                      Date: {item.Date}
                      </ListItem>
                    </List>

                    <Divider className={classes.divider} />
                    <Grid container>
                      <Grid item xs={12}>
                        {console.log(item)}

                        <Link className="btn btn-info" to={`/businessView/${item.id}`}>
                          More Information
                        </Link>

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          </Grid>
        </div>
      );

    }
    else {
      return (
        <div>
           <CustomerAppointment/>
        </div>
      )
    }
  }
  else {
    return (
      <div>
      
          <CustomerAppointment/>
      </div>
    )
  }
};
BusinessViewAppointment.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default BusinessViewAppointment;