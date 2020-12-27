import React, { Fragment, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { API, graphqlOperation } from "aws-amplify";
import { createAppointment } from "../../../graphql/mutations";
import emailjs from 'emailjs-com';

// Destructure props
const Confirm = ({
  data,
  props,
  userid, 
  state,
  id,
  custID,
  handleNext,
  handleBack,
  values: { firstName, lastName, email, appodatatime, time, phone, city, note = " " },
}) => {
console.log(id)
  const [AppoDetails, setAppoDetails] = useState({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Date: appodatatime.slice(0,10),
    Time: appodatatime.slice(11,16),
    PhoneNumber: phone,
    City: city,
    Note: note,
    BusinessID: id
  });

  const [businessID, setBusinessID] = React.useState("");
  const [customerID, setCustomerID] = React.useState("");
  console.log(businessID);

  useEffect(() => {
    setBusinessID(id);
    setCustomerID(custID);
  }, []);

  const handleSubmit = async (e) => {
    console.log(AppoDetails);
    try {
      if (!AppoDetails.FirstName || !AppoDetails.LastName) return;
      AppoDetails.BusinessID = businessID;
      AppoDetails.CustomerID = "abc123";
      await API.graphql(
        graphqlOperation(createAppointment, { input: AppoDetails })
      );
      setAppoDetails({
        FirstName: "",
        LastName: "",
        Email: "",
        Date: "",
        Time: "",
        PhoneNumber: "",
        City: "",
        Note: "",
      });
    } catch (err) {
      console.log("error creating appointment:", err);
    }
  };


  // var templateParams = {
  //   from_name: 'RegisterMe',
  //   to_name: firstName,
  //   to_email: email,
  //   message: `Thank you for creating appointment with us at ${appodatatime}`
  // }
  // function sendEmail() {
  //   //e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

  //   emailjs.send('registerme_service', 'cancel_appointment', templateParams, 'user_mgDqT0alR38xWhHX9yiYA')
  //   .then((result) => {
  //     console.log(result.text);
  // }, (error) => {
  //     console.log(error.text);
  // });
  // }

  const ToDo = () => {
    handleSubmit();
    handleNext();
  };

  return (
    <Fragment>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="First Name"
            secondary={firstName}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, FirstName: e.target.value })
            }
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Last Name"
            secondary={lastName}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, LastName: e.target.value })
            }
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Email Address"
            secondary={email}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, Email: e.target.value })
            }
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Appointment Date"
            secondary= {appodatatime.slice(0,10)}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, Date: e.target.value })
            }
          />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText
            primary="Time"
            secondary={appodatatime.slice(11,16)}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, City: e.target.value })
            }
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="City"
            secondary={city}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, City: e.target.value })
            }
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="Phone"
            secondary={phone.length > 0 ? phone : "Not Provided"}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, PhoneNumber: e.target.value })
            }
          />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText
            primary="Note"
            secondary={note}
            onChange={(e) =>
              setAppoDetails({ ...AppoDetails, Note: e.target.value })
            }
          />
        </ListItem>
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={ToDo}
        >
          Confirm & Continue
        </Button>
      </div>
    </Fragment>
  );
};

export default Confirm;