/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemIcon: {
    minWidth: "auto",
  },
  closeIcon: {
    justifyContent: "flex-end",
    cursor: "pointer",
  },
}));

const SidebarNav = (props) => {
  const { pages, onClose, className, ...rest } = props;
  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={onClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          href="/signin"
        >
          SignIn
        </Button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          href="/customer/sign-up"
        >
          SignUp
        </Button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          href="/account/business_Profile/"
        >
          Dashboard
        </Button>
      </ListItem>
    </List>
  );
};

export default SidebarNav;
