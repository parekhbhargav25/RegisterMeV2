import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { colors, AppBar, Toolbar } from "@material-ui/core";

import { Image } from "../../../../components/atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: theme.palette.white,
    borderBottom: `3px solid ${colors.grey[200]}`,
  },
  toolbar: {
    maxWidth: 1900,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 3),
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    width: 140,
    height: 80,
    [theme.breakpoints.up('md')]: {
      width: 140,
      height: 80,
    },
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
}));

const Topbar = (props) => {
  const { onSidebarOpen, className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <a href="/" title="">
            <Image
              className={classes.logoImage}
              src="https://registermeb4199c63db0c4b65aede01a2b710dd82205953-dev.s3.amazonaws.com/public/logo.png"
              alt=""
              lazy={false}
            />
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
