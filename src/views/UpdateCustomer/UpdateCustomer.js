//Added import statements for useEffect and useState
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from '../../components/molecules';
import { Section } from '../../components/organisms';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UpdateStepsForm from "./components/UpdateStepsForm";


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
}));


// ----------------------------------------
//TEST profile data passed to this component
//Sample Customer Profile
const selectedCustomerProfile = {
  id: "6f802a34-f2b7-4e13-8d91-1781eff5e627",
  firstName: "Collin",  
  lastName: "Anderson",  
  email: "canderson@mailinator.com",
  messageDelivery: 
  {
    email: true,
    profile: false,
    },
    customerProfileID: "78da90e3-24ac-4241-a129-af53158d7f11",
  //createdAt: "2020-10-15T23:40:01.475Z",
  //updatedAt: "2020-10-15T23:40:01.475Z", 
};

// ----------------------------------------

//--Comment: Reinstate when have props
const UpdateCustomer = (props) => {
  
  //--Comment: added destruction of properties
  const { className, userid,  } = props;
  const classes = useStyles(); //Added

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Update Customer Profile"
            subtitle="Make your changes and select Next/Submit."
            titleProps={{
              variant: 'h3',
            }}
          />
        <Paper className={classes.root}>
          <UpdateStepsForm data={selectedCustomerProfile}/>
        </Paper>
        <Divider style={{ marginTop: 100 }} />
        <Typography
          component="p"
          align="center"
          style={{ margin: "10px 0", fontSize: ".75rem" }}
        >
          Built with{" "}
          <span role="img" aria-label="Emojis">
            ❤️
          </span>{" "}
          by the{" "}
          <a href="/home" title="RegisterMe">
            {" "}
            RegisterMe{" "}
          </a>
          team.
        </Typography>
        </div>

      </Section>
    </div>
  );
};

UpdateCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UpdateCustomer;
